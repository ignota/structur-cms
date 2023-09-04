import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import EditorContents from './editor-contents'
import { EditorSidebar } from '../editor-sidebar'
import { EditorToolbar } from '../editor-toolbar'
import keycode from 'keycode'
import R from 'ramda'
import { Root } from './styled-editor'
import schema from './schema'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
    loading: state.editor.loading,
    value: state.editor.value,
  }),
  {
    onChange: actions.editor.change,
    onSetActiveNode: actions.editor.setActiveNode,
  },
)
class Editor extends PureComponent {
  handleChange(change) {
    const {
      activeNode,
      onChange,
      onSetActiveNode,
    } = this.props
    const { value } = change
    const { document } = value

    onChange(change)

    if (value.inlines.size) {
      const inline = value.inlines.last()
      onSetActiveNode(inline.key)
    } else {
      const p = document.getDescendant(activeNode)
      const block = value.blocks.last()
      if (block && !p?.hasDescendant(block.key)) {
        onSetActiveNode(block.key)
      }
    }
  }

  handleKeyDown(event, change) {
    const { blocks } = change.value

    if (
      keycode(event) === 'enter' &&
      blocks.size === 1 &&
      blocks.first().text === ''
    ) {
      if (blocks.first().type === 'Paragraph') {
        change.unwrapBlock().focus()
      } else {
        change.setBlocks({ data: {}, type: 'Paragraph' }).focus()
      }

      return true
    }

    if (keycode(event) === 'esc') {
      change.blur()
      setTimeout(() => this.props.onSetActiveNode(null), 0)
      return true
    }
  }

  render() {
    const {
      loading,
      postID,
      value,
    } = this.props

    return (
      <Root>
        <EditorSidebar
          postID={ postID }
          value={ value }
          onChange={ this.handleChange } />
        <EditorToolbar
          value={ value }
          onChange={ this.handleChange } />
        <EditorContents
          readOnly={ loading }
          schema={ schema }
          value={ value }
          onChange={ this.handleChange }
          onDrop={ R.identity }
          onKeyDown={ this.handleKeyDown } />
      </Root>
    )
  }
}

export default Editor
