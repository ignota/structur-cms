import styled from 'styled-components'

export const Root = styled.span`
  align-items: center;
  background-color: ${ ({ bg = 'gray', isSelected, theme }) => isSelected ? theme.palette.chroma[bg].alpha(0.4).css() : theme.palette.chroma[bg].alpha(0.2).css() };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  display: inline-flex;
  font-weight: ${ ({ isSelected }) => isSelected ? '500' : '400' };
  justify-content: center;
  min-width: 3em;
  padding: 0 0.5em;
  text-indent: 0;
`
