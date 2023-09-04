import * as PullQuoteChanges from './pull-quote-changes'
import PullQuoteNode from './pull-quote-node'
import React from 'react'
import { RenderNode } from '../base'

class PullQuotePlugin {
  static get changes() {
    return PullQuoteChanges
  }

  static get components() {
    return {
      PullQuoteNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('PullQuote', props => <PullQuoteNode { ...props } />),
    ]
  }
}

export default PullQuotePlugin
