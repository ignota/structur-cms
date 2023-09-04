import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import { hot } from 'react-hot-loader'
import Main from '../main'
import Tag from '../tag'

@hot(module)
class TagsRouter extends PureComponent {
  render() {
    const {
      match: { path },
    } = this.props

    return (
      <Switch>
        <Route exact component={ Main } path={ path } />
        <Route component={ Tag } path={ `${ path }/:uuid` } />
      </Switch>
    )
  }
}

export default TagsRouter
