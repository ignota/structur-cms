import * as ImageChanges from './image-changes'
import ImageNode from './image-node'
import React from 'react'
import { RenderNode } from '../base'

class ImagePlugin {
  static get changes() {
    return ImageChanges
  }

  static get components() {
    return [
      ImageNode,
    ]
  }

  static get plugins() {
    return [
      RenderNode('Image', props => <ImageNode { ...props } />),
    ]
  }
}

export default ImagePlugin
