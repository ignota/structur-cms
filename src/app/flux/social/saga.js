import {
  all,
  call,
  cancel,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  receiveNewsletterSubscription,
  socialRequestFailed,
} from './actions'
import A from './action-types'
import gql from 'graphql-tag'

function* subscribeToNewsletter({ payload: { email } }) {
  try {
    const trysteroClient = yield getContext('trysteroClient')
    const { data } = yield call(trysteroClient.mutate, {
      mutation: gql`
        mutation SubscribeToNewsletter($email: String!) {
          subscribeToNewsletter(email: $email)
        }
      `,
      variables: {
        email,
      },
    })

    if (data.subscribeToNewsletter !== true) {
      yield put(socialRequestFailed(new Error('Unknown error.')))
      yield cancel()
      return
    }

    yield put(receiveNewsletterSubscription())
  } catch (err) {
    console.error(err)
    yield put(socialRequestFailed(err))
  }
}

function* socialSaga() {
  yield all([
    takeLatest(A.SUBSCRIBE_TO_NEWSLETTER, subscribeToNewsletter),
  ])
}

export default socialSaga
