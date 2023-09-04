import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Switch,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'

class Video extends PureComponent {
  handleTypeChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, event.target.value)
      .focus()
    onChange(change)
  }

  render() {
    const { node } = this.props

    const type = node.type

    return (
      <Root>
        <Row>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Type</FormLabel>
            <RadioGroup
              name='type'
              value={ type }
              onChange={ this.handleTypeChange }>
              <FormControlLabel control={ <Switch /> } label='Player' value='VideoPlayer' />
              <FormControlLabel control={ <Switch /> } label='Inline' value='Video' />
            </RadioGroup>
          </FormControl>
        </Row>
      </Root>
    )
  }
}

export default Video
