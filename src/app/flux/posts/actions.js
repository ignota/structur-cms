import A from './action-types'

export const addTag = ({ post, tag }) => ({
  payload: {
    post,
    tag,
  },
  type: A.ADD_TAG,
})

export const createAuthorForPost = ({ author, post }) => ({
  payload: {
    author,
    post,
  },
  type: A.CREATE_AUTHOR_FOR_POST,
})

export const createPost = () => ({
  type: A.CREATE_POST,
})

export const deletePost = post => ({
  payload: {
    post,
  },
  type: A.DELETE_POST,
})

export const postDeleted = post => ({
  payload: {
    post,
  },
  type: A.POST_DELETED,
})

export const postRequestFailed = error => ({
  error: true,
  payload: {
    error,
  },
  type: A.POST_REQUEST_FAILED,
})

export const receivePostPage = ({ count, cursor, total }) => ({
  payload: {
    count,
    cursor,
    total,
  },
  type: A.RECEIVE_POST_PAGE,
})

export const receivePosts = posts => ({
  payload: {
    posts,
  },
  type: A.RECEIVE_POSTS,
})

export const removeAuthor = ({ author, post }) => ({
  payload: {
    author,
    post,
  },
  type: A.REMOVE_AUTHOR,
})

export const removeTag = ({ post, tag }) => ({
  payload: {
    post,
    tag,
  },
  type: A.REMOVE_TAG,
})

export const requestPost = id => ({
  payload: {
    id,
  },
  type: A.REQUEST_POST,
})

export const requestPostPage = cursor => ({
  payload: {
    cursor,
  },
  type: A.REQUEST_POST_PAGE,
})

export const requestPosts = () => ({
  type: A.REQUEST_POSTS,
})

export const requestPostsForAuthor = ({ author, cursor }) => ({
  payload: {
    author,
    cursor,
  },
  type: A.REQUEST_POSTS_FOR_AUTHOR,
})

export const requestPostsForTag = ({ cursor, tag }) => ({
  payload: {
    cursor,
    tag,
  },
  type: A.REQUEST_POSTS_FOR_TAG,
})

export const setPostAuthor = ({ author, post }) => ({
  payload: {
    author,
    post,
  },
  type: A.SET_POST_AUTHOR,
})

export const transitionPost = ({ post, transition }) => ({
  payload: {
    post,
    transition,
  },
  type: A.TRANSITION_POST,
})

export const updatePost = post => ({
  payload: {
    post,
  },
  type: A.UPDATE_POST,
})
