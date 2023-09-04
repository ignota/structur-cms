import * as ArticleChanges from './article-changes'
import ArticleNode from './article-node'
import React from 'react'
import { RenderNode } from '../base'

class ArticlePlugin {
  static get changes() {
    return ArticleChanges
  }

  static get components() {
    return {
      ArticleNode,
    }
  }

  static get plugins() {
    return [
      RenderNode('Article', props => <ArticleNode { ...props } />),
    ]
  }
}

export default ArticlePlugin
