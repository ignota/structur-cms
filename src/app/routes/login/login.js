/* global gapi */
/* eslint camelcase: 0 */

import { Button, Icon } from '@material-ui/core'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Google } from 'mdi-material-ui'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
import R from 'ramda'
import { Redirect } from 'react-router'

@hot(module)
@connect(
  state => ({
    currentUser: state.users.current,
  }),
  { onSignInGoogleAccount: actions.users.signInGoogleAccount },
)
class Login extends PureComponent {
  handleGoogleAuth() {
    gapi.auth2.authorize(
      {
        client_id: '979597386137-1tgjgamfmtqvel4h1l0jgl2qpplvju0i.apps.googleusercontent.com',
        hosted_domain: 'ignota.media',
        response_type: 'id_token permission',
        scope: 'email openid profile',
      },
      response => {
        if (response.error) {
          return
        }

        this.props.onSignInGoogleAccount(response.id_token)
      },
    )
  }

  render() {
    const {
      location: { state },
      currentUser,
    } = this.props

    const redirectTo = R.propOr('/', 'referrer', state)

    if (currentUser) {
      return <Redirect to={ redirectTo } />
    }

    return (
      <>
        <Helmet>
          <title>Sign In</title>
          <script async defer src='https://apis.google.com/js/api:client.js' />
        </Helmet>
        <h1>
          Sign In
        </h1>
        <Button onClick={ this.handleGoogleAuth }>
          <Icon style={{ marginRight: '0.5rem' }}>
            <Google />
          </Icon>
          Google
        </Button>
      </>
    )
  }
}

export default Login
