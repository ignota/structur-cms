import * as LedeChanges from './lede-changes'
import LedeNode from './lede-node'
import React from 'react'
import { RenderNode } from '../base'

class LedePlugin {
  static get changes() {
    return LedeChanges
  }

  static get components() {
    return {
      LedeNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Lede', props => <LedeNode { ...props } />),
    ]
  }
}

export default LedePlugin
