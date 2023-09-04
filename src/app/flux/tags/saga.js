import * as postsActions from '../posts/actions'
import {
  all,
  call,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  receiveTags,
  receiveTagsPage,
  tagsRequestFailed,
} from './actions'
import A from './action-types'
import gql from 'graphql-tag'
import { normalize } from 'normalizr'
import { post as postSchema } from '../posts/schemas'
import R from 'ramda'
import { tag as tagSchema } from './schemas'

tagSchema.define({ posts: [postSchema] })

function* createTag({ payload: { post, tag } }) {
  try {
    const sanitizedTag = R.omit(['createdAt', 'heroSRC', 'lastPost', 'posts', 'slug', 'updatedAt', '__typename'], tag)
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation CreateTag($post: ID, $tag: TagInput) {
          createTag(post: $post, tag: $tag) {
            color,
            description,
            featured,
            gradient,
            heroSRC,
            lastPost,
            name,
            posts {
              uuid,
            },
            slug,
            uuid,
          }
        }
      `,
      variables: {
        post,
        tag: sanitizedTag,
      },
    })

    if (!data.createTag) {
      throw new Error(data.error)
    }

    const normalizedTags = normalize(data.createTag, tagSchema)
    yield put([
      receiveTags(normalizedTags.entities.tags),
      postsActions.receivePosts(normalizedTags.entities.posts),
    ])
  } catch (err) {
    console.error(err)
    yield put(tagsRequestFailed(err))
  }
}

function* requestTag({ payload: { id } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query GetTagByID($id: ID!) {
          tag(id: $id) {
            color,
            description,
            featured,
            gradient,
            heroSRC,
            lastPost,
            name,
            posts {
              authors {
                name,
                slug,
                uuid,
              },
              excerpt,
              heroSRC,
              publishedAt,
              slug,
              title,
              uuid,
            },
            slug,
            uuid,
          }
        }
      `,
      variables: {
        id,
      },
    })

    if (!data.tag) {
      throw new Error(data.error)
    }

    const normalizedTags = normalize(data.tag, tagSchema)

    yield put([
      receiveTags(normalizedTags.entities.tags),
      postsActions.receivePosts(normalizedTags.entities.posts),
    ])
  } catch (err) {
    console.error(err)
    yield put(tagsRequestFailed(err))
  }
}

function* requestTags() {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query {
          tags {
            color,
            description,
            featured,
            gradient,
            heroSRC,
            lastPost,
            name,
            posts {
              authors {
                name,
                slug,
                uuid,
              },
              excerpt,
              heroSRC,
              publishedAt,
              slug,
              title,
              uuid,
            },
            slug,
            uuid,
          }
        }
      `,
    })

    if (!data.tags) {
      throw new Error(data.error)
    }

    const normalizedTags = normalize(data.tags, [tagSchema])

    yield put([
      receiveTags(normalizedTags.entities.tags),
      postsActions.receivePosts(normalizedTags.entities.posts),
    ])
  } catch (err) {
    console.error(err)
    yield put(tagsRequestFailed(err))
  }
}

function* requestTagsPage({ payload: { cursor } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query RequestTagsPage($cursor: ID) {
          tagsByPage(cursor: $cursor) {
            tags {
              color,
              description,
              featured,
              gradient,
              heroSRC,
              lastPost,
              name,
              posts {
                authors {
                  name,
                  slug,
                  uuid,
                },
                excerpt,
                heroSRC,
                publishedAt,
                slug,
                title,
                uuid,
              },
              slug,
              uuid,
            },
            pagination {
              count,
              cursor,
              total,
            },
          }
        }
      `,
      variables: {
        cursor,
      },
    })

    if (!data.tagsByPage) {
      throw new Error(data.error)
    }

    const normalizedTags = normalize(data.tagsByPage.tags, [tagSchema])

    yield put([
      receiveTags(normalizedTags.entities.tags),
      receiveTagsPage(data.tagsByPage.pagination),
      postsActions.receivePosts(normalizedTags.entities.posts),
    ])
  } catch (err) {
    console.error(err)
    yield put(tagsRequestFailed(err))
  }
}

function* updateTag({ payload: { tag } }) {
  try {
    const sanitizedTag = R.omit(['createdAt', 'heroSRC', 'lastPost', 'posts', 'slug', 'updatedAt', '__typename'], tag)
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation UpdateTag($tag: TagInput!) {
          updateTag(tag: $tag) {
            color,
            description,
            featured,
            gradient,
            heroSRC,
            lastPost,
            name,
            posts {
              uuid,
            },
            slug,
            uuid,
          }
        }
      `,
      variables: {
        tag: sanitizedTag,
      },
    })

    if (!data.updateTag) {
      throw new Error(data.error)
    }

    const normalizedTags = normalize(data.updateTag, tagSchema)

    yield put([
      receiveTags(normalizedTags.entities.tags),
      postsActions.receivePosts(normalizedTags.entities.posts),
    ])
  } catch (err) {
    console.error(err)
    yield put(tagsRequestFailed(err))
  }
}

function* tagsSaga() {
  yield all([
    takeLatest(A.CREATE_TAG, createTag),
    takeLatest(A.REQUEST_TAG, requestTag),
    takeLatest(A.REQUEST_TAGS, requestTags),
    takeLatest(A.REQUEST_TAGS_PAGE, requestTagsPage),
    takeLatest(A.UPDATE_TAG, updateTag),
  ])
}

export default tagsSaga
