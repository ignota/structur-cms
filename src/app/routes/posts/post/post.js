import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Editor } from 'app/editor'
import { Helmet } from 'react-helmet'
import R from 'ramda'
import { requiresAuth } from 'app/lib'

@requiresAuth
@connect(
  (state, props) => {
    const {
      match: {
        params: { uuid },
      },
    } = props

    const post = R.propOr({}, uuid, state.posts.byID)

    return {
      post,
    }
  },
  {
    onRequestPost: actions.posts.requestPost,
    onRequestPostBody: actions.editor.requestPostBody,
  },
)
class Post extends PureComponent {
  UNSAFE_componentWillMount() {
    const {
      match: {
        params: { uuid },
      },
      onRequestPost,
      onRequestPostBody,
    } = this.props

    onRequestPost(uuid)
    onRequestPostBody(uuid)
  }

  render() {
    const {
      match: {
        params: { uuid },
      },
      post,
    } = this.props

    return (
          <>
            <Helmet>
              <title>{ post.title || 'Untitled Post' }</title>
            </Helmet>
            <Editor postID={ uuid } />
          </>
    )
  }
}

export default Post
