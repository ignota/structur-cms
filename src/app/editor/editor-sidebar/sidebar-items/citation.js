import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Switch,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'

class Citation extends PureComponent {
  handleAlignmentChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('alignment', event.target.value),
      })
      .focus()
    onChange(change)
  }

  render() {
    const { node } = this.props

    const alignment = node.data.get('alignment') ?? ''

    return (
      <Root>
        <Row>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Alignment</FormLabel>
            <RadioGroup
              name='alignment'
              value={ alignment }
              onChange={ this.handleAlignmentChange }>
              <FormControlLabel control={ <Switch /> } label='Left' value='left' />
              <FormControlLabel control={ <Switch /> } label='Right' value='right' />
            </RadioGroup>
          </FormControl>
        </Row>
      </Root>
    )
  }
}

export default Citation
