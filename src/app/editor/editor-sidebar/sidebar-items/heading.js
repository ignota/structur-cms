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

class Heading extends PureComponent {
  handlePrimaryChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('primary', event.target.checked),
      })
      .focus()
    onChange(change)
  }

  handleSizeChange(event) {
    const { node, onChange, value } = this.props
    const size = Number.parseInt(event.target.value, 10)

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('size', Number.isNaN(size) ? null : size),
      })
      .focus()
    onChange(change)
  }

  render() {
    const { node } = this.props

    const size = (node.data.get('size') ?? '').toString()
    const primary = node.data.get('primary')

    return (
      <Root>
        <Row>
          <FormControl>
            <InputLabel htmlFor='size'>Size</InputLabel>
            <Select
              inputProps={{ id: 'size', name: 'size' }}
              value={ size }
              onChange={ this.handleSizeChange }>
              <MenuItem value=''>Default</MenuItem>
              <MenuItem value='1'>H1</MenuItem>
              <MenuItem value='2'>H2</MenuItem>
              <MenuItem value='3'>H3</MenuItem>
              <MenuItem value='4'>H4</MenuItem>
              <MenuItem value='5'>H5</MenuItem>
              <MenuItem value='6'>H6</MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Row>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Typeface</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={ primary }
                    value='primary'
                    onChange={ this.handlePrimaryChange } />
                }
                label='Primary' />
            </FormGroup>
          </FormControl>
        </Row>
      </Root>
    )
  }
}

export default Heading
