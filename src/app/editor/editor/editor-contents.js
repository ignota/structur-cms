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
import React, { PureComponent } from 'react'
import { Editor } from './styled-editor-contents'

const plugins = [
  ...AnnotationPlugin.plugins,
  ...AnswerPlugin.plugins,
  ...ArticlePlugin.plugins,
  ...BlockQuotePlugin.plugins,
  ...CaptionPlugin.plugins,
  ...CitationPlugin.plugins,
  ...CompositionPlugin.plugins,
  ...CroppedImagePlugin.plugins,
  ...DividerPlugin.plugins,
  ...DropcapPlugin.plugins,
  ...EpigraphPlugin.plugins,
  ...HeadingPlugin.plugins,
  ...HeroPlugin.plugins,
  ...HighlightPlugin.plugins,
  ...ImagePlugin.plugins,
  ...ImpressPlugin.plugins,
  ...InlinePlugin.plugins,
  ...LedePlugin.plugins,
  ...LinkPlugin.plugins,
  ...ListItemPlugin.plugins,
  ...ListPlugin.plugins,
  ...ParagraphPlugin.plugins,
  ...PullMediaPlugin.plugins,
  ...PullQuotePlugin.plugins,
  ...QAPlugin.plugins,
  ...QuestionPlugin.plugins,
  ...StepPlugin.plugins,
  ...VersePlugin.plugins,
  ...VideoPlugin.plugins,
]

class EditorContents extends PureComponent {
  render() {
    return (
      <Editor
        spellCheck
        autoCorrect={ false }
        plugins={ plugins }
        { ...this.props } />
    )
  }
}

export default EditorContents
