import { defaultDataIdFromObject, InMemoryCache } from 'apollo-cache-inmemory'
import ActionCable from 'actioncable'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { canUseDOM } from 'exenv'
import { createHttpLink } from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client'
import globalStorage from './global-storage'
import { setContext } from 'apollo-link-context'

function createStructurClient() {
  let initialState = {}
  if (canUseDOM && window.__STRUCTUR_STATE__ != null) {
    initialState = window.__STRUCTUR_STATE__
  }

  const uploadLink = createUploadLink({
    fetchOptions: {
      mode: __SERVER_SIDE__ ? 'same-origin' : 'cors',
    },
    uri: __STRUCTUR_URI__,
  })
  const authLink = setContext((_, { headers }) => {
    const tokenString = globalStorage.getItem('STRUCTUR:AUTH:V1')
    const { token = null } = JSON.parse(tokenString) || {}

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${ token }` : null,
      },
    }
  })

  let link
  if (canUseDOM) {
    const hasSubscriptionOperation = ({ query: { definitions } }) =>
      definitions.some(
        ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription',
      )

    const tokenString = globalStorage.getItem('STRUCTUR:AUTH:V1')
    const { token = null } = JSON.parse(tokenString) || {}
    const cable = ActionCable.createConsumer(__CABLE_URI__, token)

    link = ApolloLink.split(
      hasSubscriptionOperation,
      new ActionCableLink({ cable, channelName: 'GraphQLChannel' }),
      authLink.concat(uploadLink),
    )
  } else {
    link = authLink.concat(uploadLink)
  }

  const cache = new InMemoryCache({
    dataIdFromObject: object => object.uuid ?? defaultDataIdFromObject(object),
  }).restore(initialState)

  const structurClient = new ApolloClient({
    cache,
    connectToDevTools: __DEV__,
    link,
    ssrMode: __SERVER_SIDE__,
  })

  return structurClient
}

function createTrysteroClient() {
  let initialState = {}
  if (canUseDOM && window.__TRYSTERO_STATE__ != null) {
    initialState = window.__TRYSTERO_STATE__
  }

  const httpLink = createHttpLink({
    fetchOptions: {
      mode: __SERVER_SIDE__ ? 'same-origin' : 'cors',
    },
    uri: __TRYSTERO_URI__,
  })
  const authLink = setContext((_, { headers }) => {
    const tokenString = globalStorage.getItem('STRUCTUR:AUTH:V1')
    const { token = null } = JSON.parse(tokenString) || {}

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${ token }` : null,
      },
    }
  })

  const link = authLink.concat(httpLink)

  const cache = new InMemoryCache({
    dataIdFromObject: object => object.uuid ?? defaultDataIdFromObject(object),
  }).restore(initialState)

  const trysteroClient = new ApolloClient({
    cache,
    connectToDevTools: __DEV__,
    link,
    ssrMode: __SERVER_SIDE__,
  })

  return trysteroClient
}

function createWhomstClient() {
  let initialState = {}
  if (canUseDOM && window.__WHOMST_STATE__ != null) {
    initialState = window.__WHOMST_STATE__
  }

  const httpLink = createHttpLink({
    fetchOptions: {
      mode: __SERVER_SIDE__ ? 'same-origin' : 'cors',
    },
    uri: __WHOMST_URI__,
  })
  const authLink = setContext((_, { headers }) => {
    const tokenString = globalStorage.getItem('STRUCTUR:AUTH:V1')
    const { token = null } = JSON.parse(tokenString) || {}

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${ token }` : null,
      },
    }
  })

  const link = authLink.concat(httpLink)

  const cache = new InMemoryCache({
    dataIdFromObject: object => object.uuid ?? defaultDataIdFromObject(object),
  }).restore(initialState)

  const whomstClient = new ApolloClient({
    cache,
    connectToDevTools: __DEV__,
    link,
    ssrMode: __SERVER_SIDE__,
  })

  return whomstClient
}

export default function createGraphQLClients() {
  return {
    structurClient: createStructurClient(),
    trysteroClient: createTrysteroClient(),
    whomstClient: createWhomstClient(),
  }
}
