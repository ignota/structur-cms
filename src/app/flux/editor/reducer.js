import _ from 'lodash'
import A from './action-types'
import { combineReducers } from 'redux'
import produce from 'immer'
import R from 'ramda'
import { Value } from 'slate'

export const DEFAULT_VALUE = Value.fromJSON({
  document: {
    nodes: [
      {
        nodes: [
          {
            leaves: [
              { text: '' },
            ],
            object: 'text',
          },
        ],
        object: 'block',
        type: 'Paragraph',
      },
    ],
  },
})

const activeNode = (state = null, action) => {
  switch (action.type) {
    case A.CLEAR_ACTIVE_NODE:
      return null

    case A.SET_ACTIVE_NODE:
      return action.payload.key

    case A.EDIT_SUBTREE:
      return null

    case A.FINISH_SUBTREE_EDIT:
      return action.payload.parent.node.key

    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case A.EDITOR_REQUEST_FAILED:
      return action.payload.error

    case A.REQUEST_POST_BODY:
    case A.SAVE_POST_BODY:
      return null

    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case A.REQUEST_POST_BODY:
    case A.SAVE_POST_BODY:
      return true

    case A.EDITOR_REQUEST_FAILED:
    case A.RECEIVE_POST_BODY:
      return false

    default:
      return state
  }
}

const nodesByID = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case A.RECEIVE_NODES:
        _.forEach(action.payload.nodes, (node, id) => {
          draft[id] = R.mergeDeepRight(draft[id] || {}, node)
        })
        break
    }
  })

const parent = (state = {}, action) => {
  switch (action.type) {
    case A.EDIT_SUBTREE:
      return action.payload

    case A.FINISH_SUBTREE_EDIT:
      return {}

    default:
      return state
  }
}

const uploadsByJobID = (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case A.REPORT_UPLOAD_COMPLETE:
        delete draft[action.payload.job]
        break

      case A.REPORT_UPLOAD_STATUS: {
        const { job, ...status } = action.payload
        draft[job] = status
        break
      }
    }
  })

const value = (state = DEFAULT_VALUE, action) => {
  switch (action.type) {
    case A.CHANGE:
      return action.payload.change.value

    case A.EDIT_SUBTREE: {
      const { key, node } = action.payload
      const rawValue = node.data.get(key)

      if (rawValue) {
        return Value.fromJSON(rawValue)
      }

      return DEFAULT_VALUE
    }

    case A.FINISH_SUBTREE_EDIT: {
      const {
        child,
        parent: {
          key,
          node: parent,
          value: parentValue,
        },
      } = action.payload

      const { value } = parentValue.change()
        .setNodeByKey(parent.key, {
          data: parent.data.set(key, child.toJSON()),
        })
        .focus()
      return value
    }

    case A.RECEIVE_POST_BODY:
      return Value.fromJSON(action.payload.value)

    default:
      return state
  }
}

const reducer = combineReducers({
  activeNode,
  error,
  loading,
  nodesByID,
  parent,
  uploadsByJobID,
  value,
})

export default reducer
