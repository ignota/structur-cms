import {
  all,
  call,
  cancel,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  receiveUsers,
  setCurrentUser,
  usersRequestFailed,
} from './actions'
import A from './action-types'
import { globalStorage } from 'app/lib'
import gql from 'graphql-tag'
import { normalize } from 'normalizr'
import { user as userSchema } from './schemas'

function* fetchCurrentUser() {
  try {
    const whomstClient = yield getContext('whomstClient')
    const { data } = yield call(whomstClient.query, {
      query: gql`
        query {
          currentUser {
            email,
            name,
            pictureSRC,
            token,
            uuid,
          },
        },
      `,
    })

    if (!data.currentUser) {
      yield cancel()
      return
    }

    const authData = JSON.stringify({ token: data.currentUser.token })
    globalStorage.setItem('STRUCTUR:AUTH:V1', authData)

    const normalizedUsers = normalize(data.currentUser, userSchema)
    const { users } = normalizedUsers.entities

    yield put([
      receiveUsers(users),
      setCurrentUser(normalizedUsers.result),
    ])
  } catch (err) {
    console.error(err)
    yield put(usersRequestFailed(err))
  }
}

function* signInGoogleAccount({ payload: { idToken } }) {
  try {
    const whomstClient = yield getContext('whomstClient')
    const { data: tokenData } = yield call(whomstClient.mutate, {
      mutation: gql`
        mutation SignInGoogleAccount($idToken: ID!) {
          signInGoogleAccount(idToken: $idToken) {
            email,
            name,
            pictureSRC,
            token,
            uuid,
          }
        },
      `,
      variables: {
        idToken,
      },
    })

    if (!tokenData.signInGoogleAccount) {
      throw new Error('Unauthorized.')
    }

    const authData = JSON.stringify({ token: tokenData.signInGoogleAccount.token })
    globalStorage.setItem('STRUCTUR:AUTH:V1', authData)

    const normalizedUsers = normalize(tokenData.signInGoogleAccount, userSchema)

    yield put([
      receiveUsers(normalizedUsers.entities.users),
      setCurrentUser(normalizedUsers.result),
    ])
  } catch (err) {
    console.error(err)
    yield put(usersRequestFailed(err))
  }
}

function* usersSaga() {
  yield all([
    takeLatest(A.FETCH_CURRENT_USER, fetchCurrentUser),
    takeLatest(A.SIGN_IN_GOOGLE_ACCOUNT, signInGoogleAccount),
  ])
}

export default usersSaga
