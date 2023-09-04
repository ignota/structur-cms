import * as reducers from 'app/flux/reducers'
import * as sagas from 'app/flux/sagas'
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createGraphQLClients, history } from 'app/lib'
import createSagaMiddleware, { END } from 'redux-saga'
import { canUseDOM } from 'exenv'
import { reduxBatch } from '@manaflair/redux-batch'
import SagaManager from './saga-manager'

export default function configureStore() {
  const {
    structurClient,
    trysteroClient,
    whomstClient,
  } = createGraphQLClients()

  const sagaMiddleware = createSagaMiddleware({
    context: {
      structurClient,
      trysteroClient,
      whomstClient,
    },
  })

  const middleware = [
    sagaMiddleware,
    routerMiddleware(history),
  ]

  const composeEnhancers =
    __DEV__ &&
    canUseDOM &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ != null
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldCatchErrors: true,
        trace: true,
      })
      : compose

  const enhancer = composeEnhancers(
    reduxBatch,
    applyMiddleware(...middleware),
    reduxBatch,
  )

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
  })

  // let initialState = {}
  // if (canUseDOM && window.__REDUX_STATE__ != null) {
  //   initialState = window.__REDUX_STATE__
  // }

  const store = createStore(
    rootReducer,
    enhancer,
  )

  store.close = () => store.dispatch(END)

  const sagaManager = new SagaManager({ sagaMiddleware, store })
  const rootTask = sagaManager.start(sagas)

  if (module.hot) {
    module.hot.accept(['app/flux/sagas'], () => {
      const nextSagas = require('app/flux/sagas')
      sagaManager.reload(nextSagas)
    })

    module.hot.accept(['app/flux/reducers'], () => {
      const nextReducers = require('app/flux/reducers')
      const nextRootReducer = combineReducers({
        ...nextReducers,
        router: connectRouter(history),
      })
      store.replaceReducer(nextRootReducer)
    })
  }

  return {
    rootTask,
    store,
    structurClient,
    trysteroClient,
    whomstClient,
  }
}
