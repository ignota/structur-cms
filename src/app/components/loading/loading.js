import {
  Error,
  Root,
  Spinner,
} from './styled-loading'
import React, { PureComponent } from 'react'

class Loading extends PureComponent {
  render() {
    const {
      error,
    } = this.props

    if (error) {
      return (
        <Root>
          <Spinner />
          <div>
            <Error>Error:</Error> { error.message }
          </div>
          <a href='mailto:engineering@ignota.media'>Contact Engineering</a>
          <pre style={{ fontSize: '65.2%' }}>
            <code>
              { error.stack }
            </code>
          </pre>
        </Root>
      )
    }

    return (
      <Root>
        <Spinner />
      </Root>
    )
  }
}

export default Loading
