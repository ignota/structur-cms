import styled from 'styled-components'

export const Composition = styled.div`
  background-color: ${ ({ isSelected, theme }) => isSelected ? theme.palette.chroma.gray.alpha(0.2).css() : 'transparent' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  padding: 1rem;
`

export const FileInput = styled.input`
  display: none;
`

export const InputLabel = styled.label`
  align-items: center;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 50%;
  justify-content: center;
  line-height: 1;
  width: 50%;
  word-break: break-all;

  svg {
    fill: currentColor;
  }
`

export const InputLabelContainer = styled.div`
  align-items: center;
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  display: flex;
  height: 10rem;
  justify-content: center;
  margin: 0 auto;
  width: 50%;
`
