import A from './action-types'

export const fetchCurrentUser = () => ({
  type: A.FETCH_CURRENT_USER,
})

export const receiveUsers = users => ({
  payload: {
    users,
  },
  type: A.RECEIVE_USERS,
})

export const setCurrentUser = uuid => ({
  payload: {
    uuid,
  },
  type: A.SET_CURRENT_USER,
})

export const signInGoogleAccount = idToken => ({
  payload: {
    idToken,
  },
  type: A.SIGN_IN_GOOGLE_ACCOUNT,
})

export const usersRequestFailed = error => ({
  error: true,
  payload: {
    error,
  },
  type: A.USERS_REQUEST_FAILED,
})
