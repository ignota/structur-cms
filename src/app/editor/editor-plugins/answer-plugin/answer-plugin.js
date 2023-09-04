import * as AnswerChanges from './answer-changes'
import AnswerNode from './answer-node'
import React from 'react'
import { RenderNode } from '../base'

class AnswerPlugin {
  static get changes() {
    return AnswerChanges
  }

  static get components() {
    return {
      AnswerNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Answer', props => <AnswerNode { ...props } />),
    ]
  }
}

export default AnswerPlugin
