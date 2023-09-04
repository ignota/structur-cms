import { Children, Label } from '../base'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Epigraph } from './styled-epigraph-node'
import { MessageDrawIcon } from 'mdi-react'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class EpigraphNode extends PureComponent {
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
    const float = node.data.get('float')

    return (
      <Epigraph
        { ...attributes }
        float={ float }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <MessageDrawIcon />
        </Label>
        <Children>
          { children }
        </Children>
      </Epigraph>
    )
  }
}

export default EpigraphNode
