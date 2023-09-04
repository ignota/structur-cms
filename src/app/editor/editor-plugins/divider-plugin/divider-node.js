import React, { PureComponent } from 'react'
import { HiddenChildren } from '../base'

class DividerNode extends PureComponent {
  render() {
    const {
      attributes,
      children,
    } = this.props

    return (
      <div>
        <hr { ...attributes } contentEditable={ false } />
        <HiddenChildren>
          { children }
        </HiddenChildren>
      </div>
    )
  }
}

export default DividerNode
