import { Children, Label } from '../base'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { MessageTextIcon } from 'mdi-react'
import { PullQuote } from './styled-pull-quote-node'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class PullQuoteNode extends PureComponent {
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
      <PullQuote
        { ...attributes }
        float={ float }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <MessageTextIcon />
        </Label>
        <Children>
          { children }
        </Children>
      </PullQuote>
    )
  }
}

export default PullQuoteNode
