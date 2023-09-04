import * as HeadingChanges from './heading-changes'
import HeadingNode from './heading-node'
import React from 'react'
import { RenderNode } from '../base'

class HeadingPlugin {
  static get changes() {
    return HeadingChanges
  }

  static get components() {
    return {
      HeadingNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Heading', props => <HeadingNode { ...props } />),
    ]
  }
}

export default HeadingPlugin
