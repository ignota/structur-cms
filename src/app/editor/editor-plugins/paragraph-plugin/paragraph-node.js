import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { P } from './styled-paragraph-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class ParagraphNode extends PureComponent {
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

    const align = node.data.get('align') || 'justify'
    const flush = node.data.get('flush')
    const indent = node.data.get('indent')

    return (
      <P
        { ...attributes }
        align={ align }
        flush={ flush }
        indent={ indent }
        isSelected={ isSelected }
        onClick={ this.handleClick }>
        { children }
      </P>
    )
  }
}

export default ParagraphNode
