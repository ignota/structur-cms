import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'

class Inline extends PureComponent {
  handleStyleChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('style', event.target.value || null),
      })
      .focus()
    onChange(change)
  }

  render() {
    const { node } = this.props

    const style = node.data.get('style') ?? ''

    return (
      <Root>
        <Row>
          <FormControl>
            <InputLabel htmlFor='style'>Style</InputLabel>
            <Select
              inputProps={{ id: 'style', name: 'style' }}
              value={ style }
              onChange={ this.handleStyleChange }>
              <MenuItem value=''>Default</MenuItem>
              <MenuItem value='bold'>Bold</MenuItem>
              <MenuItem value='italic'>Italic</MenuItem>
              <MenuItem value='small'>Small Caps</MenuItem>
              <MenuItem value='underline'>Underline</MenuItem>
            </Select>
          </FormControl>
        </Row>
      </Root>
    )
  }
}

export default Inline
