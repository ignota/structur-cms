import {
  Children,
  Label,
} from '../base'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { ChevronRightIcon } from 'mdi-react'
import { connect } from 'react-redux'
import { ListItem } from './styled-list-item-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class ListItemNode extends PureComponent {
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
      <ListItem
        { ...attributes }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <ChevronRightIcon />
        </Label>
        <Children>
          { children }
        </Children>
      </ListItem>
    )
  }
}

export default ListItemNode
