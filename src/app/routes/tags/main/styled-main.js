import { Button } from '@material-ui/core'
import styled from 'styled-components'

export const AbsoluteButton = styled(Button)`
  &&& {
    position: absolute;
    right: 0;
    top: 64px;
    transform: translate(-50%, -50%);
    z-index: 2000;
  }
`

export const Root = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 75%;
`
