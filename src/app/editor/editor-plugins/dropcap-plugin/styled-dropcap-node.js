import styled from 'styled-components'

export const Root = styled.span`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  color: inherit;
  display: inline-block;
  font-weight: ${ ({ isSelected }) => isSelected ? '500' : '400' };
  padding: 1rem 0.5em;
`

export const Strut = styled.span`
  display: block;
`
