import {
  CompleteAuthors,
  CompleteTags,
} from 'app/components/autocomplete'
import {
  Grid,
  IconButton,
  TextField,
} from '@material-ui/core'
import {
  PostVisibility,
  VisibilityPanel,
} from 'app/components/post-visibility'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'
import { actions } from 'app/flux'
import Clipboard from 'clipboard'
import { connect } from 'react-redux'
import { ContentCopy } from 'mdi-material-ui'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { getUploadURL } from 'app/lib'
import { NativeTypes } from 'react-dnd-html5-backend'
import { push } from 'connected-react-router'
import R from 'ramda'

@connect(
  (state, props) => {
    const { postID } = props

    const post = R.propOr({}, postID, state.posts.byID)
    const loading = state.editor.loading || state.posts.loading

    return {
      loading,
      post,
    }
  },
  {
    onDeletePost: actions.posts.deletePost,
    onPush: push,
    onSavePostBody: actions.editor.savePostBody,
    onTransitionPost: actions.posts.transitionPost,
    onUpdatePost: actions.posts.updatePost,
  },
)
@DropTarget(
  NativeTypes.FILE,
  {
    drop(props, monitor) {
      const { onUpdatePost, post } = props
      const image = monitor.getItem().files[0]
      const nextPost = R.assoc('hero', image, post)
      onUpdatePost(nextPost)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
class Post extends PureComponent {
  static getDerivedStateFromProps(props, state) {
    const { post } = props
    return {
      excerpt: state.excerpt ?? post.excerpt ?? '',
      slug: state.slug ?? post.slug ?? '',
      title: state.title ?? post.title ?? '',
    }
  }

  authorInput = React.createRef()

  slugCopy = React.createRef()

  state = {
    excerpt: null,
    slug: null,
    title: null,
  }

  componentDidMount() {
    const node = findDOMNode(this.slugCopy.current)
    this.clippy = new Clipboard(node, {
      text: () => this.props.post.slug,
    })
  }

  componentWillUnmount() {
    this.clippy.destroy()
  }

  handleDeletePost() {
    const { onDeletePost, onPush, post } = this.props
    onDeletePost(post.uuid)
    onPush('/posts')
  }

  handleFieldChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSavePost() {
    const {
      post,
      onSavePostBody,
      onUpdatePost,
    } = this.props
    const {
      excerpt,
      slug,
      title,
    } = this.state

    const nextPost = R.pipe(
      R.assoc('excerpt', excerpt),
      R.assoc('slug', slug),
      R.assoc('title', title),
    )(post)

    onUpdatePost(nextPost)
    onSavePostBody(post.uuid)
  }

  handleVisibilityChange(transition) {
    const {
      postID: post,
      onTransitionPost,
    } = this.props

    onTransitionPost({ post, transition })
  }

  render() {
    const {
      connectDropTarget,
      loading,
      post,
    } = this.props
    const {
      excerpt,
      slug,
      title,
    } = this.state

    const heroURL = post.heroSRC ? getUploadURL(post.heroSRC) : null

    return (
      <Root>
        <Row>
          <TextField
            fullWidth
            disabled={ !post.uuid }
            inputProps={{ name: 'title' }}
            label='Title'
            value={ title }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <CompleteAuthors postID={ post.uuid } />
        </Row>
        <Row>
          <CompleteTags postID={ post.uuid } />
        </Row>
        <Row>
          <Grid container alignContent='stretch' alignItems='center' spacing={ 8 }>
            <Grid item style={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                disabled={ !post.uuid }
                inputProps={{ name: 'slug' }}
                label='Slug'
                value={ slug }
                onChange={ this.handleFieldChange } />
            </Grid>
            <Grid item>
              <IconButton ref={ this.slugCopy }>
                <ContentCopy />
              </IconButton>
            </Grid>
          </Grid>
        </Row>
        <Row>
          <TextField
            fullWidth
            multiline
            disabled={ !post.uuid }
            inputProps={{ name: 'excerpt' }}
            label='Excerpt'
            value={ excerpt }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          { connectDropTarget(
            <div
              style={{
                backgroundImage: heroURL && `url(${ heroURL })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                height: '10rem',
                margin: '1rem auto',
                width: '100%',
              }} />,
          ) }
        </Row>
        <Row>
          <VisibilityPanel status={ post.visibility }>
            <PostVisibility
                value={ post.visibility }
                onChange={ this.handleVisibilityChange }
                onDelete={ this.handleDeletePost }
                onSave={ this.handleSavePost } />
          </VisibilityPanel>
        </Row>
      </Root>
    )
  }
}

export default Post
