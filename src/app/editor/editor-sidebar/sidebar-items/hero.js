import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'
import { DropTarget } from 'react-dnd'
import { getUploadURL } from 'app/lib'
import { NativeTypes } from 'react-dnd-html5-backend'
import { TextField } from '@material-ui/core'

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
class Hero extends PureComponent {
  state = {}

  componentDidUpdate() {
    const file = this.props.node.data.get('image')
    const imageSRC = this.props.node.data.get('imageSRC')

    if (file) {
      this.loadImageFile(file)
    } else if (imageSRC) {
      const src = getUploadURL(imageSRC)
      this.setState({ src })
    }
  }

  componentWillUnmount() {
    if (this.reader) {
      this.reader.abort()
    }
  }

  handleGradientChange(event) {
    const { node, onChange, value } = this.props

    const gradient = event.target.value
      .split(',')
      .map(s => s.trim())
    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('gradient', gradient),
      })
    onChange(change)
  }

  handleTitleChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('title', event.target.value),
      })
    onChange(change)
  }

  loadImageFile(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ src: reader.result }))
    reader.readAsDataURL(file)
    this.reader = reader
  }

  render() {
    const { connectDropTarget, node } = this.props
    const { src } = this.state

    const gradient = node.data.get('gradient')?.join(', ') ?? ''
    const title = node.data.get('title') ?? ''

    return (
      <Root>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'title' }}
            label='Title'
            value={ title }
            onChange={ this.handleTitleChange } />
        </Row>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'gradient' }}
            label='Gradient'
            value={ gradient }
            onChange={ this.handleGradientChange } />
        </Row>
        <Row>
          { connectDropTarget(
            <div
              style={{
                backgroundImage: src && `url(${ src })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                height: '10rem',
                margin: '1rem auto',
                width: '100%',
              }} />,
          ) }
        </Row>
      </Root>
    )
  }
}

export default Hero
