import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'
import { TextField } from '@material-ui/core'

class Impress extends PureComponent {
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

    const duration = node.data.get('duration') ?? ''
    const height = node.data.get('height') ?? ''
    const maxScale = node.data.get('maxScale') ?? ''
    const minScale = node.data.get('minScale') ?? ''
    const perspective = node.data.get('perspective') ?? ''
    const width = node.data.get('width') ?? ''

    return (
      <Root>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'duration' }}
            label='Duration'
            value={ duration }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'width' }}
            label='Width'
            value={ width }
            onChange={ this.handleFieldChange } />
          <TextField
            fullWidth
            inputProps={{ name: 'height' }}
            label='Height'
            value={ height }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'maxScale' }}
            label='Max Scale'
            value={ maxScale }
            onChange={ this.handleFieldChange } />
          <TextField
            fullWidth
            inputProps={{ name: 'minScale' }}
            label='Min Scale'
            value={ minScale }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'perspective' }}
            label='Perspective'
            value={ perspective }
            onChange={ this.handleFieldChange } />
        </Row>
      </Root>
    )
  }
}

export default Impress
