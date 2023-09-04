import SpinnerBase from '../spinner'
import styled from 'styled-components'

export const Error = styled.strong`
  color: ${ ({ theme }) => theme.palette.rgb.red };
`

export const Root = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  font-size: 2.074rem;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`

export const Spinner = styled(SpinnerBase)`
  height: 33vh;
  width: 100%;
`
