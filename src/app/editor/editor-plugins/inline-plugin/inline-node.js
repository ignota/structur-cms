import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Root } from './styled-inline-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class InlineNode extends PureComponent {
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
    const style = node.data.get('style')

    return (
      <Root
        { ...attributes }
        inline={ style }
        isSelected={ isSelected }
        onClick={ this.handleClick }>
        { children }
      </Root>
    )
  }
}

export default InlineNode
