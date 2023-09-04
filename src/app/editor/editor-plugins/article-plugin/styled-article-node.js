import styled from 'styled-components'

export const Article = styled.article`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  margin: 0 0 0.5rem;
`
