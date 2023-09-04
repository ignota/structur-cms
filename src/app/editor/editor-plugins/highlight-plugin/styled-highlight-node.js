import styled from 'styled-components'

export const Root = styled.mark`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.highlight.alpha(0.4).css() : theme.palette.chroma.highlight.alpha(0.2).css() };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  color: inherit;
  font-weight: ${ ({ isSelected }) => isSelected ? '500' : '400' };
  padding: 0.25em 0.5em;
`
