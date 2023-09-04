import {
  Background,
  Children,
  Foreground,
  Gradient,
  Hero,
  Placeholder,
  Title,
} from './styled-hero-node'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import chroma from 'chroma-js'
import { connect } from 'react-redux'
import { getUploadURL } from 'app/lib'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
  }),
  { onSetActiveNode: actions.editor.setActiveNode },
)
class HeroNode extends PureComponent {
  state = {}

  componentDidUpdate() {
    const file = this.props.node.data.get('image')
    const imageSRC = this.props.node.data.get('imageSRC')

    if (file) {
      this.loadImageFile(file)
    } else if (imageSRC) {
      this.setState({ src: getUploadURL(imageSRC) })
    }
  }

  componentWillUnmount() {
    if (this.reader) {
      this.reader.abort()
    }
  }

  handleClick(event) {
    const { node, onSetActiveNode } = this.props

    event.stopPropagation()
    event.preventDefault()

    onSetActiveNode(node.key)
  }

  loadImageFile(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ src: reader.result }))
    reader.readAsDataURL(file)
    this.reader = reader
  }

  render() {
    const {
      activeNode,
      attributes,
      children,
      node,
    } = this.props
    const { src } = this.state

    const isSelected = activeNode === node.key

    const gradient = node.data.get('gradient') || ['#FFF', '#FFF']
    const title = node.data.get('title') || <Placeholder>Title</Placeholder>

    let safeGradient
    try {
      if (gradient.length < 2) {
        throw new Error()
      }

      safeGradient = gradient.map(c => chroma(c))
    } catch {
      safeGradient = ['#FFF', '#FFF'].map(c => chroma(c))
    }

    const scale = chroma
      .scale(safeGradient)
      .mode('lab')
      .correctLightness()
      .colors(5, null)
      .map(c => {
        if (src && isSelected) {
          return c.alpha(0.8).css()
        } else if (isSelected) {
          return c.alpha(1).css()
        } else {
          return c.alpha(0.5).css()
        }
      })

    return (
      <Hero { ...attributes } onClick={ this.handleClick }>
        { src && <Background src={ src } /> }
        <Gradient scale={ scale } />
        <Foreground>
          <Title contentEditable={ false }>
            { title }
          </Title>
          <Children>
            { children }
          </Children>
        </Foreground>
      </Hero>
    )
  }
}

export default HeroNode
