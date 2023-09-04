import { Children, Label } from '../base'
import {
  List,
  ListBase,
} from './styled-list-node'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { FormatListNumbersIcon } from 'mdi-react'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class ListNode extends PureComponent {
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
    const as = node.data.get('style') === 'number'
      ? 'ol'
      : 'ul'

    return (
      <List
        { ...attributes }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <FormatListNumbersIcon />
        </Label>
        <Children>
          <ListBase as={ as }>
            { children }
          </ListBase>
        </Children>
      </List>
    )
  }
}

export default ListNode
