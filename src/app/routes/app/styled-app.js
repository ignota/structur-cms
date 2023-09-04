import LogoBase from 'images/logo.svg'
import styled from 'styled-components'

export const Logo = styled(LogoBase)`
  fill: currentColor;
  height: 24px;
  width: 24px;
`

export const Site = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 64px;
  width: 100%;
`

export const Spacer = styled.span`
  flex-grow: 1;
`
