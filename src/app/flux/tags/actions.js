import A from './action-types'

export const createTag = ({ post, tag } = {}) => ({
  payload: {
    post,
    tag,
  },
  type: A.CREATE_TAG,
})

export const receiveTags = tags => ({
  payload: {
    tags,
  },
  type: A.RECEIVE_TAGS,
})

export const receiveTagsPage = ({ count, cursor, total }) => ({
  payload: {
    count,
    cursor,
    total,
  },
  type: A.RECEIVE_TAGS_PAGE,
})

export const requestTag = id => ({
  payload: {
    id,
  },
  type: A.REQUEST_TAG,
})

export const requestTags = () => ({
  type: A.REQUEST_TAGS,
})

export const requestTagsPage = cursor => ({
  payload: {
    cursor,
  },
  type: A.REQUEST_TAGS_PAGE,
})

export const tagsRequestFailed = error => ({
  error: true,
  payload: {
    error,
  },
  type: A.TAGS_REQUEST_FAILED,
})

export const updateTag = tag => ({
  payload: {
    tag,
  },
  type: A.UPDATE_TAG,
})
