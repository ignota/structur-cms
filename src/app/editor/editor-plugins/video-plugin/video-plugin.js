import * as VideoChanges from './video-changes'
import React from 'react'
import { RenderNode } from '../base'
import VideoNode from './video-node'

class VideoPlugin {
  static get changes() {
    return VideoChanges
  }

  static get components() {
    return {
      VideoNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Video', props => <VideoNode { ...props } />),
      RenderNode('VideoPlayer', props => <VideoNode { ...props } />),
    ]
  }
}

export default VideoPlugin
