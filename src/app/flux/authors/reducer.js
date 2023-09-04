import _ from 'lodash'
import A from './action-types'
import { combineReducers } from 'redux'
import produce from 'immer'
import R from 'ramda'

const byID = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case A.RECEIVE_AUTHORS:
        _.forEach(action.payload.authors, (author, id) => {
          draft[id] = R.mergeDeepRight(draft[id] || {}, author)
        })
        break

      case A.RECEIVE_AUTHOR_PROFILE: {
        const { author, profile } = action.payload
        draft[author].profiles = draft[author].profiles || []
        draft[author].profiles.push(profile)
        break
      }
    }
  })

const currentPage = (state = '', action) => {
  switch (action.type) {
    case A.RECEIVE_AUTHORS_PAGE:
      return action.payload.cursor

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case A.AUTHORS_REQUEST_FAILED:
      return action.payload.error

    case A.CREATE_AUTHOR:
    case A.REQUEST_AUTHOR:
    case A.REQUEST_AUTHORS:
    case A.UPDATE_AUTHOR:
      return null

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case A.AUTHORS_REQUEST_FAILED:
    case A.RECEIVE_AUTHORS:
      return false

    case A.CREATE_AUTHOR:
    case A.REQUEST_AUTHOR:
    case A.REQUEST_AUTHORS:
    case A.UPDATE_AUTHOR:
      return true

    default:
      return state
  }
}

const totalPages = (state = 0, action) => {
  switch (action.type) {
    case A.RECEIVE_AUTHORS_PAGE: {
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
