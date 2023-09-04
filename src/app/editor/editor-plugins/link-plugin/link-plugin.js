import * as LinkChanges from './link-changes'
import LinkNode from './link-node'
import React from 'react'
import { RenderNode } from '../base'

class LinkPlugin {
  static get changes() {
    return LinkChanges
  }

  static get components() {
    return {
      LinkNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Link', props => <LinkNode { ...props } />),
    ]
  }
}

export default LinkPlugin
