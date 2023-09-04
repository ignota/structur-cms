import A from './action-types'

export const authorsRequestFailed = error => ({
  error: true,
  payload: {
    error,
  },
  type: A.AUTHORS_REQUEST_FAILED,
})

export const createAuthor = () => ({
  type: A.CREATE_AUTHOR,
})

export const receiveAuthorProfile = ({ author, profile }) => ({
  payload: {
    author,
    profile,
  },
  type: A.RECEIVE_AUTHOR_PROFILE,
})

export const receiveAuthors = authors => ({
  payload: {
    authors,
  },
  type: A.RECEIVE_AUTHORS,
})

export const receiveAuthorsPage = ({ count, cursor, total }) => ({
  payload: {
    count,
    cursor,
    total,
  },
  type: A.RECEIVE_AUTHORS_PAGE,
})

export const requestAuthor = id => ({
  payload: {
    id,
  },
  type: A.REQUEST_AUTHOR,
})

export const requestAuthors = () => ({
  type: A.REQUEST_AUTHORS,
})

export const requestAuthorsPage = cursor => ({
  payload: {
    cursor,
  },
  type: A.REQUEST_AUTHORS_PAGE,
})

export const updateAuthor = author => ({
  payload: {
    author,
  },
  type: A.UPDATE_AUTHOR,
})
