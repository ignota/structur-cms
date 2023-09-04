import * as BlockQuoteChanges from './block-quote-changes'
import BlockQuoteNode from './block-quote-node'
import React from 'react'
import { RenderNode } from '../base'

class BlockQuotePlugin {
  static get changes() {
    return BlockQuoteChanges
  }

  static get components() {
    return {
      BlockQuoteNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('BlockQuote', props => <BlockQuoteNode { ...props } />),
    ]
  }
}

export default BlockQuotePlugin
