import React, { PureComponent } from 'react'
import { Root, Strut } from './styled-dropcap-node'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import Dropcap from 'vendor/dropcap'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class DropcapNode extends PureComponent {
  dropcap = React.createRef()

  componentDidMount() {
    this.renderDropcap()
  }

  handleClick(event) {
    const { node, onSetActiveNode } = this.props

    event.stopPropagation()
    event.preventDefault()

    onSetActiveNode(node.key)
  }

  renderDropcap() {
    const {
      node,
    } = this.props

    const height = node.data.get('height') ?? 3
    const baseline = node.data.get('baseline') ?? height - 1

    if (this.dropcap.current) {
      Dropcap.layout(this.dropcap.current, height, baseline)
    }
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
      <>
        <Strut />
        <Root
          { ...attributes }
          isSelected={ isSelected }
          ref={ this.dropcap }
          onClick={ this.handleClick }>
          { children }
        </Root>
      </>
    )
  }
}

export default DropcapNode
