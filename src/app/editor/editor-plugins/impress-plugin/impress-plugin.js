import * as ImpressChanges from './impress-changes'
import ImpressNode from './impress-node'
import React from 'react'
import { RenderNode } from '../base'

class ImpressPlugin {
  static get changes() {
    return ImpressChanges
  }

  static get components() {
    return [
      ImpressNode,
    ]
  }

  static get plugins() {
    return [
      RenderNode('Impress', props => <ImpressNode { ...props } />),
    ]
  }
}

export default ImpressPlugin
