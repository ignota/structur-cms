import _ from 'lodash'
import A from './action-types'
import { combineReducers } from 'redux'
import produce from 'immer'
import R from 'ramda'

const byID = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case A.AUTHOR_PROFILE_DELETED:
        delete draft[action.payload.profile]
        break

      case A.RECEIVE_PROFILES:
        _.forEach(action.payload.profiles, (profile, id) => {
          draft[id] = R.mergeDeepRight(draft[id] || {}, profile)
        })
        break
    }
  })

const error = (state = null, action) => {
  switch (action.type) {
    case A.ADD_AUTHOR_PROFILE:
    case A.UPDATE_PROFILE:
      return null

    case A.PROFILES_REQUEST_FAILED:
      return action.payload.error

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case A.ADD_AUTHOR_PROFILE:
    case A.DELETE_AUTHOR_PROFILE:
    case A.UPDATE_PROFILE:
      return true

    case A.AUTHOR_PROFILE_DELETED:
    case A.PROFILES_REQUEST_FAILED:
    case A.RECEIVE_PROFILES:
      return false

    default:
      return state
  }
}

const reducer = combineReducers({
  byID,
  error,
  loading,
})

export default reducer
