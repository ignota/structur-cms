import * as ParagraphChanges from './paragraph-changes'
import ParagraphNode from './paragraph-node'
import React from 'react'
import { RenderNode } from '../base'

class ParagraphPlugin {
  static get changes() {
    return ParagraphChanges
  }

  static get components() {
    return {
      ParagraphNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Paragraph', props => <ParagraphNode { ...props } />),
    ]
  }
}

export default ParagraphPlugin
