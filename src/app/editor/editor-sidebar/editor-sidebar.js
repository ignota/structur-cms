import * as Items from './sidebar-items'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Root } from './styled-editor-sidebar'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
    parent: state.editor.parent,
  }),
)
class EditorSidebar extends PureComponent {
  getSidebarItem(node) {
    switch (node?.type) {
      case 'Annotation':
        return Items.Annotation

      case 'Citation':
        return Items.Citation

      case 'Composition':
        return Items.Composition

      case 'Dropcap':
        return Items.Dropcap

      case 'Epigraph':
        return Items.Epigraph

      case 'Heading':
        return Items.Heading

      case 'Hero':
        return Items.Hero

      case 'Impress':
        return Items.Impress

      case 'Inline':
        return Items.Inline

      case 'Link':
        return Items.Link

      case 'List':
        return Items.List

      case 'Paragraph':
        return Items.Paragraph

      case 'PullMedia':
        return Items.PullMedia

      case 'PullQuote':
        return Items.PullQuote

      case 'Step':
        return Items.Step

      case 'Video':
      case 'VideoPlayer':
        return Items.Video

      default:
        return Items.Post
    }
  }

  render() {
    const {
      activeNode,
      onChange,
      postID,
      value,
    } = this.props

    const node = value.document.getDescendant(activeNode)
    const Item = this.getSidebarItem(node)

    return (
      <Root>
        <Item
          key={ activeNode }
          node={ node }
          postID={ postID }
          value={ value }
          onChange={ onChange } />
      </Root>
    )
  }
}

export default EditorSidebar
