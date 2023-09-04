import styled from 'styled-components'

export const FileInput = styled.input`
  display: none;
`

export const Image = styled.img`
  height: auto;
  max-width: 100%;
  width: auto;
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

export const Root = styled.div`
  border: ${ ({ isSelected, theme }) => isSelected ? `2px solid ${ theme.palette.chroma.gray.alpha(0.2).css() }` : 'none' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  margin: 0.5rem auto;
  padding: 1rem;
  position: relative;
  width: 90%;
`
