import * as DropcapChanges from './dropcap-changes'
import DropcapNode from './dropcap-node'
import React from 'react'
import { RenderNode } from '../base'

class DropcapPlugin {
  static get changes() {
    return DropcapChanges
  }

  static get components() {
    return {
      DropcapNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Dropcap', props => <DropcapNode { ...props } />),
    ]
  }
}

export default DropcapPlugin
