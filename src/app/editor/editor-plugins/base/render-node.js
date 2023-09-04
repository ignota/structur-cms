function RenderNode(type, renderFn) {
  return {
    renderNode(props) {
      if (props.node.type === type) {
        return renderFn(props)
      }
    },
  }
}

export default RenderNode
