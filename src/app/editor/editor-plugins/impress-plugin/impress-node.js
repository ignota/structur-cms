import { Children, Label } from '../base'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Impress } from './styled-impress-node'
import { WindowClosedIcon } from 'mdi-react'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class ImpressNode extends PureComponent {
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
      <Impress
        { ...attributes }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <WindowClosedIcon />
        </Label>
        <Children>
          { children }
        </Children>
      </Impress>
    )
  }
}

export default ImpressNode
