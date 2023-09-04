import styled from 'styled-components'

export const Root = styled.span`
  align-items: center;
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  display: inline-flex;
  font-style: ${ ({ inline }) => inline === 'italic' ? 'italic' : 'normal' };
  font-weight: ${ ({ inline }) => inline === 'bold' ? '700' : '400' };
  justify-content: center;
  min-width: 3em;
  padding: 0 0.5em;
  text-decoration: ${ ({ inline }) => inline === 'underline' ? 'underline' : 'none' };
  text-indent: 0;
`
