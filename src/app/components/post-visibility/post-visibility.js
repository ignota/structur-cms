import {
  ContentSave,
  DeleteForever,
  FileFind,
  FileRemove,
  FileUpload,
} from 'mdi-material-ui'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import React, { PureComponent } from 'react'
import R from 'ramda'
import { Root } from './styled-post-visibility'

const VALID_TRANSITIONS = {
  PREVIEW: ['drafting', 'pending'],
  PUBLISH: ['drafting', 'pending', 'previewing'],
  UNPUBLISH: ['previewing', 'published'],
}

const BUTTON_SPECS = {
  PREVIEW: {
    disabled: currentState => !VALID_TRANSITIONS.PREVIEW.includes(currentState),
    icon: <FileFind />,
    primaryText: 'Preview',
  },
  PUBLISH: {
    disabled: currentState => !VALID_TRANSITIONS.PUBLISH.includes(currentState),
    icon: <FileUpload />,
    primaryText: 'Publish',
  },
  UNPUBLISH: {
    disabled: currentState => !VALID_TRANSITIONS.UNPUBLISH.includes(currentState),
    icon: <FileRemove />,
    primaryText: 'Unpublish',
  },
}

class PostVisibility extends PureComponent {
  static defaultProps = {
    onChange: R.identity,
    onDelete: R.identity,
    onSave: R.identity,
    value: 'drafting',
  }

  handleTransition(eventName) {
    return () => this.props.onChange(eventName)
  }

  renderTransitionButton(eventName) {
    const spec = BUTTON_SPECS[eventName]

    return (
      <ListItem
        button
        disabled={ spec.disabled(this.props.value) }
        key={ eventName }
        onClick={ this.handleTransition(eventName) }>
        <ListItemIcon>
          { spec.icon }
        </ListItemIcon>
        <ListItemText>
          { spec.primaryText }
        </ListItemText>
      </ListItem>
    )
  }

  render() {
    const {
      onChange: _onChange,
      onDelete,
      onSave,
      value: _value,
      ...props
    } = this.props

    return (
      <Root { ...props }>
        <List component='nav'>
          { Object.keys(VALID_TRANSITIONS).map(this.renderTransitionButton) }
        </List>
        <Divider />
        <List component='nav'>
          { !onSave || onSave === R.identity
            ? null
            : (
              <ListItem button onClick={ onSave }>
                <ListItemIcon>
                  <ContentSave />
                </ListItemIcon>
                <ListItemText>
                  Save
                </ListItemText>
              </ListItem>
            )
          }
          <ListItem button onClick={ onDelete }>
            <ListItemIcon>
              <DeleteForever />
            </ListItemIcon>
            <ListItemText>
              Delete
            </ListItemText>
          </ListItem>
        </List>
      </Root>
    )
  }
}

export default PostVisibility
