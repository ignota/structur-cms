import _ from 'lodash'
import A from './action-types'
import { combineReducers } from 'redux'
import produce from 'immer'
import R from 'ramda'

const byID = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case A.POST_DELETED:
        delete draft[action.payload.post]
        break

      case A.RECEIVE_POSTS:
        _.forEach(action.payload.posts, (post, id) => {
          draft[id] = R.mergeDeepRight(draft[id] || {}, post)
        })
        break
    }
  })

const currentPage = (state = '', action) => {
  switch (action.type) {
    case A.RECEIVE_POST_PAGE:
      return action.payload.cursor

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case A.REQUEST_POST:
    case A.REQUEST_POSTS:
    case A.TRANSITION_POST:
      return null

    case A.POST_REQUEST_FAILED:
      return action.payload.error

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case A.DELETE_POST:
    case A.POST_REQUEST_FAILED:
    case A.RECEIVE_POSTS:
      return false

    case A.POST_DELETED:
    case A.REQUEST_POST:
    case A.REQUEST_POSTS:
    case A.SET_POST_AUTHOR:
    case A.TRANSITION_POST:
      return true

    default:
      return state
  }
}

const totalPages = (state = 0, action) => {
  switch (action.type) {
    case A.RECEIVE_POST_PAGE: {
      const { count, total } = action.payload
      return ((total - total % count) / count) + 1
    }

    default:
      return state
  }
}

const reducer = combineReducers({
  byID,
  currentPage,
  error,
  loading,
  totalPages,
})

export default reducer
