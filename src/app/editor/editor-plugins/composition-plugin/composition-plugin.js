import * as CompositionChanges from './composition-changes'
import CompositionNode from './composition-node'
import React from 'react'
import { RenderNode } from '../base'

class CompositionPlugin {
  static get changes() {
    return CompositionChanges
  }

  static get components() {
    return {
      CompositionNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Composition', props => <CompositionNode { ...props } />),
    ]
  }
}

export default CompositionPlugin
