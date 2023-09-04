import * as CroppedImageChanges from './cropped-image-changes'
import CroppedImageNode from './cropped-image-node'
import React from 'react'
import { RenderNode } from '../base'

class CroppedImagePlugin {
  static get changes() {
    return CroppedImageChanges
  }

  static get components() {
    return {
      CroppedImageNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('CroppedImage', props => <CroppedImageNode { ...props } />),
    ]
  }
}

export default CroppedImagePlugin
