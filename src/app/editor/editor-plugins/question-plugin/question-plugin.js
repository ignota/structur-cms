import * as QuestionChanges from './question-changes'
import QuestionNode from './question-node'
import React from 'react'
import { RenderNode } from '../base'

class QuestionPlugin {
  static get changes() {
    return QuestionChanges
  }

  static get components() {
    return {
      QuestionNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Question', props => <QuestionNode { ...props } />),
    ]
  }
}

export default QuestionPlugin
