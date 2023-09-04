import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const Column = styled.div`
  flex-basis: 33.333%;
`

export const Drafting = styled.span`
  color: ${ ({ theme }) => theme.palette.rgb.red };
`

export const Pending = styled.span`
  color: ${ ({ theme }) => theme.palette.rgb.yellow };
`

export const Previewing = styled.span`
  color: ${ ({ theme }) => theme.palette.rgb.yellow };
`

export const Published = styled.span`
  color: ${ ({ theme }) => theme.palette.rgb.green };
`

export const Root = styled.div`
  width: 100%;
`

export const Status = styled(Typography)`
  &&& {
    color: ${ ({ theme }) => theme.palette.rgb.disabled };
    font-size: 0.875rem;
    line-height: 1.777;
  }
`

export const Title = styled(Typography)`
  &&& {
    font-size: 0.875rem;
    line-height: 1.777;
  }
`
