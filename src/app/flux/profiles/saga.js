import {
  all,
  call,
  getContext,
  put,
  takeLatest,
} from 'redux-saga/effects'
import {
  authorProfileDeleted,
  profilesRequestFailed,
  receiveProfiles,
} from './actions'
import A from './action-types'
import { actions as authorsActions } from '../authors'
import gql from 'graphql-tag'
import { normalize } from 'normalizr'
import { profile as profileSchema } from './schemas'
import R from 'ramda'

function* addAuthorProfile({ payload: { author } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation AddAuthorProfile($author: ID!) {
          addAuthorProfile(author: $author) {
            uuid,
          },
        },
      `,
      variables: {
        author,
      },
    })

    if (!data.addAuthorProfile) {
      throw new Error()
    }

    const normalizedProfiles = normalize(data.addAuthorProfile, profileSchema)

    yield put([
      receiveProfiles(normalizedProfiles.entities.profiles),
      authorsActions.receiveAuthorProfile({ author, profile: normalizedProfiles.result }),
    ])
  } catch (err) {
    console.error(err)
    yield put(profilesRequestFailed(err))
  }
}

function* deleteAuthorProfile({ payload: { profile } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation DeleteAuthorProfile($profile: ID!) {
          deleteProfile(profile: $profile) {
            uuid,
          },
        }
      `,
      variables: {
        profile,
      },
    })

    if (!data.deleteProfile) {
      throw new Error(data.error)
    }

    yield put(authorProfileDeleted(data.deleteProfile.uuid))
  } catch (error) {
    console.error(error)
    yield put(profilesRequestFailed(error))
  }
}

function* updateProfile({ payload: { profile } }) {
  try {
    const structurClient = yield getContext('structurClient')
    const filteredProfile = R.omit(['__typename', 'createdAt', 'id', 'updatedAt'], profile)
    const { data } = yield call(structurClient.mutate, {
      mutation: gql`
        mutation UpdateProfile($profile: ProfileInput!) {
          updateProfile(profile: $profile) {
            provider,
            providerID,
            url,
            uuid,
          },
        },
      `,
      variables: {
        profile: filteredProfile,
      },
    })

    if (!data.updateProfile) {
      throw new Error()
    }

    const normalizedProfiles = normalize(data.updateProfile, profileSchema)

    yield put(receiveProfiles(normalizedProfiles.entities.profiles))
  } catch (err) {
    console.error(err)
    yield put(profilesRequestFailed(err))
  }
}

function* profilesSaga() {
  yield all([
    takeLatest(A.ADD_AUTHOR_PROFILE, addAuthorProfile),
    takeLatest(A.DELETE_AUTHOR_PROFILE, deleteAuthorProfile),
    takeLatest(A.UPDATE_PROFILE, updateProfile),
  ])
}

export default profilesSaga
