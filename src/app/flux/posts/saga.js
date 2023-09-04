import * as authorsActions from '../authors/actions'
import * as profilesActions from '../profiles/actions'
import * as tagsActions from '../tags/actions'
import {
  all,
  call,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  postDeleted,
  postRequestFailed,
  receivePostPage,
  receivePosts,
} from './actions'
import A from './action-types'
import gql from 'graphql-tag'
import { normalize } from 'normalizr'
import { post as postSchema } from './schemas'
import { push } from 'connected-react-router'
import R from 'ramda'

function* addTag({ payload: { post, tag } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation AddTag($post: ID!, $tag: ID!) {
          addTag(post: $post, tag: $tag) {
            tags {
              uuid,
            },
            uuid,
          }
        }
      `,
      variables: {
        post,
        tag,
      },
    })

    const normalizedPosts = normalize(data.addTag, postSchema)

    yield put([
      receivePosts(normalizedPosts.entities.posts),
      tagsActions.receiveTags(normalizedPosts.entities.tags),
    ])
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* createAuthorForPost({ payload: { author, post } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation CreateAuthorForPost($author: AuthorInput!, $post: ID!) {
          createAuthorForPost(author: $author, post: $post) {
            authors {
              name,
              uuid,
            },
            uuid,
          }
        }
      `,
      variables: {
        author,
        post,
      },
    })

    const normalizedPosts = normalize(data.createAuthorForPost, postSchema)

    yield put([
      receivePosts(normalizedPosts.entities.posts),
      authorsActions.receiveAuthors(normalizedPosts.entities.authors),
    ])
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* createPost() {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation {
          createPost {
            uuid,
          },
        },
      `,
    })

    const normalizedPosts = normalize(data.createPost, postSchema)

    yield put(receivePosts(normalizedPosts.entities.posts))
    yield put(push(`/posts/${ normalizedPosts.result }`))
  } catch (error) {
    console.error(error)
    yield put(postRequestFailed(error))
  }
}

function* deletePost({ payload: { post } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation DeletePost($post: ID!) {
          deletePost(post: $post) {
            uuid,
          },
        }
      `,
      variables: {
        post,
      },
    })

    if (!data.deletePost) {
      throw new Error(data.error)
    }

    yield put(postDeleted(data.deletePost.uuid))
  } catch (error) {
    console.error(error)
    yield put(postRequestFailed(error))
  }
}

function* removeAuthor({ payload: { author, post } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation RemoveAuthor($author: ID!, $post: ID!) {
          removeAuthor(author: $author, post: $post) {
            authors {
              uuid,
            },
            uuid,
          }
        }
      `,
      variables: {
        author,
        post,
      },
    })

    const normalizedPosts = normalize(data.removeAuthor, postSchema)

    yield put([
      receivePosts(normalizedPosts.entities.posts),
      authorsActions.receiveAuthors(normalizedPosts.entities.authors),
    ])
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* removeTag({ payload: { post, tag } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation RemoveTag($post: ID!, $tag: ID!) {
          removeTag(post: $post, tag: $tag) {
            tags {
              uuid,
            },
            uuid,
          }
        }
      `,
      variables: {
        post,
        tag,
      },
    })

    const normalizedPosts = normalize(data.removeTag, postSchema)

    yield put([
      receivePosts(normalizedPosts.entities.posts),
      tagsActions.receiveTags(normalizedPosts.entities.tags),
    ])
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* requestPosts() {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query {
          posts {
            authors {
              bio,
              featured,
              lastPost,
              name,
              pictureSRC,
              profiles {
                provider,
                providerID,
                url,
                uuid,
              },
              slug,
              uuid,
            },
            createdAt,
            excerpt,
            heroSRC,
            publishedAt,
            rootNode,
            slug,
            tags {
              color,
              description,
              gradient,
              heroSRC,
              lastPost,
              name,
              slug,
              uuid,
            },
            title,
            updatedAt,
            uuid,
            visibility,
          },
        },
      `,
    })

    if (!data.posts || !Array.isArray(data.posts) || data.posts.length === 0) {
      yield put(push('/404'))
      return
    }

    const normalizedPosts = normalize(data.posts, [postSchema])

    yield put([
      receivePosts(normalizedPosts.entities.posts),
      authorsActions.receiveAuthors(normalizedPosts.entities.authors),
      profilesActions.receiveProfiles(normalizedPosts.entities.profiles),
      tagsActions.receiveTags(normalizedPosts.entities.tags),
    ])
  } catch (error) {
    console.error(error)
    yield put(postRequestFailed(error))
  }
}

function* requestPost({ payload: { id } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query SinglePost($id: ID!) {
          post(id: $id) {
            authors {
              bio,
              featured,
              lastPost,
              name,
              pictureSRC,
              profiles {
                provider,
                providerID,
                url,
                uuid,
              },
              slug,
              uuid,
            },
            createdAt,
            excerpt,
            heroSRC,
            publishedAt,
            rootNode,
            slug,
            tags {
              color,
              description,
              gradient,
              heroSRC,
              lastPost,
              name,
              slug,
              uuid,
            },
            title,
            updatedAt,
            uuid,
            visibility,
          },
        },
      `,
      variables: { id },
    })

    if (!data.post) {
      yield put(push('/404'))
      return
    }

    const normalizedPost = normalize(data.post, postSchema)
    const {
      authors,
      posts,
      profiles,
      tags,
    } = normalizedPost.entities

    yield put([
      receivePosts(posts),
      authorsActions.receiveAuthors(authors),
      profilesActions.receiveProfiles(profiles),
      tagsActions.receiveTags(tags),
    ])
  } catch (error) {
    console.error(error)
    yield put(postRequestFailed(error))
  }
}

function* requestPostPage({ payload: { cursor } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query PostsByPage($cursor: ID) {
          postsByPage(cursor: $cursor) {
            posts {
              authors {
                bio,
                featured,
                lastPost,
                name,
                pictureSRC,
                profiles {
                  provider,
                  providerID,
                  url,
                  uuid,
                },
                slug,
                uuid,
              },
              createdAt,
              excerpt,
              heroSRC,
              publishedAt,
              rootNode,
              slug,
              tags {
                color,
                description,
                gradient,
                heroSRC,
                lastPost,
                name,
                slug,
                uuid,
              },
              title,
              updatedAt,
              uuid,
              visibility,
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
      !data.postsByPage ||
      !data.postsByPage.posts ||
      !Array.isArray(data.postsByPage.posts) ||
      data.postsByPage.posts.length === 0
    ) {
      return
    }

    const normalizedPosts = normalize(data.postsByPage.posts, [postSchema])

    yield put([
      receivePostPage(data.postsByPage.pagination),
      receivePosts(normalizedPosts.entities.posts),
      authorsActions.receiveAuthors(normalizedPosts.entities.authors),
      profilesActions.receiveProfiles(normalizedPosts.entities.profiles),
      tagsActions.receiveTags(normalizedPosts.entities.tags),
    ])
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* requestPostsForAuthor({ payload: { author, cursor } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query RequestPostsForAuthor($author: ID!, $cursor: ID) {
          postsForAuthor(author: $author, cursor: $cursor) {
            posts {
              authors {
                bio,
                featured,
                lastPost,
                name,
                pictureSRC,
                profiles {
                  provider,
                  providerID,
                  url,
                  uuid,
                },
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
            pagination {
              count,
              cursor,
              total,
            },
          }
        }
      `,
      variables: {
        author,
        cursor,
      },
    })

    if (!data.postsForAuthor) {
      throw new Error(data.error)
    }

    const normalizedPosts = normalize(data.postsForAuthor.posts, [postSchema])

    yield put([
      receivePostPage(data.postsForAuthor.pagination),
      receivePosts(normalizedPosts.entities.posts),
      authorsActions.receiveAuthors(normalizedPosts.entities.authors),
      profilesActions.receiveProfiles(normalizedPosts.entities.profiles),
      tagsActions.receiveTags(normalizedPosts.entities.tags),
    ])
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* requestPostsForTag({ payload: { cursor, tag } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.query, {
      query: gql`
        query RequestPostsForAuthor($cursor: ID, $tag: ID!) {
          postsForTag(cursor: $cursor, tag: $tag) {
            posts {
              authors {
                bio,
                featured,
                lastPost,
                name,
                pictureSRC,
                profiles {
                  provider,
                  providerID,
                  url,
                  uuid,
                },
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
        tag,
      },
    })

    if (!data.postsForAuthor) {
      throw new Error(data.error)
    }

    const normalizedPosts = normalize(data.postsForAuthor.posts, [postSchema])

    yield put([
      receivePostPage(data.postsForAuthor.pagination),
      receivePosts(normalizedPosts.entities.posts),
      authorsActions.receiveAuthors(normalizedPosts.entities.authors),
      profilesActions.receiveProfiles(normalizedPosts.entities.profiles),
      tagsActions.receiveTags(normalizedPosts.entities.tags),
    ])
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* setPostAuthor({ payload: { author, post } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation SetPostAuthor($author: ID!, $post: ID!) {
          setPostAuthor(author: $author, post: $post) {
            authors {
              uuid,
            },
            uuid,
          },
        },
      `,
      variables: {
        author,
        post,
      },
    })

    const normalizedPosts = normalize(data.setPostAuthor, postSchema)

    yield put(receivePosts(normalizedPosts.entities.posts))
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* transitionPost({ payload: { post, transition } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation TransitionPost($post: ID!, $transition: PostTransitionEnum!) {
          transitionPost(post: $post, transition: $transition) {
            publishedAt
            slug
            updatedAt
            uuid
            visibility
          }
        }
      `,
      variables: {
        post,
        transition,
      },
    })

    const normalizedPost = normalize(data.transitionPost, postSchema)

    yield put(receivePosts(normalizedPost.entities.posts))
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* updatePost({ payload: { post } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const filteredPost = R.omit(['__typename', 'authors', 'createdAt', 'heroSRC', 'id', 'publishedAt', 'rootNode', 'tags', 'updatedAt'], post)
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation UpdatePost($post: PostInput!) {
          updatePost(post: $post) {
            createdAt,
            excerpt,
            heroSRC,
            publishedAt,
            slug,
            title,
            updatedAt,
            uuid,
            visibility,
          },
        },
      `,
      variables: {
        post: filteredPost,
      },
    })

    const normalizedPost = normalize(data.updatePost, postSchema)

    yield put(receivePosts(normalizedPost.entities.posts))
  } catch (err) {
    console.error(err)
    yield put(postRequestFailed(err))
  }
}

function* postsSaga() {
  yield all([
    takeLatest(A.ADD_TAG, addTag),
    takeLatest(A.CREATE_AUTHOR_FOR_POST, createAuthorForPost),
    takeLatest(A.CREATE_POST, createPost),
    takeLatest(A.DELETE_POST, deletePost),
    takeLatest(A.REMOVE_AUTHOR, removeAuthor),
    takeLatest(A.REMOVE_TAG, removeTag),
    takeLatest(A.REQUEST_POST, requestPost),
    takeLatest(A.REQUEST_POST_PAGE, requestPostPage),
    takeLatest(A.REQUEST_POSTS, requestPosts),
    takeLatest(A.REQUEST_POSTS_FOR_AUTHOR, requestPostsForAuthor),
    takeLatest(A.REQUEST_POSTS_FOR_TAG, requestPostsForTag),
    takeLatest(A.SET_POST_AUTHOR, setPostAuthor),
    takeLatest(A.TRANSITION_POST, transitionPost),
    takeLatest(A.UPDATE_POST, updatePost),
  ])
}

export default postsSaga
