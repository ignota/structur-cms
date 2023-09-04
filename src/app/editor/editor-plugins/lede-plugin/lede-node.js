import {
  Lede,
  Root,
} from './styled-lede-node'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { Label } from '../base'
import { RocketIcon } from 'mdi-react'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class LedeNode extends PureComponent {
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
      <Root
        { ...attributes }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <RocketIcon />
        </Label>
        <Lede>
          { children }
        </Lede>
      </Root>
    )
  }
}

export default LedeNode
