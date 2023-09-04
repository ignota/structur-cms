import * as ListItemChanges from './list-item-changes'
import ListItemNode from './list-item-node'
import React from 'react'
import { RenderNode } from '../base'

class ListItemPlugin {
  static get changes() {
    return ListItemChanges
  }

  static get components() {
    return {
      ListItemNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('ListItem', props => <ListItemNode { ...props } />),
    ]
  }
}

export default ListItemPlugin
