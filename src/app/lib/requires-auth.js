import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import Loading from 'app/components/loading'
import { Redirect } from 'react-router'
import { wrapDisplayName } from 'recompose'

const requiresAuth = WrappedComponent => {
  @connect(
    state => ({
      currentUser: state.users.current,
      loading: state.users.loading,
    }),
    { onFetchCurrentUser: actions.users.fetchCurrentUser },
  )
  class RequiresAuth extends PureComponent {
    static getDerivedStateFromProps(props) {
      return {
        loading: props.loading,
      }
    }

    static displayName = wrapDisplayName(WrappedComponent, 'requiresAuth')

    constructor(props) {
      super(props)

      const { currentUser } = props

      if (!currentUser) {
        props.onFetchCurrentUser()
        this.state = { loading: true }
      } else {
        this.state = { loading: false }
      }
    }

    render() {
      const {
        currentUser,
        loading: _loading,
        onFetchCurrentUser: _onFetchCurrentUser,
        ...props
      } = this.props
      const { loading } = this.state

      const referrer = props.location.pathname

      if (loading) {
        return <Loading />
      }

      if (!loading && !currentUser) {
        return <Redirect to={{ pathname: '/login', state: { referrer } }} />
      }

      return (
        <WrappedComponent { ...props } />
      )
    }
  }

  return hoistNonReactStatics(RequiresAuth, WrappedComponent)
}

export default requiresAuth
