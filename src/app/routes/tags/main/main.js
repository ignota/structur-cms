import { AbsoluteButton, Root } from './styled-main'
import {
  Avatar,
  Chip,
} from '@material-ui/core'
import { Plus, Tag } from 'mdi-material-ui'
import React, { PureComponent } from 'react'
import _ from 'lodash/fp'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { requiresAuth } from 'app/lib'

@requiresAuth
@connect(
  state => ({
    tags: state.tags.byID,
  }),
  {
    onCreateTag: actions.tags.createTag,
    onRequestTags: actions.tags.requestTags,
  },
)
class Main extends PureComponent {
  UNSAFE_componentWillMount() {
    this.props.onRequestTags()
  }

  handleCreateTag() {
    this.props.onCreateTag()
  }

  renderTag(tag) {
    return (
      <Chip
        clickable
        avatar={ <Avatar><Tag /></Avatar> }
        component={ Link }
        key={ tag.uuid }
        label={ tag.name ?? 'Unnamed Tag' }
        to={ `/tags/${ tag.uuid }` } />
    )
  }

  render() {
    const {
      tags,
    } = this.props

    return (
          <>
            <Helmet>
              <title>Tags</title>
            </Helmet>
            <AbsoluteButton color='secondary' variant='fab' onClick={ this.handleCreateTag }>
              <Plus />
            </AbsoluteButton>
            <Root>
              { _.map(this.renderTag, tags) }
            </Root>
          </>
    )
  }
}

export default Main
