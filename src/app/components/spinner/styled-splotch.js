import logo from 'images/spinner/logo.png'
import styled from 'styled-components'

export const Logo = styled.div`
  background-image: url(${ logo });
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 300ms ${ ({ theme }) => theme.transition.timing.standard };
  will-change: opacity;
`
