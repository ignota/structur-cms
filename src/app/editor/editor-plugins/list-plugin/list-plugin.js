import * as ListChanges from './list-changes'
import ListNode from './list-node'
import React from 'react'
import { RenderNode } from '../base'

class ListPlugin {
  static get changes() {
    return ListChanges
  }

  static get components() {
    return {
      ListNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('List', props => <ListNode { ...props } />),
    ]
  }
}

export default ListPlugin
