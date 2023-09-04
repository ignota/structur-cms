import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Root, Row } from './styled-sidebar-item'
import { actions } from 'app/flux'
import { connect } from 'react-redux'

@connect(
  null,
  { onEditSubtree: actions.editor.editSubtree },
)
class Annotation extends PureComponent {
  handleEditChildren() {
    const { node, onEditSubtree, value } = this.props
    onEditSubtree({ key: 'children', node, value })
  }

  handleEditEmbed() {
    const { node, onEditSubtree, value } = this.props
    onEditSubtree({ key: 'embed', node, value })
  }

  handleSelectChange(event) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set(event.target.name, event.target.value || null),
      })
      .focus()
    onChange(change)
  }

  render() {
    const { node } = this.props

    const alignment = node.data.get('alignment') ?? ''
    const color = node.data.get('color') ?? ''

    return (
      <Root>
        <Row>
          <FormControl>
            <InputLabel htmlFor='color'>Color</InputLabel>
            <Select
              inputProps={{ id: 'color', name: 'color' }}
              value={ color }
              onChange={ this.handleSelectChange }>
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
        <Row>
          <FormControl>
            <InputLabel htmlFor='alignment'>Alignment</InputLabel>
            <Select
              inputProps={{ id: 'alignment', name: 'alignment' }}
              value={ alignment }
              onChange={ this.handleSelectChange }>
              <MenuItem value=''>Default</MenuItem>
              <MenuItem value='bottom'>Bottom</MenuItem>
              <MenuItem value='left'>Left</MenuItem>
              <MenuItem value='right'>Right</MenuItem>
              <MenuItem value='top'>Top</MenuItem>
            </Select>
          </FormControl>
        </Row>
        <Row>
          <Button onClick={ this.handleEditChildren }>
            Edit Children
          </Button>
        </Row>
        <Row>
          <Button onClick={ this.handleEditEmbed }>
            Edit Embed
          </Button>
        </Row>
      </Root>
    )
  }
}

export default Annotation
