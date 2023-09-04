import {
  all,
  call,
  cancel,
  fork,
  spawn,
  take,
} from 'redux-saga/effects'
import R from 'ramda'

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR'

class SagaManager {
  constructor({ sagaMiddleware, store }) {
    this.store = store
    this.sagaMiddleware = sagaMiddleware
  }

  cancel() {
    this.store.dispatch({ type: CANCEL_SAGAS_HMR })
  }

  reload(nextSagas) {
    this.cancel()
    this.start(nextSagas)
  }

  start(sagas) {
    const sagaFns = Object.values(sagas).filter(R.is(Function))

    if (__DEV__) {
      const abortableSaga = this.createAbortableSaga(sagaFns)
      return this.sagaMiddleware.run(abortableSaga)
    }

    const rootSaga = this.createRootSaga(sagaFns)
    return this.sagaMiddleware.run(rootSaga)
  }

  createAbortableSaga(sagas) {
    return function* abortable() {
      yield all(sagas.map(saga =>
        spawn(function* () {
          while (true) {
            try {
              yield fork(saga)
              yield take(CANCEL_SAGAS_HMR)
              yield cancel()
            } catch (e) {
              console.error(e)
            }
          }
        }),
      ))
    }
  }

  createRootSaga(sagas) {
    return function* root() {
      yield all(sagas.map(saga => saga()))
    }
  }
}

export default SagaManager
