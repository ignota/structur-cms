import {
  Chip as ChipBase,
  Paper,
} from '@material-ui/core'
import styled from 'styled-components'

export const Chip = styled(ChipBase)`
    &&& {
        margin: 0.5rem 0.25rem;
    }
`

export const Chips = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin: 0 0.25rem 0 0;
    max-width: 50%;
    overflow-x: auto;
`

export const CompletionContainer = styled.div`
    max-width: 100%;
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
