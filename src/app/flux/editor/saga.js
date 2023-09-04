import {
  all,
  call,
  cancel,
  getContext,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects'
import {
  editorRequestFailed,
  receiveNodes,
  receivePostBody,
  reportUploadComplete,
  reportUploadStatus,
} from './actions'
import {
  END,
  eventChannel,
} from 'redux-saga'
import A from './action-types'
import gql from 'graphql-tag'
import { node as nodeSchema } from './schemas'
import { normalize } from 'normalizr'

function uploadProgress(structurClient, job) {
  const queryObservable = structurClient.subscribe({
    query: gql`
      subscription SubscribeToUploadProgress($job: ID!) {
        uploadProgress(job: $job) {
          message,
          percentComplete,
          status,
        }
      }
    `,
    variables: {
      job,
    },
  })

  return eventChannel(emitter => {
    const querySubscription = queryObservable.subscribe({
      error: ({ error }) => {
        console.error(error)
        emitter(END)
      },
      next: ({ data, errors }) => {
        if (errors) {
          console.error(errors)
          emitter(END)
        }

        if (data.uploadProgress.percentComplete === 100) {
          emitter(END)
        }

        emitter(data.uploadProgress)
      },
    })

    return () => querySubscription.unsubscribe()
  })
}

function* requestNode({ payload: { node } }, force = false) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      fetchPolicy: force ? 'network-only' : 'cache-first',
      query: gql`
        query RequestNode($node: ID!) {
          node(node: $node),
        }
      `,
      variables: {
        node,
      },
    })

    if (!data.node) {
      throw new Error(data.error)
    }

    const normalizedNodes = normalize(data.node, nodeSchema)

    yield put(receiveNodes(normalizedNodes.entities.nodes))
  } catch (err) {
    console.error(err)
    yield put(editorRequestFailed(err))
  }
}

function* requestPostBody({ payload: { post } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query RequestPostBody($post: ID!) {
          postBody(post: $post),
        }
      `,
      variables: {
        post,
      },
    })

    if (!data.postBody) {
      yield put(editorRequestFailed(new Error(JSON.stringify(data))))
      return yield cancel()
    }

    yield put(receivePostBody(data.postBody))
  } catch (err) {
    console.error(err)
    yield put(editorRequestFailed(err))
  }
}

function* savePostBody({ payload: { post } }) {
  try {
    const body = yield select(state => state.editor.value)
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation SavePostBody($body: Hash!, $post: ID!) {
          savePost(body: $body, post: $post),
        }
      `,
      variables: {
        body: body.toJSON(),
        post,
      },
    })

    if (!data.savePost) {
      yield put(editorRequestFailed(new Error(JSON.stringify(data))))
      return yield cancel()
    }

    yield put(receivePostBody(data.savePost))
  } catch (err) {
    console.error(err)
    yield put(editorRequestFailed(err))
  }
}

function* subscribeToUploadJob({ payload: { job, node } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const chan = yield call(uploadProgress, structurClient, job)

    while (true) {
      const status = yield take(chan)
      yield put(reportUploadStatus({ job, ...status }))
    }
  } catch (err) {
    console.error(err)
    yield put(editorRequestFailed(err))
  } finally {
    yield call(requestNode, { payload: { node } }, true)
    yield put(reportUploadComplete(job))
  }
}

function* editorSaga() {
  yield all([
    takeLatest(A.REQUEST_NODE, requestNode),
    takeLatest(A.REQUEST_POST_BODY, requestPostBody),
    takeLatest(A.SAVE_POST_BODY, savePostBody),
    takeLatest(A.SUBSCRIBE_TO_UPLOAD_JOB, subscribeToUploadJob),
  ])
}

export default editorSaga
