import { css } from 'styled-components'
import { modularScale } from 'polished'

export const primary = css`
  font-family: sans-serif;

  html.primary & {
    font-family: ${ ({ theme }) => theme.typography.primary };
  }
`

export const ms = step => modularScale(step, '1rem', 'perfectFourth')
