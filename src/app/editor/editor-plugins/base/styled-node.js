import styled from 'styled-components'

export const Children = styled.div`
  margin: 0 auto;
  width: 90%;
`

export const HiddenChildren = styled.div`
  display: none;
`

export const Label = styled.div`
  align-items: center;
  cursor: pointer;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr auto 1fr;
  padding: 0.5rem 0;
  text-transform: uppercase;

  &::before,
  &::after {
    background: ${ ({ theme }) => theme.palette.rgb.quote };
    content: '';
    display: block;
    height: 2px;
    width: 100%;
  }

  & > svg {
    fill: ${ ({ theme }) => theme.palette.rgb.quoteText };
  }
`
