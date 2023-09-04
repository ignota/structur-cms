import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
`

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

export const CroppedImage = styled.img`
  height: auto;
  max-width: 100%;
  width: auto;
`

export const Root = styled.div`
  border: ${ ({ isSelected, theme }) => isSelected ? `2px solid ${ theme.palette.chroma.gray.alpha(0.2).css() }` : 'none' };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  margin: 0.5rem auto;
  padding: 1rem;
  position: relative;
  width: 90%;
`

export const Spinner = styled.div`
  animation: ${ rotate } 2s infinite linear;
  height: 40px;
  margin: 100px auto;
  position: relative;
  text-align: center;
  width: 40px;
`

export const SpinnerDot1 = styled.div`
  animation: ${ bounce } 2s infinite ease-out;
  background-color: #333;
  border-radius: 100%;
  display: inline-block;
  height: 60%;
  position: absolute;
  top: 0;
  width: 60%;
`

export const SpinnerDot2 = styled.div`
  animation: ${ bounce } 2s infinite ease-out;
  animation-delay: 1s;
  background-color: #333;
  border-radius: 100%;
  bottom: 0;
  display: inline-block;
  height: 60%;
  position: absolute;
  top: auto;
  width: 60%;
`
