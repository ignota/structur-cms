import styled from 'styled-components'

export const Background = styled.img`
  height: auto;
  left: 50%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
`

export const Children = styled.div`
  margin: 0 auto;
  width: 90%;
`

export const Foreground = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
`

export const Gradient = styled.div`
  background: ${ ({ scale: [color1, color2, color3, color4, color5], theme }) => `linear-gradient(${ color5 }, ${ color4 } 10%, ${ color3 } 38%, ${ color2 } 48%, ${ color1 } 62%, ${ theme.palette.rgb.editorBackground })` };
  height: 100%;
  position: absolute;
  width: 100%;
`

export const Hero = styled.header`
  color: ${ ({ theme }) => theme.palette.rgb.white };
  height: 33vh;
  margin: 0.5rem auto;
  overflow: hidden;
  position: relative;
  text-align: center;
  text-shadow: ${ ({ theme }) => theme.elevation.text[2] };
  width: 100%;
`

export const Placeholder = styled.span`
  opacity: 0.33;
`

export const Title = styled.h3`
  text-align: center;
`
