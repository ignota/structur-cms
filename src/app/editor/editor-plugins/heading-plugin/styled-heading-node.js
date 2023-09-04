import styled from 'styled-components'

export const H = styled.h1`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  font-weight: 700;
`
