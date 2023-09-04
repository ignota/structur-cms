import { createBrowserHistory, createMemoryHistory } from 'history'
import { canUseDOM } from 'exenv'

const history = canUseDOM
  ? createBrowserHistory()
  : createMemoryHistory()

export default history
