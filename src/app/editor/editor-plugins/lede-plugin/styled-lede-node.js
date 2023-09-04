import styled from 'styled-components'

export const Lede = styled.aside`
  font-style: italic;
  margin: 0 auto;
  width: 56.3%;
`

export const Root = styled.div`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  margin: 0 0 0.5rem;
`
