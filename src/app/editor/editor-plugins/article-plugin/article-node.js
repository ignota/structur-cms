import { Children, Label } from '../base'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { Article } from './styled-article-node'
import { connect } from 'react-redux'
import { NewspaperIcon } from 'mdi-react'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class ArticleNode extends PureComponent {
  handleClick(event) {
    const { node, onSetActiveNode } = this.props

    event.stopPropagation()
    event.preventDefault()

    onSetActiveNode(node.key)
  }

  render() {
    const {
      activeNode,
      attributes,
      children,
      node,
    } = this.props

    const isSelected = activeNode === node.key

    return (
      <Article
        { ...attributes }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <NewspaperIcon />
        </Label>
        <Children>
          { children }
        </Children>
      </Article>
    )
  }
}

export default ArticleNode
