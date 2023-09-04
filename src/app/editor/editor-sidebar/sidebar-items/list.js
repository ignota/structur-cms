import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  Switch,
  TextField,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'

class List extends PureComponent {
  handleColorChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('color', event.target.value || null),
      })
      .focus()
    onChange(change)
  }

  handleStartChange(event) {
    const { node, onChange, value } = this.props
    const start = Number.parseInt(event.target.value, 10)

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('start', Number.isNaN(start) ? null : start),
      })
    onChange(change)
  }

  handleStyleChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: event.target.value === 'bullet'
          ? node.data.set('style', 'bullet').set('start', null)
          : node.data.set('style', 'number'),
      })
      .focus()
    onChange(change)
  }

  render() {
    const { node } = this.props

    const color = node.data.get('color') ?? ''
    const start = (node.data.get('start') ?? '').toString()
    const style = node.data.get('style') ?? ''

    return (
      <Root>
        <Row>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Style</FormLabel>
            <RadioGroup
              name='style'
              value={ style }
              onChange={ this.handleStyleChange }>
              <FormControlLabel control={ <Switch /> } label='Bullet' value='bullet' />
              <FormControlLabel control={ <Switch /> } label='Number' value='number' />
            </RadioGroup>
          </FormControl>
        </Row>
        <Row>
          <TextField
            fullWidth
            disabled={ style !== 'number' }
            label='Start'
            value={ start }
            onChange={ this.handleStartChange } />
        </Row>
        <Row>
          <FormControl>
            <InputLabel htmlFor='color'>Color</InputLabel>
            <Select
              inputProps={{ id: 'color', name: 'color' }}
              value={ color }
              onChange={ this.handleColorChange }>
              <MenuItem value=''>Default</MenuItem>
              <MenuItem value='black'>Black</MenuItem>
              <MenuItem value='blue'>Blue</MenuItem>
              <MenuItem value='cyan'>Cyan</MenuItem>
              <MenuItem value='grape'>Grape</MenuItem>
              <MenuItem value='gray'>Gray</MenuItem>
              <MenuItem value='green'>Green</MenuItem>
              <MenuItem value='indigo'>Indigo</MenuItem>
              <MenuItem value='lime'>Lime</MenuItem>
              <MenuItem value='orange'>Orange</MenuItem>
              <MenuItem value='pink'>Pink</MenuItem>
              <MenuItem value='primary'>Primary</MenuItem>
              <MenuItem value='primaryDark'>Primary Dark</MenuItem>
              <MenuItem value='red'>Red</MenuItem>
              <MenuItem value='teal'>Teal</MenuItem>
              <MenuItem value='violet'>Violet</MenuItem>
              <MenuItem value='yellow'>Yellow</MenuItem>
            </Select>
          </FormControl>
        </Row>
      </Root>
    )
  }
}

export default List
