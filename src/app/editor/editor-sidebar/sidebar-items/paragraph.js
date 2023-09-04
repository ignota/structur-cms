import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'

class Paragraph extends PureComponent {
  handleAlignmentChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('align', event.target.value),
      })
      .focus()
    onChange(change)
  }

  handleFlushChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('flush', event.target.checked),
      })
      .focus()
    onChange(change)
  }

  handleIndentChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('indent', event.target.checked),
      })
      .focus()
    onChange(change)
  }

  render() {
    const {
      node,
    } = this.props

    const align = node.data.get('align') ?? ''
    const flush = node.data.get('flush') || false
    const indent = node.data.get('indent') || false

    return (
      <Root>
        <Row>
          <FormControl>
            <InputLabel htmlFor='align'>Alignment</InputLabel>
            <Select
              inputProps={{ id: 'align', name: 'align' }}
              value={ align }
              onChange={ this.handleAlignmentChange }>
              <MenuItem value=''>Default</MenuItem>
              <MenuItem value='center'>Center</MenuItem>
              <MenuItem value='justify'>Justify</MenuItem>
              <MenuItem value='left'>Left</MenuItem>
              <MenuItem value='right'>Right</MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Row>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Indentation</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={ flush }
                    value='flush'
                    onChange={ this.handleFlushChange } />
                }
                label='Flush' />
              <FormControlLabel
                control={
                  <Switch
                    checked={ indent }
                    value='indent'
                    onChange={ this.handleIndentChange } />
                }
                label='Indent' />
            </FormGroup>
          </FormControl>
        </Row>
      </Root>
    )
  }
}

export default Paragraph
