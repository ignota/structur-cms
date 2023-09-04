import * as InlineChanges from './inline-changes'
import InlineNode from './inline-node'
import React from 'react'
import { RenderNode } from '../base'

class InlinePlugin {
  static get changes() {
    return InlineChanges
  }

  static get components() {
    return {
      InlineNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Inline', props => <InlineNode { ...props } />),
    ]
  }
}

export default InlinePlugin
