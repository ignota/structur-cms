import * as DividerChanges from './divider-changes'
import DividerNode from './divider-node'
import React from 'react'
import { RenderNode } from '../base'

class DividerPlugin {
  static get changes() {
    return DividerChanges
  }

  static get components() {
    return {
      DividerNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Divider', props => <DividerNode { ...props } />),
    ]
  }
}

export default DividerPlugin
