import * as HighlightChanges from './highlight-changes'
import HighlightNode from './highlight-node'
import React from 'react'
import { RenderNode } from '../base'

class HighlightPlugin {
  static get changes() {
    return HighlightChanges
  }

  static get components() {
    return {
      HighlightNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Highlight', props => <HighlightNode { ...props } />),
    ]
  }
}

export default HighlightPlugin
