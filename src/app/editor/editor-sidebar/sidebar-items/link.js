import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'

class Link extends PureComponent {
  handleFieldChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set(event.target.name, event.target.value || null),
      })
    onChange(change)
  }

  handleSwitchChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set(event.target.value, event.target.checked),
      })
      .focus()
    onChange(change)
  }

  render() {
    const { node } = this.props

    const background = node.data.get('background') ?? ''
    const color = node.data.get('color') ?? ''
    const plain = node.data.get('plain')
    const popup = node.data.get('popup')
    const to = node.data.get('to') ?? ''

    return (
      <Root>
        <Row>
          <TextField
            fullWidth
            inputProps={{ name: 'to' }}
            label='To'
            value={ to }
            onChange={ this.handleFieldChange } />
        </Row>
        <Row>
          <FormControl>
            <InputLabel htmlFor='background'>Background</InputLabel>
            <Select
              inputProps={{ id: 'background', name: 'background' }}
              value={ background }
              onChange={ this.handleFieldChange }>
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
              <MenuItem value='white'>White</MenuItem>
              <MenuItem value='yellow'>Yellow</MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Row>
          <FormControl>
            <InputLabel htmlFor='color'>Color</InputLabel>
            <Select
              inputProps={{ id: 'color', name: 'color' }}
              value={ color }
              onChange={ this.handleFieldChange }>
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
              <MenuItem value='white'>White</MenuItem>
              <MenuItem value='yellow'>Yellow</MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Row>
          <FormControl component='fieldset'>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={ plain }
                    value='plain'
                    onChange={ this.handleSwitchChange } />
                }
                label='Plain' />
              <FormControlLabel
                control={
                  <Switch
                    checked={ popup }
                    value='popup'
                    onChange={ this.handleSwitchChange } />
                }
                label='Popup' />
            </FormGroup>
          </FormControl>
        </Row>
      </Root>
    )
  }
}

export default Link
