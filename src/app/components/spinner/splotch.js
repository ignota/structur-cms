import React, { PureComponent } from 'react'
import { Logo } from './styled-splotch'
import { Transition } from 'react-transition-group'

class Splotch extends PureComponent {
    state = {
      in: false,
    }

    get logoStyle() {
      return {
        opacity: this.state.in ? 1 : 0,
      }
    }

    handleEnter(node) {
      // Force a repaint when the node enters the DOM, or else new styles aren't
      // applied.
      // eslint-disable-next-line babel/no-unused-expressions
      node.scrollTop
      this.setState({ in: true })
    }

    handleExit() {
      this.setState({ in: false })
    }

    render() {
      const {
        style,
        ...props
      } = this.props

      return (
        <Transition
          timeout={ 400 }
          onEnter={ this.handleEnter }
          onExit={ this.handleExit }
          { ...props }>
          <Logo style={{ ...this.logoStyle, ...style }} />
        </Transition>
      )
    }
}

export default Splotch
