import {
  CloudUploadIcon,
  JsonIcon,
} from 'mdi-react'
import {
  Composition,
  FileInput,
  InputLabel,
  InputLabelContainer,
} from './styled-composition-node'
import { HiddenChildren, Label } from '../base'
import { Icon, IconButton } from '@material-ui/core'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { Close } from 'mdi-material-ui'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import R from 'ramda'

@connect(
  state => ({
    activeNode: state.editor.activeNode,
    value: state.editor.value,
  }),
  {
    onChange: actions.editor.change,
    onSetActiveNode: actions.editor.setActiveNode,
  },
)
@DropTarget(
  NativeTypes.FILE,
  {
    drop(props, monitor) {
      const { node, onChange, value } = props
      const [json] = monitor.getItem().files

      if (json.type !== 'application/json') {
        return
      }

      const change = value.change()
        .setNodeByKey(node.key, {
          data: node.data.set('json', json),
        })
        .focus()

      onChange(change)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
class CompositionNode extends PureComponent {
  static getDerivedStateFromProps(props) {
    const jsonFile = props.node.data.get('json')
    const jsonFileData = props.node.data.get('jsonFile')

    if (jsonFile) {
      return {
        filename: jsonFile.name,
      }
    }

    if (jsonFileData) {
      const fileData = JSON.parse(jsonFileData)
      return {
        filename: R.pathOr('', ['metadata', 'filename'], fileData),
      }
    }

    return null
  }

  fileInput = React.createRef()

  state = {
    filename: null,
  }

  handleClear(event) {
    const { node, onChange, value } = this.props

    event.stopPropagation()
    event.preventDefault()

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.delete('jsonFile').delete('json'),
      })
      .focus()

    onChange(change)

    this.fileInput.current.value = ''
    this.setState({
      filename: '',
    })
  }

  handleClick(event) {
    const { node, onSetActiveNode } = this.props

    event.stopPropagation()
    event.preventDefault()

    onSetActiveNode(node.key)
  }

  handleFileChange(event) {
    const { node, onChange, value } = this.props

    const filename = event.target.value.split('\\').pop()
    const [json] = event.target.files

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('json', json),
      })
      .focus()

    onChange(change)

    this.setState({ filename })
  }

  render() {
    const {
      activeNode,
      attributes,
      children,
      connectDropTarget,
      node,
    } = this.props
    const {
      filename,
    } = this.state

    const isSelected = activeNode === node.key
    const inputID = `file-${ node.key }`

    return (
      <Composition
        { ...attributes }
        isSelected={ isSelected }>
        <Label contentEditable={ false } onClick={ this.handleClick }>
          <JsonIcon />
        </Label>
        <InputLabelContainer>
          <FileInput accept='.json' id={ inputID } name={ inputID } ref={ this.fileInput } type='file' onChange={ this.handleFileChange } />
          <InputLabel htmlFor={ inputID } ref={ connectDropTarget }>
            { filename
              ? (
                <>
                  <span>{ filename }</span>
                  <IconButton onClick={ this.handleClear }>
                    <Icon><Close /></Icon>
                  </IconButton>
                </>
              ) : (
                <CloudUploadIcon />
              )
            }
          </InputLabel>
        </InputLabelContainer>
        <HiddenChildren>
          { children }
        </HiddenChildren>
      </Composition>
    )
  }
}

export default CompositionNode
