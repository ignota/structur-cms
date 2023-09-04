import styled from 'styled-components'

export const P = styled.p`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  margin: 0;
  text-align: ${ ({ align }) => align };
  text-indent: ${ ({ flush, indent }) => {
    return indent
      ? '1.777em !important'
      : flush
        ? '0 !important'
        : '0'
  } };

  & + p {
    text-indent: 1.777em;
  }
`
