import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { Caption } from './styled-caption-node'
import { connect } from 'react-redux'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class CaptionNode extends PureComponent {
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
      <Caption
        { ...attributes }
        isSelected={ isSelected }
        onClick={ this.handleClick }>
        { children }
      </Caption>
    )
  }
}

export default CaptionNode
