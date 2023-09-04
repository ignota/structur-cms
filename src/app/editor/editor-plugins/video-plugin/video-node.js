import {
  Player,
  Progress,
  Root,
  Video,
} from './styled-video-node'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { getUploadURL } from 'app/lib'
import { HiddenChildren } from '../base'
import { MovieIcon } from 'mdi-react'
import { NativeTypes } from 'react-dnd-html5-backend'
import R from 'ramda'

@connect(
  (state, props) => {
    const { activeNode, nodesByID, uploadsByJobID, value } = state.editor

    const uuid = props.node.data.get('uuid')
    const job = R.path([uuid, 'videoJobID'], nodesByID)
    const sources = R.path([uuid, 'sources'], nodesByID)
    const upload = R.prop(job, uploadsByJobID)

    return {
      activeNode,
      job,
      sources,
      upload,
      value,
    }
  },
  {
    onChange: actions.editor.change,
    onRequestNode: actions.editor.requestNode,
    onSetActiveNode: actions.editor.setActiveNode,
    onSubscribeToUploadJob: actions.editor.subscribeToUploadJob,
  },
)
@DropTarget(
  NativeTypes.FILE,
  {
    drop(props, monitor) {
      const { node, onChange, value } = props
      const video = monitor.getItem().files[0]

      const change = value.change()
        .setNodeByKey(node.key, {
          data: node.data.set('video', video),
        })
        .focus()

      onChange(change)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)
class VideoNode extends PureComponent {
  state = {}

  componentDidMount() {
    this.populateSRC()
  }

  componentDidUpdate(prevProps) {
    if (!R.equals(prevProps, this.props)) {
      this.populateSRC()
    }
  }

  componentWillUnmount() {
    if (this.reader) {
      this.reader.abort()
    }
  }

  handleClick(event) {
    const { node, onSetActiveNode } = this.props

    event.stopPropagation()
    event.preventDefault()

    onSetActiveNode(node.key)
  }

  loadVideoFile(file) {
    const reader = new FileReader()
    reader.addEventListener('load', () => this.setState({ src: reader.result }))
    reader.readAsDataURL(file)
    this.reader = reader
  }

  populateSRC() {
    const {
      job,
      onRequestNode,
      onSubscribeToUploadJob,
      sources: sourcesProp,
      upload,
    } = this.props

    const file = this.props.node.data.get('video')
    const sources = sourcesProp ?? this.props.node.data.get('sources')
    const uuid = this.props.node.data.get('uuid')

    if (file) {
      this.loadVideoFile(file)
    } else if (sources && JSON.parse(sources).mp4) {
      const src = getUploadURL(JSON.parse(sources).mp4)
      this.setState({ src })
    } else if (job && !upload) {
      onSubscribeToUploadJob({ job, node: uuid })
    } else if (uuid && !upload) {
      onRequestNode(uuid)
    }
  }

  render() {
    const {
      activeNode,
      attributes,
      children,
      connectDropTarget,
      node,
      upload,
    } = this.props
    const { src } = this.state

    const isSelected = activeNode === node.key

    return (
      <Root
        { ...attributes }
        isSelected={ isSelected }
        ref={ ref => connectDropTarget(ref) }
        onClick={ this.handleClick }>
        { node.type === 'VideoPlayer' && (
          <Player>
            <MovieIcon />
          </Player>
        ) }
        { src
          ? (
            <Video controls muted playsInline>
              <source src={ src } />
            </Video>
          ) : (
            <Progress>
              <CircularProgress
                value={ upload?.percentComplete }
                variant={ upload?.percentComplete ? 'determinate' : 'indeterminate' } />
            </Progress>
          )
        }
        <HiddenChildren>
          { children }
        </HiddenChildren>
      </Root>
    )
  }
}

export default VideoNode
