import {
  Anchor,
  ChevronRight,
  ClosedCaption,
  CommentText,
  Crop,
  FlagVariant,
  FormatHeaderPound,
  FormatLetterCaseUpper,
  FormatListBulletedType,
  FormatPageBreak,
  FormatPilcrow,
  FormatQuoteOpen,
  FormatUnderline,
  Help,
  Image,
  InformationOutline,
  Json,
  LinkVariant,
  Marker,
  MessageDraw,
  MessageText,
  MessageVideo,
  Newspaper,
  Rocket,
  Script,
  StepForward,
  VideoPlus,
  Voice,
  WindowClosed,
} from 'mdi-material-ui'
import {
  AnnotationPlugin,
  AnswerPlugin,
  ArticlePlugin,
  BlockQuotePlugin,
  CaptionPlugin,
  CitationPlugin,
  CompositionPlugin,
  CroppedImagePlugin,
  DividerPlugin,
  DropcapPlugin,
  EpigraphPlugin,
  HeadingPlugin,
  HeroPlugin,
  HighlightPlugin,
  ImagePlugin,
  ImpressPlugin,
  InlinePlugin,
  LedePlugin,
  LinkPlugin,
  ListItemPlugin,
  ListPlugin,
  ParagraphPlugin,
  PullMediaPlugin,
  PullQuotePlugin,
  QAPlugin,
  QuestionPlugin,
  StepPlugin,
  VersePlugin,
  VideoPlugin,
} from '../editor-plugins'
import { IconButton, Tooltip } from '@material-ui/core'
import { Paper, Toolbar } from './styled-editor-toolbar'
import React, { PureComponent } from 'react'

const BUTTON_TYPES = [
  { change: AnnotationPlugin.changes.toggleAnnotation, icon: CommentText, title: 'Annotation' },
  { change: AnswerPlugin.changes.toggleAnswer, icon: InformationOutline, title: 'Answer' },
  { change: ArticlePlugin.changes.toggleArticle, icon: Newspaper, title: 'Article' },
  { change: BlockQuotePlugin.changes.toggleBlockQuote, icon: FormatQuoteOpen, title: 'Block Quote' },
  { change: CaptionPlugin.changes.toggleCaption, icon: ClosedCaption, title: 'Caption' },
  { change: CitationPlugin.changes.toggleCitation, icon: Anchor, title: 'Citation' },
  { change: CompositionPlugin.changes.toggleComposition, icon: Json, title: 'Composition' },
  { change: CroppedImagePlugin.changes.toggleCroppedImage, icon: Crop, title: 'Cropped Image' },
  { change: DividerPlugin.changes.insertDivider, icon: FormatPageBreak, title: 'Divider' },
  { change: DropcapPlugin.changes.toggleDropcap, icon: FormatLetterCaseUpper, title: 'Dropcap' },
  { change: EpigraphPlugin.changes.toggleEpigraph, icon: MessageDraw, title: 'Epigraph' },
  { change: HeadingPlugin.changes.toggleHeading, icon: FormatHeaderPound, title: 'Heading' },
  { change: HeroPlugin.changes.toggleHero, icon: FlagVariant, title: 'Hero' },
  { change: HighlightPlugin.changes.toggleHighlight, icon: Marker, title: 'Highlight' },
  { change: ImagePlugin.changes.toggleImage, icon: Image, title: 'Image' },
  { change: ImpressPlugin.changes.toggleImpress, icon: WindowClosed, title: 'Impress' },
  { change: InlinePlugin.changes.toggleInline, icon: FormatUnderline, title: 'Inline' },
  { change: LedePlugin.changes.toggleLede, icon: Rocket, title: 'Lede' },
  { change: LinkPlugin.changes.toggleLink, icon: LinkVariant, title: 'Link' },
  { change: ListItemPlugin.changes.toggleListItem, icon: ChevronRight, title: 'List Item' },
  { change: ListPlugin.changes.toggleList, icon: FormatListBulletedType, title: 'List' },
  { change: ParagraphPlugin.changes.toggleParagraph, icon: FormatPilcrow, title: 'Paragraph' },
  { change: PullMediaPlugin.changes.togglePullMedia, icon: MessageVideo, title: 'Pull Media' },
  { change: PullQuotePlugin.changes.togglePullQuote, icon: MessageText, title: 'Pull Quote' },
  { change: QAPlugin.changes.toggleQA, icon: Voice, title: 'Q&A' },
  { change: QuestionPlugin.changes.toggleQuestion, icon: Help, title: 'Question' },
  { change: StepPlugin.changes.toggleStep, icon: StepForward, title: 'Step' },
  { change: VersePlugin.changes.toggleVerse, icon: Script, title: 'Verse' },
  { change: VideoPlugin.changes.toggleVideo, icon: VideoPlus, title: 'Video' },
]

class EditorToolbar extends PureComponent {
  handleChange(changeFn) {
    const { onChange, value } = this.props
    const change = value.change().call(changeFn)
    onChange(change)
  }

  renderButton({ change, icon, title }) {
    return (
      <Tooltip enterDelay={ 500 } key={ title } title={ title }>
        <IconButton onClick={ () => this.handleChange(change) }>
          { React.createElement(icon) }
        </IconButton>
      </Tooltip>
    )
  }

  render() {
    return (
      <Paper square elevation={ 1 }>
        <Toolbar variant='dense'>
          { BUTTON_TYPES.map(params => {
            return this.renderButton(params)
          }) }
        </Toolbar>
      </Paper>
    )
  }
}

export default EditorToolbar
