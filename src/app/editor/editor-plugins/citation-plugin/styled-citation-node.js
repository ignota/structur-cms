import styled from 'styled-components'

export const Citation = styled.cite`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  display: block;
  font-style: italic;
  margin: 0 0 0.5rem;
  padding: 0;
  text-align: ${ ({ alignment = 'right' }) => alignment };

  &::before {
    content: '\\2014';
  }

  & > em {
    font-style: normal;
  }
`
