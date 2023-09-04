import A from './action-types'
import { combineReducers } from 'redux'

const error = (state = null, action) => {
  switch (action.type) {
    case A.SOCIAL_REQUEST_FAILED:
      return action.payload.error

    case A.SUBSCRIBE_TO_NEWSLETTER:
      return null

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case A.RECEIVE_NEWSLETTER_SUBSCRIPTION:
    case A.SOCIAL_REQUEST_FAILED:
      return false

    case A.SUBSCRIBE_TO_NEWSLETTER:
      return true

    default:
      return state
  }
}

const reducer = combineReducers({
  error,
  loading,
})

export default reducer
