import {
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'

class Dropcap extends PureComponent {
  handleAccentChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('accent', event.target.value),
      })
      .focus()

    onChange(change)
  }

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

    const accent = node.data.get('accent') ?? true
    const baseline = node.data.get('baseline') ?? ''
    const height = node.data.get('height') ?? 3

    return (
      <Root>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'baseline' }}
            label='Baseline'
            value={ baseline }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'height' }}
            label='Height'
            value={ height }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <FormControlLabel
            control={
              <Switch
                checked={ accent }
                value='accent'
                onChange={ this.handleAccentChange } />
            }
            label='Accent' />
        </Row>
      </Root>
    )
  }
}

export default Dropcap
