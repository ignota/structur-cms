import {
  Paper as PaperBase,
  Toolbar as ToolbarBase,
} from '@material-ui/core'
import styled from 'styled-components'

export const Paper = styled(PaperBase)`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  position: sticky;
  top: 0;
  z-index: 100;
`

export const Toolbar = styled(ToolbarBase)`
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  width: 100%;
`
