import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core'
import { Drop, Profiles } from './styled-author'
import { getUploadURL, requiresAuth } from 'app/lib'
import React, { PureComponent } from 'react'
import _ from 'lodash/fp'
import { actions } from 'app/flux'
import AuthorProfile from './author-profile'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { Helmet } from 'react-helmet'
import { NativeTypes } from 'react-dnd-html5-backend'
import { Plus } from 'mdi-material-ui'
import R from 'ramda'

@requiresAuth
@connect(
  (state, props) => {
    const {
      match: {
        params: { uuid },
      },
    } = props

    const author = R.propOr({}, uuid, state.authors.byID)

    return {
      author,
    }
  },
  dispatch => {
    const actionCreators = bindActionCreators({
      onAddAuthorProfile: actions.profiles.addAuthorProfile,
      onRequestAuthor: actions.authors.requestAuthor,
    }, dispatch)
    const onUpdateAuthor = _.debounce(500, bindActionCreators(actions.authors.updateAuthor, dispatch))

    return {
      ...actionCreators,
      onUpdateAuthor,
    }
  },
)
@DropTarget(
  NativeTypes.FILE,
  {
    drop(props, monitor) {
      const { onUpdateAuthor, author } = props
      const image = monitor.getItem().files[0]
      const nextAuthor = R.assoc('picture', image, author)
      onUpdateAuthor(nextAuthor)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
class Author extends PureComponent {
  state = {
    bio: this.props.author.bio ?? '',
    expanded: null,
    name: this.props.author.name ?? '',
  }

  UNSAFE_componentWillMount() {
    const {
      match: {
        params: { uuid },
      },
      onRequestAuthor,
    } = this.props

    onRequestAuthor(uuid)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { bio, name } = this.state
    const { author } = nextProps

    if (author.name && name !== author.name) {
      this.setState({ name: author.name })
    }

    if (author.bio && bio !== author.bio) {
      this.setState({ bio: author.bio })
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const { author, onUpdateAuthor } = this.props
    const { bio: prevBio, name: prevName } = prevState
    const { bio: nextBio, name: nextName } = this.state

    if (
      prevName !== nextName ||
      prevBio !== nextBio
    ) {
      const nextAuthor = R.pipe(
        R.assoc('name', nextName),
        R.assoc('bio', nextBio),
      )(author)
      onUpdateAuthor(nextAuthor)
    }
  }

  handleAddProfile() {
    const { author, onAddAuthorProfile } = this.props
    onAddAuthorProfile(author.uuid)
  }

  handleFeaturedChange(event) {
    const { author, onUpdateAuthor } = this.props
    const nextAuthor = R.assoc('featured', event.target.checked, author)
    onUpdateAuthor(nextAuthor)
  }

  handleFieldChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleProfileChange(uuid) {
    if (this.state.expanded === uuid) {
      this.setState({ expanded: null })
    } else {
      this.setState({ expanded: uuid })
    }
  }

  render() {
    const {
      author,
      connectDropTarget,
    } = this.props
    const {
      bio,
      expanded,
      name,
    } = this.state

    const pictureURL = author.pictureSRC ? getUploadURL(author.pictureSRC) : null
    const profiles = R.propOr([], 'profiles', author)

    return (
      <React.Fragment>
        <Helmet>
          <title>{ author.name || 'Unnamed Author' }</title>
        </Helmet>
        <TextField
          fullWidth
          disabled={ !author.uuid }
          label='Name'
          name='name'
          value={ name }
          onChange={ this.handleFieldChange } />
        <TextField
          fullWidth
          multiline
          disabled={ !author.uuid }
          inputProps={{ name: 'bio' }}
          label='Bio'
          value={ bio }
          onChange={ this.handleFieldChange } />
        <TextField
          disabled
          fullWidth
          label='Slug'
          value={ author.slug } />
        <FormControlLabel
          control={
            <Checkbox checked={ author.featured } onChange={ this.handleFeaturedChange } />
          }
          label='Featured' />
        <Drop
          ref={ ref => connectDropTarget(ref) }
          style={{ backgroundImage: pictureURL && `url(${ pictureURL })` }} />
        <Profiles>
          {
            profiles.map(uuid => (
              <AuthorProfile
                expanded={ expanded }
                key={ uuid }
                uuid={ uuid }
                onChange={ this.handleProfileChange } />
            ))
          }
          <Button
            size='small'
            style={{ bottom: 0, position: 'absolute', right: 0 }}
            variant='fab'
            onClick={ this.handleAddProfile }>
            <Plus />
          </Button>
        </Profiles>
      </React.Fragment>
    )
  }
}

export default Author
