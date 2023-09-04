import * as HeroChanges from './hero-changes'
import HeroNode from './hero-node'
import React from 'react'
import { RenderNode } from '../base'

class HeroPlugin {
  static get changes() {
    return HeroChanges
  }

  static get components() {
    return {
      HeroNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Hero', props => <HeroNode { ...props } />),
    ]
  }
}

export default HeroPlugin
