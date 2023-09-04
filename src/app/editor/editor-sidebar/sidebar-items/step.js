import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'
import { TextField } from '@material-ui/core'

class Step extends PureComponent {
  handleFieldChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set(event.target.name, event.target.value !== '' ? Number(event.target.value) : null),
      })

    onChange(change)
  }

  render() {
    const { node } = this.props

    const rotate = node.data.get('rotate') ?? ''
    const rotateX = node.data.get('rotateX') ?? ''
    const rotateY = node.data.get('rotateY') ?? ''
    const rotateZ = node.data.get('rotateZ') ?? ''
    const scale = node.data.get('scale') ?? ''
    const x = node.data.get('x') ?? ''
    const y = node.data.get('y') ?? ''
    const z = node.data.get('z') ?? ''

    return (
      <Root>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'rotate' }}
            label='Rotation'
            value={ rotate }
            onChange={ this.handleFieldChange } />
          <TextField
            fullWidth
            inputProps={{ name: 'rotateX' }}
            label='X Rotation'
            value={ rotateX }
            onChange={ this.handleFieldChange } />
          <TextField
            fullWidth
            inputProps={{ name: 'rotateY' }}
            label='Y Rotation'
            value={ rotateY }
            onChange={ this.handleFieldChange } />
          <TextField
            fullWidth
            inputProps={{ name: 'rotateZ' }}
            label='Z Rotation'
            value={ rotateZ }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'x' }}
            label='X'
            value={ x }
            onChange={ this.handleFieldChange } />
          <TextField
            fullWidth
            inputProps={{ name: 'y' }}
            label='Y'
            value={ y }
            onChange={ this.handleFieldChange } />
          <TextField
            fullWidth
            inputProps={{ name: 'z' }}
            label='Z'
            value={ z }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'scale' }}
            label='Scale'
            value={ scale }
            onChange={ this.handleFieldChange } />
        </Row>
      </Root>
    )
  }
}

export default Step
