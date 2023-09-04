import { Children, Label } from '../base'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { MessageVideoIcon } from 'mdi-react'
import { PullMedia } from './styled-pull-media-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class PullMediaNode extends PureComponent {
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
      <PullMedia
        { ...attributes }
        float={ float }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <MessageVideoIcon />
        </Label>
        <Children>
          { children }
        </Children>
      </PullMedia>
    )
  }
}

export default PullMediaNode
