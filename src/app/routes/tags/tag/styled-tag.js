import styled from 'styled-components'

export const Drop = styled.div`
  background-position: center;
  background-size: cover;
  border: 1px solid ${ ({ theme }) => theme.palette.chroma.black.alpha(0.2).css() };
  height: 10rem;
  margin: 1rem auto;
  width: 10rem;
`
