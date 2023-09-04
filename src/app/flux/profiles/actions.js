import A from './action-types'

export const addAuthorProfile = author => ({
  payload: {
    author,
  },
  type: A.ADD_AUTHOR_PROFILE,
})

export const authorProfileDeleted = profile => ({
  payload: {
    profile,
  },
  type: A.AUTHOR_PROFILE_DELETED,
})

export const deleteAuthorProfile = profile => ({
  payload: {
    profile,
  },
  type: A.DELETE_AUTHOR_PROFILE,
})

export const profilesRequestFailed = error => ({
  error: true,
  payload: {
    error,
  },
  type: A.PROFILES_REQUEST_FAILED,
})

export const receiveProfiles = profiles => ({
  payload: {
    profiles,
  },
  type: A.RECEIVE_PROFILES,
})

export const updateProfile = profile => ({
  payload: {
    profile,
  },
  type: A.UPDATE_PROFILE,
})
