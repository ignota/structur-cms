import styled from 'styled-components'

export const Caption = styled.figcaption`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  color: ${ ({ theme }) => theme.palette.rgb.gray };
  display: block;
  font-size: 75%;
  margin: 1.333rem auto 0;
  padding: 0;
  text-align: center;

  span {
    display: block;
    text-align: center;
  }
`
