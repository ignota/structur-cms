import {
  FileInput,
  Filename,
  InputLabel,
  InputLabelContainer,
  Root,
} from './styled-composition-asset'
import { Icon, IconButton } from '@material-ui/core'
import React, { PureComponent } from 'react'
import { Close } from 'mdi-material-ui'
import { CloudUploadIcon } from 'mdi-react'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

@DropTarget(
  NativeTypes.FILE,
  {
    drop(props, monitor) {
      const { id, onAddFile } = props
      const [file] = monitor.getItem().files
      onAddFile(id, file)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
class CompositionAsset extends PureComponent {
  static getDerivedStateFromProps(props) {
    const { url } = props

    if (url) {
      return {
        url,
      }
    }

    return null
  }

  fileInput = React.createRef()

  state = {
    filename: null,
    url: null,
  }

  componentDidMount() {
    const { file, url } = this.props

    if (file) {
      this.setState({ filename: file.name })
      this.readImage(file)
    } else if (url) {
      const filename = url.split('/').pop()
      this.setState({ filename })
    }
  }

  componentWillUnmount() {
    if (this.reader) {
      this.reader.abort()
    }
  }

  handleClear(event) {
    const { id, onClearFileInput } = this.props

    event.stopPropagation()
    event.preventDefault()

    this.fileInput.current.value = ''
    this.setState({ filename: null, url: null })

    onClearFileInput(id)
  }

  handleFileChange(event) {
    const { id, onSetFileInput } = this.props

    const filename = event.target.value.split('\\').pop()
    const [file] = event.target.files

    this.setState({ filename })
    this.readImage(file)

    onSetFileInput(id, file)
  }

  readImage(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ url: reader.result }))
    reader.readAsDataURL(file)
    this.reader = reader
  }

  render() {
    const { connectDropTarget, id } = this.props
    const { filename, url } = this.state

    const htmlID = `composition-asset-${ id }`

    return (
      <Root>
        <InputLabelContainer htmlFor={ htmlID } style={{ backgroundImage: url && `url(${ url })` }}>
          <FileInput id={ htmlID } name={ htmlID } ref={ this.fileInput } type='file' onChange={ this.handleFileChange } />
          <InputLabel htmlFor={ htmlID } ref={ connectDropTarget }>
            { filename
              ? (
                <Filename>
                  <span>{ filename }</span>
                  <IconButton style={{ padding: 0 }} onClick={ this.handleClear }>
                    <Icon>
                      <Close />
                    </Icon>
                  </IconButton>
                </Filename>
              ) : (
                <CloudUploadIcon />
              )
            }
          </InputLabel>
        </InputLabelContainer>
      </Root>
    )
  }
}

export default CompositionAsset
