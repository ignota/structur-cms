import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Switch,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'

class PullQuote extends PureComponent {
  handleFloatChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('float', event.target.value),
      })
      .focus()
    onChange(change)
  }

  render() {
    const { node } = this.props

    const float = node.data.get('float') ?? ''

    return (
      <Root>
        <Row>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Float</FormLabel>
            <RadioGroup
              name='float'
              value={ float }
              onChange={ this.handleFloatChange }>
              <FormControlLabel control={ <Switch /> } label='Left' value='left' />
              <FormControlLabel control={ <Switch /> } label='Center' value='center' />
              <FormControlLabel control={ <Switch /> } label='Right' value='right' />
            </RadioGroup>
          </FormControl>
        </Row>
      </Root>
    )
  }
}

export default PullQuote
