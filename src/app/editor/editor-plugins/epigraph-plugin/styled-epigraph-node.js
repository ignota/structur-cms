import styled from 'styled-components'

export const Epigraph = styled.blockquote`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  color: ${ ({ theme }) => theme.palette.rgb.quoteText };
  float: ${ ({ float = 'center' }) => float === 'center' ? 'none' : float };
  margin: 0 auto 0.5rem;
  padding: 0;
  width: 75%;
`
