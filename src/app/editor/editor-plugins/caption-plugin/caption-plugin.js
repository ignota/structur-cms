import * as CaptionChanges from './caption-changes'
import CaptionNode from './caption-node'
import React from 'react'
import { RenderNode } from '../base'

class CaptionPlugin {
  static get changes() {
    return CaptionChanges
  }

  static get components() {
    return {
      CaptionNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Caption', props => <CaptionNode { ...props } />),
    ]
  }
}

export default CaptionPlugin
