import { generateMedia, pxToRem } from 'styled-media-query'

const remBreakpoints = pxToRem({
  huge: '1440px',
  large: '1024px',
  medium: '768px',
  small: '425px',
}, 16)

const media = generateMedia(remBreakpoints)

export default media
