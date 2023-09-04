import styled from 'styled-components'

export const Player = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  transform: translate(-50%, -50%);
`

export const Progress = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  justify-content: center;
`

export const Root = styled.div`
  border: ${ ({ isSelected, theme }) => isSelected ? `2px solid ${ theme.palette.chroma.gray.alpha(0.2).css() }` : 'none' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  margin: 0.5rem auto;
  padding: 1rem;
  position: relative;
  width: 90%;
`

export const Video = styled.video`
  height: auto;
  max-width: 100%;
  width: auto;
`
