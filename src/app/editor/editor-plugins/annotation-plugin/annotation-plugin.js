import * as AnnotationChanges from './annotation-changes'
import AnnotationNode from './annotation-node'
import React from 'react'
import { RenderNode } from '../base'

class AnnotationPlugin {
  static get changes() {
    return AnnotationChanges
  }

  static get components() {
    return {
      AnnotationNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Annotation', props => <AnnotationNode { ...props } />),
    ]
  }
}

export default AnnotationPlugin
