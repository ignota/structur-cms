import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import { hot } from 'react-hot-loader'
import Main from '../main'
import Post from '../post'

@hot(module)
class PostsRouter extends PureComponent {
  render() {
    const {
      match: { path },
    } = this.props

    return (
      <Switch>
        <Route exact component={ Main } path={ path } />
        <Route component={ Post } path={ `${ path }/:uuid` } />
      </Switch>
    )
  }
}

export default PostsRouter
