import * as EpigraphChanges from './epigraph-changes'
import EpigraphNode from './epigraph-node'
import React from 'react'
import { RenderNode } from '../base'

class EpigraphPlugin {
  static get changes() {
    return EpigraphChanges
  }

  static get components() {
    return {
      EpigraphNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Epigraph', props => <EpigraphNode { ...props } />),
    ]
  }
}

export default EpigraphPlugin
