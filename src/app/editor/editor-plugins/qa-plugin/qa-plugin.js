import * as QAChanges from './qa-changes'
import QANode from './qa-node'
import React from 'react'
import { RenderNode } from '../base'

class QAPlugin {
  static get changes() {
    return QAChanges
  }

  static get components() {
    return {
      QANode,
    }
  }

  static get plugins() {
    return [
      RenderNode('QA', props => <QANode { ...props } />),
    ]
  }
}

export default QAPlugin
