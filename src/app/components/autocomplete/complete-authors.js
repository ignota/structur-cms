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
    const authors = Object.values(R.propOr({}, 'byID', state.authors))
    const authorData = R.pipe(
      R.propOr([], 'authors'),
      R.map(authorID => R.propOr({}, authorID, state.authors.byID)),
    )(post)

    return {
      authorData,
      authors,
    }
  },
  {
    onCreateAuthorForPost: actions.posts.createAuthorForPost,
    onRemoveAuthor: actions.posts.removeAuthor,
    onRequestAuthors: actions.authors.requestAuthors,
    onSetPostAuthor: actions.posts.setPostAuthor,
  },
)
class CompleteAuthors extends PureComponent {
  static getDerivedStateFromProps(props) {
    return {
      authors: props.authorData ?? [],
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      authorInput: '',
      authors: props.authorData ?? [],
    }

    this.props.onRequestAuthors()
    this.refreshFuse(props.authors)
  }

  componentDidUpdate() {
    const { authors } = this.props
    this.refreshFuse(authors)
  }

  handleAuthorChange(match) {
    const {
      onSetPostAuthor,
      postID,
    } = this.props

    onSetPostAuthor({ author: match.item.uuid, post: postID })
  }

  handleAuthorInputChange(value) {
    if (value != null) {
      this.setState({ authorInput: value })
    }
  }

  handleBackspace() {
    const {
      onRemoveAuthor,
      postID,
    } = this.props
    const { authors } = this.state

    if (authors.length) {
      onRemoveAuthor({ author: authors[authors.length - 1].uuid, post: postID })
    }
  }

  handleCreateAuthor(name) {
    const {
      onCreateAuthorForPost,
      postID,
    } = this.props

    this.setState({ authorInput: '' })
    onCreateAuthorForPost({ author: { name }, post: postID })
  }

  handleDeleteAuthor(author) {
    return () => {
      const {
        onRemoveAuthor,
        postID,
      } = this.props

      onRemoveAuthor({ author: author.uuid, post: postID })
    }
  }

  refreshFuse(authors) {
    this.fuse = new Fuse(authors, {
      distance: 100,
      includeMatches: true,
      keys: ['name'],
      maxPatternLength: 32,
      shouldSort: true,
      threshold: 0.4,
    })
  }

  renderFallback({ inputValue }) {
    return (
      <MenuItem
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
      authorInput,
      authors,
    } = this.state

    return (
      <Downshift
        inputValue={ authorInput }
        itemToString={ item => item ? item.name : '' }
        onChange={ this.handleAuthorChange }
        onInputValueChange={ this.handleAuthorInputChange }>
        { ({
          getInputProps,
          getItemProps,
          getRootProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => {
          const selected = authors.map(a => a.uuid)
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
                      this.handleCreateAuthor(inputValue)
                    } else if (keycode(event) === 'backspace' && !inputValue) {
                      event.nativeEvent.preventDownshiftDefault = true
                      event.preventDefault()
                      this.handleBackspace()
                    }
                  },
                  startAdornment: (
                    <Chips>
                      { authors.map(a => (
                        <Chip
                          key={ a.uuid }
                          label={ a.name }
                          tabIndex={ -1 }
                          onDelete={ this.handleDeleteAuthor(a) } />
                      )) }
                    </Chips>
                  ),
                }) }
                inputRef={ this.authorInput }
                label='Author' />
              { isOpen &&
                <CompletionPaper square>
                  { do {
                    if (results.length) {
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
                      })
                    }
                  } }
                </CompletionPaper>
              }
            </CompletionContainer>
          )
        } }
      </Downshift>
    )
  }
}

export default CompleteAuthors
