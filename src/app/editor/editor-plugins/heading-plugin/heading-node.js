import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { H } from './styled-heading-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class HeadingNode extends PureComponent {
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
    const size = node.data.get('size') || 1

    return (
      <H
        { ...attributes }
        as={ `h${ size }` }
        isSelected={ isSelected }
        onClick={ this.handleClick }>
        { children }
      </H>
    )
  }
}

export default HeadingNode
