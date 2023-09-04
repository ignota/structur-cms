import * as PullMediaChanges from './pull-media-changes'
import PullMediaNode from './pull-media-node'
import React from 'react'
import { RenderNode } from '../base'

class PullMediaPlugin {
  static get changes() {
    return PullMediaChanges
  }

  static get components() {
    return {
      PullMediaNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('PullMedia', props => <PullMediaNode { ...props } />),
    ]
  }
}

export default PullMediaPlugin
