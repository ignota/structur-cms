import React from 'react'
import styled from 'styled-components'

const span = styled(({ color: _color, isSelected: _isSelected, ...props }) => <span { ...props } />)

export const Link = span`
  align-items: center;
  background-color: ${ ({ color = 'primary', isSelected, theme }) => isSelected ? theme.palette.chroma[color].alpha(0.4).css() : theme.palette.chroma[color].alpha(0.2).css() };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  display: inline-flex;
  font-weight: ${ ({ isSelected }) => isSelected ? '500' : '400' };
  justify-content: center;
  min-width: 3em;
  padding: 0 0.5em;
  text-decoration: underline;
  text-indent: 0;
`
