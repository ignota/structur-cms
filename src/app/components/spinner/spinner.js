import React, { PureComponent } from 'react'
import _ from 'lodash/fp'
import { Root } from './styled-spinner'
import Splotch from './splotch'
import splotch1 from 'images/spinner/splotch1.png'
import splotch2 from 'images/spinner/splotch2.png'
import splotch3 from 'images/spinner/splotch3.png'
import { TransitionGroup } from 'react-transition-group'

const SPLOTCHES = [
  splotch1,
  splotch2,
  splotch3,
]

const dropSplotch = _.pipe(
  _.shuffle,
  _.drop(1),
)

const rand50 = () => (Math.random() * 100) - 50

class Spinner extends PureComponent {
    state = {
      splotches: [],
    }

    reverse = false

    componentDidMount() {
      this.ticker = setInterval(this.tick, 200)
    }

    componentWillUnmount() {
      clearInterval(this.ticker)
    }

    tick() {
      const { splotches } = this.state

      if (splotches.length > 7) {
        this.reverse = true
      } else if (splotches.length === 0) {
        this.reverse = false
      }

      if (this.reverse) {
        const nextSplotches = dropSplotch(splotches)
        this.setState({ splotches: nextSplotches })
      } else {
        const splotch = _.round((Math.random() * 2))
        const WebkitMaskImage = `url(${ SPLOTCHES[splotch] })`
        const WebkitMaskPosition = `${ rand50() }% ${ rand50() }%`
        const nextSplotches = [
          ...splotches,
          <Splotch key={ splotches.length } style={{ WebkitMaskImage, WebkitMaskPosition }} />,
        ]
        this.setState({ splotches: nextSplotches })
      }
    }

    render() {
      const { splotches } = this.state

      return (
        <TransitionGroup appear enter exit component={ Root } { ...this.props }>
          { splotches }
        </TransitionGroup>
      )
    }
}

export default Spinner
