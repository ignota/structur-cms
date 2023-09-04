import _ from 'lodash'
import A from './action-types'
import { combineReducers } from 'redux'
import produce from 'immer'
import R from 'ramda'

const byID = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case A.RECEIVE_TAGS:
        _.forEach(action.payload.tags, (tag, id) => {
          draft[id] = R.mergeDeepRight(draft[id] || {}, tag)
        })
        break
    }
  })

const currentPage = (state = '', action) => {
  switch (action.type) {
    case A.RECEIVE_TAGS_PAGE:
      return action.payload.cursor

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case A.TAGS_REQUEST_FAILED:
      return action.payload.error

    case A.CREATE_TAG:
    case A.REQUEST_TAG:
    case A.REQUEST_TAGS:
    case A.UPDATE_TAG:
      return null

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case A.RECEIVE_TAGS:
    case A.TAGS_REQUEST_FAILED:
      return false

    case A.CREATE_TAG:
    case A.REQUEST_TAG:
    case A.REQUEST_TAGS:
    case A.UPDATE_TAG:
      return true

    default:
      return state
  }
}

const totalPages = (state = 0, action) => {
  switch (action.type) {
    case A.RECEIVE_TAGS_PAGE: {
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
