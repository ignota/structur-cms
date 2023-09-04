import { Children, Label } from '../base'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { ScriptIcon } from 'mdi-react'
import { Verse } from './styled-verse-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class VerseNode extends PureComponent {
  handleClick(event) {
    const { node, onSetActiveNode } = this.props

    event.stopPropagation()
    event.preventDefault()

    onSetActiveNode(node.key)
  }

  render() {
    const {
      activeNode,
      attributes,
      children,
      node,
    } = this.props

    const isSelected = activeNode === node.key

    return (
      <Verse
        { ...attributes }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <ScriptIcon />
        </Label>
        <Children>
          { children }
        </Children>
      </Verse>
    )
  }
}

export default VerseNode
