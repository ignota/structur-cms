import * as VerseChanges from './verse-changes'
import React from 'react'
import { RenderNode } from '../base'
import VerseNode from './verse-node'

class VersePlugin {
  static get changes() {
    return VerseChanges
  }

  static get components() {
    return {
      VerseNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Verse', props => <VerseNode { ...props } />),
    ]
  }
}

export default VersePlugin
