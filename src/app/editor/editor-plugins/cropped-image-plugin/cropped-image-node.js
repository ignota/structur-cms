import {
  CroppedImage,
  Root,
  Spinner,
  SpinnerDot1,
  SpinnerDot2,
} from './styled-cropped-image-node'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { getUploadURL } from 'app/lib'
import { HiddenChildren } from '../base'
import { NativeTypes } from 'react-dnd-html5-backend'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
    value: state.editor.value,
  }),
  {
    onChange: actions.editor.change,
    onSetActiveNode: actions.editor.setActiveNode,
  },
)
@DropTarget(
  NativeTypes.FILE,
  {
    drop(props, monitor) {
      const { node, onChange, value } = props
      const image = monitor.getItem().files[0]

      const change = value.change()
        .setNodeByKey(node.key, {
          data: node.data.set('image', image),
        })
        .focus()

      onChange(change)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
class CroppedImageNode extends PureComponent {
  state = {}

  componentDidMount() {
    this.populateSRC()
  }

  componentDidUpdate() {
    this.populateSRC()
  }

  componentWillUnmount() {
    if (this.reader) {
      this.reader.abort()
    }
  }

  handleClick(event) {
    const { node, onSetActiveNode } = this.props

    event.stopPropagation()
    event.preventDefault()

    onSetActiveNode(node.key)
  }

  loadImageFile(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ src: reader.result }))
    reader.readAsDataURL(file)
    this.reader = reader
  }

  populateSRC() {
    const file = this.props.node.data.get('image')
    const src = this.props.node.data.get('src')

    if (file) {
      this.loadImageFile(file)
    } else if (src) {
      this.setState({ src: getUploadURL(src) })
    }
  }

  render() {
    const {
      activeNode,
      attributes,
      children,
      connectDropTarget,
      node,
    } = this.props
    const { src } = this.state

    const isSelected = activeNode === node.key

    return (
      <Root
        { ...attributes }
        isSelected={ isSelected }
        ref={ ref => connectDropTarget(ref) }
        onClick={ this.handleClick }>
        { src
          ? <CroppedImage src={ src } />
          : (
            <Spinner>
              <SpinnerDot1 />
              <SpinnerDot2 />
            </Spinner>
          )
        }
        <HiddenChildren>
          { children }
        </HiddenChildren>
      </Root>
    )
  }
}

export default CroppedImageNode
