import _ from 'lodash'
import A from './action-types'
import { combineReducers } from 'redux'
import produce from 'immer'
import R from 'ramda'

const byID = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case A.RECEIVE_USERS:
        _.forEach(action.payload.users, (user, id) => {
          draft[id] = R.mergeDeepRight(draft[id] || {}, user)
        })
        break
    }
  })

const current = (state = '', action) => {
  switch (action.type) {
    case A.SET_CURRENT_USER:
      return action.payload.uuid

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case A.SIGN_IN_GOOGLE_ACCOUNT:
      return null

    case A.USERS_REQUEST_FAILED:
      return action.payload.error

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case A.RECEIVE_USERS:
    case A.USERS_REQUEST_FAILED:
      return false

    case A.SIGN_IN_GOOGLE_ACCOUNT:
      return true

    default:
      return state
  }
}

const reducer = combineReducers({
  byID,
  current,
  error,
  loading,
})

export default reducer
