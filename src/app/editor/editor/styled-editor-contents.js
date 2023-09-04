import { Editor as EditorBase } from 'slate-react'
import styled from 'styled-components'

export const Editor = styled(EditorBase)`
  ${ ({ theme }) => theme.helpers.typography.primary }

  background-color: ${ ({ theme }) => theme.palette.rgb.editorBackground };
  padding: 1rem 12.5%;
`
