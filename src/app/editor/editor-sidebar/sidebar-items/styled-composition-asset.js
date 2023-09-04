import styled from 'styled-components'

export const FileInput = styled.input`
  display: none;
`

export const Filename = styled.div`
  background-color: ${ ({ theme }) => theme.palette.chroma.gray.alpha(0.66).css() };
  bottom: 0;
  color: #FFF;
  line-height: 1;
  position: absolute;
  text-align: center;
  width: 100%;
  word-break: break-all;

  svg {
    fill: #FFF;
  }
`

export const InputLabel = styled.label`
  align-items: center;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 50%;
  justify-content: center;
  width: 50%;
`

export const InputLabelContainer = styled.div`
  align-items: center;
  background-size: cover;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  display: flex;
  height: 15rem;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  width: 90%;
`

export const Root = styled.div`
`
