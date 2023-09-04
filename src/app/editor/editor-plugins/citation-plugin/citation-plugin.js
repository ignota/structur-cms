import * as CitationChanges from './citation-changes'
import CitationNode from './citation-node'
import React from 'react'
import { RenderNode } from '../base'

class CitationPlugin {
  static get changes() {
    return CitationChanges
  }

  static get components() {
    return {
      CitationNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Citation', props => <CitationNode { ...props } />),
    ]
  }
}

export default CitationPlugin
