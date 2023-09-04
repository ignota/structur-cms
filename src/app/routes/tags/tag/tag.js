import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { ContentSave } from 'mdi-material-ui'
import { Drop } from './styled-tag'
import { DropTarget } from 'react-dnd'
import { Helmet } from 'react-helmet'
import { NativeTypes } from 'react-dnd-html5-backend'
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

    const { byID, loading } = state.tags
    const tag = R.propOr({}, uuid, byID)

    return {
      loading,
      tag,
    }
  },
  {
    onRequestTag: actions.tags.requestTag,
    onUpdateTag: actions.tags.updateTag,
  },
)
@DropTarget(
  NativeTypes.FILE,
  {
    drop(props, monitor) {
      const { onUpdateTag, tag } = props
      const image = monitor.getItem().files[0]
      const nextTag = R.assoc('hero', image, tag)
      onUpdateTag(nextTag)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
class Tag extends PureComponent {
  static getDerivedStateFromProps(props, state) {
    const { tag } = props

    return {
      color: state.color ?? tag.color ?? '',
      description: state.description ?? tag.description ?? '',
      featured: state.featured ?? tag.featured ?? '',
      gradient: state.gradient ?? tag.gradient ?? [],
      name: state.name ?? tag.name ?? '',
    }
  }

  constructor(props) {
    super(props)

    const {
      match: {
        params: { uuid },
      },
      onRequestTag,
    } = props

    this.state = {
      color: null,
      description: null,
      featured: null,
      gradient: null,
      name: null,
    }

    onRequestTag(uuid)
  }

  get heroURL() {
    const { tag } = this.props

    if (!tag.heroSRC || !tag.heroSRC.hero) {
      return null
    }

    const { hero } = tag.heroSRC

    return `${ hero.metadata.host }/uploads/${ hero.id }`
  }

  handleColorChange(event) {
    this.setState({
      color: event.target.value || null,
      gradient: event.target.value === 'gradient'
        ? this.state.gradient
        : null,
    })
  }

  handleFeaturedChange(event) {
    this.setState({ featured: event.target.checked })
  }

  handleFieldChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleGradientChange(event) {
    const gradient = event.target.value
      .split(',')
      .map(s => s.trim())
    this.setState({ gradient })
  }

  handleSaveTag() {
    const {
      tag,
      onUpdateTag,
    } = this.props
    const {
      color,
      description,
      featured,
      gradient,
      name,
    } = this.state

    const nextTag = R.pipe(
      R.assoc('color', color),
      R.assoc('description', description),
      R.assoc('featured', featured),
      R.assoc('gradient', gradient),
      R.assoc('name', name),
    )(tag)

    onUpdateTag(nextTag)
  }

  render() {
    const {
      connectDropTarget,
      loading,
      tag,
    } = this.props
    const {
      color,
      description,
      gradient,
      name,
    } = this.state

    const gradientText = gradient?.join(', ') ?? ''

    return (
      <>
        <Helmet>
          <title>{ tag.name || 'Unnamed Tag' }</title>
        </Helmet>
        <TextField
          fullWidth
          disabled={ !tag.uuid }
          label='Name'
          name='name'
          value={ name }
          onChange={ this.handleFieldChange } />
        <TextField
          disabled
          fullWidth
          label='Slug'
          value={ tag.slug || '' } />
        <FormControl>
          <InputLabel htmlFor='color'>Color</InputLabel>
          <Select
            inputProps={{ id: 'color', name: 'color' }}
            value={ color }
            onChange={ this.handleColorChange }>
            <MenuItem value=''>Default</MenuItem>
            <MenuItem value='gradient'>Gradient</MenuItem>
            <MenuItem value='black'>Black</MenuItem>
            <MenuItem value='blue'>Blue</MenuItem>
            <MenuItem value='cyan'>Cyan</MenuItem>
            <MenuItem value='grape'>Grape</MenuItem>
            <MenuItem value='gray'>Gray</MenuItem>
            <MenuItem value='green'>Green</MenuItem>
            <MenuItem value='indigo'>Indigo</MenuItem>
            <MenuItem value='lime'>Lime</MenuItem>
            <MenuItem value='orange'>Orange</MenuItem>
            <MenuItem value='pink'>Pink</MenuItem>
            <MenuItem value='primary'>Primary</MenuItem>
            <MenuItem value='primaryDark'>Primary Dark</MenuItem>
            <MenuItem value='red'>Red</MenuItem>
            <MenuItem value='teal'>Teal</MenuItem>
            <MenuItem value='violet'>Violet</MenuItem>
            <MenuItem value='yellow'>Yellow</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          disabled={ !tag.uuid || color !== 'gradient' }
          label='Gradient'
          name='gradient'
          value={ gradientText }
          onChange={ this.handleGradientChange } />
        <TextField
          fullWidth
          multiline
          disabled={ !tag.uuid }
          inputProps={{ name: 'description' }}
          label='Description'
          value={ description }
          onChange={ this.handleFieldChange } />
        <FormControlLabel
          control={
            <Checkbox checked={ tag.featured } onChange={ this.handleFeaturedChange } />
          }
          label='Featured' />
        <Drop
          ref={ ref => connectDropTarget(ref) }
          style={{ backgroundImage: this.heroURL && `url(${ this.heroURL })` }} />
        <Button color='primary' disabled={ loading } onClick={ this.handleSaveTag }>
          <Icon style={{ marginRight: '0.5rem' }}>
            <ContentSave />
          </Icon>
          Save
        </Button>
      </>
    )
  }
}

export default Tag
