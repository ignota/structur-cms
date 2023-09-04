import {
  Chip,
  Chips,
  CompletionContainer,
  CompletionPaper,
} from './styled-autocomplete'
import {
  MenuItem,
  TextField,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import Downshift from 'downshift'
import Fuse from 'fuse.js'
import keycode from 'keycode'
import R from 'ramda'

@connect(
  (state, props) => {
    const { postID } = props

    const post = R.propOr({}, postID, state.posts.byID)
    const tags = Object.values(R.propOr({}, 'byID', state.tags))
    const tagData = R.pipe(
      R.propOr([], 'tags'),
      R.map(tagID => R.propOr({}, tagID, state.tags.byID)),
    )(post)

    return {
      tagData,
      tags,
    }
  },
  {
    onAddTag: actions.posts.addTag,
    onCreateTag: actions.tags.createTag,
    onRemoveTag: actions.posts.removeTag,
    onRequestTags: actions.tags.requestTags,
  },
)
class CompleteTags extends PureComponent {
  static getDerivedStateFromProps(props) {
    return {
      tags: props.tagData ?? [],
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      tagInput: '',
      tags: props.tagData ?? [],
    }

    this.props.onRequestTags()
    this.refreshFuse(props.tags)
  }

  componentDidUpdate() {
    const { tags } = this.props
    this.refreshFuse(tags)
  }

  handleBackspace() {
    const {
      onRemoveTag,
      postID,
    } = this.props
    const { tags } = this.state

    if (tags.length) {
      onRemoveTag({ post: postID, tag: tags[tags.length - 1].uuid })
    }
  }

  handleCreateTag(name) {
    const {
      onCreateTag,
      postID,
    } = this.props

    this.setState({ tagInput: '' })
    onCreateTag({ post: postID, tag: { name } })
  }

  handleDeleteTag(tag) {
    return () => {
      const {
        onRemoveTag,
        postID,
      } = this.props

      onRemoveTag({ post: postID, tag: tag.uuid })
    }
  }

  handleTagChange(match) {
    const {
      onAddTag,
      postID,
    } = this.props

    onAddTag({ post: postID, tag: match.item.uuid })
  }

  handleTagInputChange(value) {
    if (value != null) {
      this.setState({ tagInput: value })
    }
  }

  refreshFuse(tags) {
    this.fuse = new Fuse(tags, {
      distance: 100,
      includeMatches: true,
      keys: ['name'],
      maxPatternLength: 32,
      shouldSort: true,
      threshold: 0.4,
    })
  }

  renderFallback({ itemProps, inputValue }) {
    return (
      <MenuItem
        { ...itemProps }
        selected
        component='div'
        key='fallback'
        style={{ fontWeight: 500 }}>
        Create&nbsp;<strong>{ inputValue }</strong>
      </MenuItem>
    )
  }

  renderMatch({ highlightedIndex, index, itemProps, match, selectedItem }) {
    const isHighlighted = highlightedIndex === index
    const isSelected = R.propOr('', 'uuid', selectedItem) === match.item.uuid

    return (
      <MenuItem
        { ...itemProps }
        component='div'
        key={ match.item.uuid }
        selected={ isHighlighted }
        style={{ fontWeight: isSelected ? 500 : 400 }}>
        { this.renderMatchLabel(match) }
      </MenuItem>
    )
  }

  renderMatchLabel(match) {
    const { indices, value } = match.matches[0]
    const splitValue = value.split('')
    const strong = indices.reduce((acc, [start, end], idx) => {
      const lastIndex = idx > 0 ? indices[idx - 1] : [0, 0]
      const prefix = splitValue.slice(lastIndex[1] === 0 ? 0 : lastIndex[1] + 1, start).join('')
      const strong = splitValue.slice(start, end + 1).join('')
      const suffix = idx === indices.length - 1 ? splitValue.slice(end + 1).join('') : ''

      return acc.concat(
        prefix,
        `<strong>${ strong }</strong>`,
        suffix,
      )
    }, []).join('')

    return (
      <span dangerouslySetInnerHTML={{ __html: strong }} />
    )
  }

  render() {
    const {
      tagInput,
      tags,
    } = this.state

    return (
      <Downshift
        inputValue={ tagInput }
        itemToString={ item => item?.name ?? '' }
        onChange={ this.handleTagChange }
        onInputValueChange={ this.handleTagInputChange }>
        { ({
          getInputProps,
          getItemProps,
          getMenuProps,
          getRootProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => {
          const selected = tags.map(t => t.uuid)
          const results = this.fuse.search(inputValue)
            .filter(match => !selected.includes(match.item.uuid))

          const { refProp, ...rootProps } = getRootProps({ refKey: 'refProp' })

          return (
            <CompletionContainer ref={ refProp } { ...rootProps }>
              <TextField
                fullWidth
                InputProps={ getInputProps({
                  onKeyDown: event => {
                    if ((keycode(event) === 'enter' || keycode(event) === ',') && !results.length) {
                      event.nativeEvent.preventDownshiftDefault = true
                      event.preventDefault()
                      this.handleCreateTag(inputValue)
                    } else if (keycode(event) === 'backspace' && !inputValue) {
                      event.nativeEvent.preventDownshiftDefault = true
                      event.preventDefault()
                      this.handleBackspace()
                    }
                  },
                  startAdornment: (
                    <Chips>
                      { tags.map(t => (
                        <Chip
                          key={ t.uuid }
                          label={ t.name }
                          tabIndex={ -1 }
                          onDelete={ this.handleDeleteTag(t) } />
                      )) }
                    </Chips>
                  ),
                }) }
                label='Tags' />
              <CompletionPaper square { ...getMenuProps() }>
                { do {
                  if (!isOpen) {
                    []
                  } else if (results.length) {
                    results.map((match, index) =>
                      this.renderMatch({
                        highlightedIndex,
                        index,
                        itemProps: getItemProps({ item: match }),
                        match,
                        selectedItem,
                      }),
                    )
                  } else if (inputValue) {
                    this.renderFallback({
                      inputValue,
                      itemProps: getItemProps({ item: null }),
                    })
                  }
                } }
              </CompletionPaper>
            </CompletionContainer>
          )
        } }
      </Downshift>
    )
  }
}

export default CompleteTags
