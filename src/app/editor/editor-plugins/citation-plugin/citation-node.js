import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { Citation } from './styled-citation-node'
import { connect } from 'react-redux'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class CitationNode extends PureComponent {
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
    const alignment = node.data.get('alignment')

    return (
      <Citation
        { ...attributes }
        alignment={ alignment }
        isSelected={ isSelected }
        onClick={ this.handleClick }>
        { children }
      </Citation>
    )
  }
}

export default CitationNode
