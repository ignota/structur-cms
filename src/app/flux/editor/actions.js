import A from './action-types'

export const change = c => ({
  payload: {
    change: c,
  },
  type: A.CHANGE,
})

export const clearActiveNode = () => ({
  type: A.CLEAR_ACTIVE_NODE,
})

export const editorRequestFailed = error => ({
  error: true,
  payload: {
    error,
  },
  type: A.EDITOR_REQUEST_FAILED,
})

export const editSubtree = ({ key, node, value }) => ({
  payload: {
    key,
    node,
    value,
  },
  type: A.EDIT_SUBTREE,
})

export const finishSubtreeEdit = ({ child, parent }) => ({
  payload: {
    child,
    parent,
  },
  type: A.FINISH_SUBTREE_EDIT,
})

export const receiveNodes = nodes => ({
  payload: {
    nodes,
  },
  type: A.RECEIVE_NODES,
})

export const receivePostBody = value => ({
  payload: {
    value,
  },
  type: A.RECEIVE_POST_BODY,
})

export const reportUploadComplete = job => ({
  payload: {
    job,
  },
  type: A.REPORT_UPLOAD_COMPLETE,
})

export const reportUploadStatus = ({ job, message, percentComplete, status }) => ({
  payload: {
    job,
    message,
    percentComplete,
    status,
  },
  type: A.REPORT_UPLOAD_STATUS,
})

export const requestNode = node => ({
  payload: {
    node,
  },
  type: A.REQUEST_NODE,
})

export const requestPostBody = post => ({
  payload: {
    post,
  },
  type: A.REQUEST_POST_BODY,
})

export const savePostBody = post => ({
  payload: {
    post,
  },
  type: A.SAVE_POST_BODY,
})

export const setActiveNode = key => ({
  payload: {
    key,
  },
  type: A.SET_ACTIVE_NODE,
})

export const subscribeToUploadJob = ({ job, node }) => ({
  payload: {
    job,
    node,
  },
  type: A.SUBSCRIBE_TO_UPLOAD_JOB,
})
