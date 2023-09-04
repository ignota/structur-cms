import * as StepChanges from './step-changes'
import React from 'react'
import { RenderNode } from '../base'
import StepNode from './step-node'

class StepPlugin {
  static get changes() {
    return StepChanges
  }

  static get components() {
    return [
      StepNode,
    ]
  }

  static get plugins() {
    return [
      RenderNode('Step', props => <StepNode { ...props } />),
    ]
  }
}

export default StepPlugin
