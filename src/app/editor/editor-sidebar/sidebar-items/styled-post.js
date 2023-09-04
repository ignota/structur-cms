import { Paper } from '@material-ui/core'
import styled from 'styled-components'

export const CompletionContainer = styled.div`
    position: relative;
    width: 100%;
`

export const CompletionPaper = styled(Paper)`
    &&& {
        left: 0;
        position: absolute;
        right: 0;
        z-index: 1;
    }
`
