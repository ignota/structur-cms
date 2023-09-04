import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Link } from './styled-link-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class LinkNode extends PureComponent {
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

    const color = node.data.get('color')
    const isSelected = activeNode === node.key

    return (
      <Link
        { ...attributes }
        color={ color }
        isSelected={ isSelected }
        onClick={ this.handleClick }>
        { children }
      </Link>
    )
  }
}

export default LinkNode
