import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Root } from './styled-annotation-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class AnnotationNode extends PureComponent {
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
    const color = node.data.get('color')

    return (
      <Root
        { ...attributes }
        bg={ color }
        isSelected={ isSelected }
        onClick={ this.handleClick }>
        { children }
      </Root>
    )
  }
}

export default AnnotationNode
