import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  Typography,
} from '@material-ui/core'
import { getUploadURL, requiresAuth } from 'app/lib'
import {
  Pencil,
  Plus,
} from 'mdi-material-ui'
import {
  PostVisibility,
  VisibilityPanel,
} from 'app/components/post-visibility'
import React, { PureComponent } from 'react'
import _ from 'lodash/fp'
import { AbsoluteButton } from './styled-main'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import R from 'ramda'

@requiresAuth
@connect(
  state => ({
    authors: state.authors.byID,
    posts: state.posts.byID,
  }),
  {
    onCreatePost: actions.posts.createPost,
    onDeletePost: actions.posts.deletePost,
    onRequestPosts: actions.posts.requestPosts,
    onTransitionPost: actions.posts.transitionPost,
    onUpdatePost: actions.posts.updatePost,
  },
)
class Main extends PureComponent {
  UNSAFE_componentWillMount() {
    this.props.onRequestPosts()
  }

  handleCreatePost() {
    this.props.onCreatePost()
  }

  handleDeletePost(post) {
    return () => this.props.onDeletePost(post)
  }

  handleVisibilityChange(post) {
    return transition => this.props.onTransitionPost({ post, transition })
  }

  renderPostCard(post) {
    const authors = R.map(authorID => R.pathOr('Unnamed Author', [authorID, 'name'], this.props.authors), post.authors ?? [])
    const imageURL = post.heroSRC ? getUploadURL(JSON.stringify(post.heroSRC)) : null

    return (
      <Card key={ post.uuid } style={{ margin: '1rem auto', width: '50%' }}>
        <CardMedia
          image={ imageURL }
          style={{ paddingTop: '56.25%' }}
          title={ post.title } />
        <CardContent>
          <Typography component='h2' variant='h5'>
            { post.title }
          </Typography>
          <Typography component='h4' variant='subtitle1'>
            by { authors.join(', ') } | { moment(post.createdAt).fromNow() }
          </Typography>
          <Typography component='p' variant='body1'>
            { post.excerpt }
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <VisibilityPanel status={ post.visibility }>
            <PostVisibility
              value={ post.visibility }
              onChange={ this.handleVisibilityChange(post.uuid) }
              onDelete={ this.handleDeletePost(post.uuid) } />
          </VisibilityPanel>
          <Button component={ Link } size='small' to={ `/posts/${ post.uuid }` }>
            <Icon style={{ marginRight: '0.5rem' }}>
              <Pencil />
            </Icon>
            Edit
          </Button>
        </CardActions>
      </Card>
    )
  }

  render() {
    const {
      posts,
    } = this.props

    return (
      <>
        <Helmet>
          <title>Posts</title>
        </Helmet>
        <AbsoluteButton color='secondary' variant='fab' onClick={ this.handleCreatePost }>
          <Plus />
        </AbsoluteButton>
        { _.map(this.renderPostCard, posts) }
      </>
    )
  }
}

export default Main
