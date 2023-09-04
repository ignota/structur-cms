import * as postsActions from '../posts/actions'
import * as profilesActions from '../profiles/actions'
import {
  all,
  call,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  authorsRequestFailed,
  receiveAuthors,
  receiveAuthorsPage,
} from './actions'
import A from './action-types'
import { author as authorSchema } from './schemas'
import gql from 'graphql-tag'
import { normalize } from 'normalizr'
import { post as postSchema } from '../posts/schemas'
import { push } from 'connected-react-router'
import R from 'ramda'

authorSchema.define({ posts: [postSchema] })

function* createAuthor() {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation {
          createAuthor {
            uuid,
          },
        },
      `,
    })

    if (!data.createAuthor) {
      throw new Error(data.error)
    }

    const normalizedAuthors = normalize(data.createAuthor, authorSchema)

    yield put(receiveAuthors(normalizedAuthors.entities.authors))
    yield put(push(`/authors/${ normalizedAuthors.result }`))
  } catch (err) {
    console.error(err)
    yield put(authorsRequestFailed(err))
  }
}

function* requestAuthor({ payload: { id } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query GetAuthorByID($id: ID!) {
          author(id: $id) {
            bio,
            featured,
            lastPost,
            name,
            pictureSRC,
            posts {
              authors {
                name,
                slug,
                uuid,
              },
              createdAt,
              excerpt,
              heroSRC,
              publishedAt,
              slug,
              tags {
                color,
                gradient,
                heroSRC,
                name,
                slug,
                uuid,
              },
              title,
              updatedAt,
              uuid,
              visibility,
            },
            profiles {
              provider,
              providerID,
              url,
              uuid,
            },
            slug,
            uuid,
          },
        },
      `,
      variables: {
        id,
      },
    })

    if (!data.author) {
      throw new Error(data.error)
    }

    const normalizedAuthors = normalize(data.author, authorSchema)

    yield put([
      receiveAuthors(normalizedAuthors.entities.authors),
      postsActions.receivePosts(normalizedAuthors.entities.posts),
      profilesActions.receiveProfiles(normalizedAuthors.entities.profiles),
    ])
  } catch (err) {
    console.error(err)
    yield put(authorsRequestFailed(err))
  }
}

function* requestAuthors() {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query {
          authors {
            bio,
            featured,
            lastPost,
            name,
            pictureSRC,
            posts {
              authors {
                name,
                slug,
                uuid,
              },
              createdAt,
              excerpt,
              heroSRC,
              publishedAt,
              slug,
              tags {
                color,
                gradient,
                heroSRC,
                name,
                slug,
                uuid,
              },
              title,
              updatedAt,
              uuid,
              visibility,
            },
            profiles {
              provider,
              providerID,
              url,
              uuid,
            },
            slug,
            uuid,
          },
        },
      `,
    })

    const normalizedAuthors = normalize(data.authors, [authorSchema])

    yield put([
      receiveAuthors(normalizedAuthors.entities.authors),
      postsActions.receivePosts(normalizedAuthors.entities.posts),
      profilesActions.receiveProfiles(normalizedAuthors.entities.profiles),
    ])
  } catch (err) {
    console.error(err)
    yield put(authorsRequestFailed(err))
  }
}

function* requestAuthorsPage({ payload: { cursor } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query AuthorsByPage($cursor: ID) {
          authorsByPage(cursor: $cursor) {
            authors {
              bio,
              featured,
              lastPost,
              name,
              pictureSRC,
              posts {
                authors {
                  name,
                  slug,
                  uuid,
                },
                createdAt,
                excerpt,
                heroSRC,
                publishedAt,
                slug,
                tags {
                  color,
                  gradient,
                  heroSRC,
                  name,
                  slug,
                  uuid,
                },
                title,
                updatedAt,
                uuid,
                visibility,
              },
              profiles {
                provider,
                providerID,
                url,
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
          },
        },
      `,
      variables: {
        cursor,
      },
    })

    if (
      !data.authorsByPage ||
      !data.authorsByPage.authors ||
      !Array.isArray(data.authorsByPage.authors) ||
      data.authorsByPage.length === 0
    ) {
      throw new Error(data.error)
    }

    const normalizedAuthors = normalize(data.authorsByPage.authors, [authorSchema])

    yield put([
      receiveAuthors(normalizedAuthors.entities.authors),
      receiveAuthorsPage(data.authorsByPage.pagination),
      postsActions.receivePosts(normalizedAuthors.entities.posts),
      profilesActions.receiveProfiles(normalizedAuthors.entities.profiles),
    ])
  } catch (err) {
    console.error(err)
    yield put(authorsRequestFailed(err))
  }
}

function* updateAuthor({ payload: { author } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const filteredAuthor = R.omit(['__typename', 'createdAt', 'id', 'lastPost', 'pictureSRC', 'posts', 'profiles', 'updatedAt'], author)
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation UpdateAuthor($author: AuthorInput!) {
          updateAuthor(author: $author) {
            bio,
            featured,
            lastPost,
            name,
            pictureSRC,
            slug,
            uuid,
          },
        },
      `,
      variables: {
        author: filteredAuthor,
      },
    })

    const normalizedAuthors = normalize(data.updateAuthor, authorSchema)

    yield put([
      receiveAuthors(normalizedAuthors.entities.authors),
    ])
  } catch (err) {
    console.error(err)
    yield put(authorsRequestFailed(err))
  }
}

function* authorsSaga() {
  yield all([
    takeLatest(A.CREATE_AUTHOR, createAuthor),
    takeLatest(A.REQUEST_AUTHOR, requestAuthor),
    takeLatest(A.REQUEST_AUTHORS, requestAuthors),
    takeLatest(A.REQUEST_AUTHORS_PAGE, requestAuthorsPage),
    takeLatest(A.UPDATE_AUTHOR, updateAuthor),
  ])
}

export default authorsSaga
