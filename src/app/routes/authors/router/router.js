import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import Author from '../author'
import { hot } from 'react-hot-loader'
import Main from '../main'

@hot(module)
class AuthorsRouter extends PureComponent {
  render() {
    const {
      match: { path },
    } = this.props

    return (
      <Switch>
        <Route exact component={ Main } path={ path } />
        <Route component={ Author } path={ `${ path }/:uuid` } />
      </Switch>
    )
  }
}

export default AuthorsRouter
