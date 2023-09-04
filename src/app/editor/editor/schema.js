import R from 'ramda'

const schema = {
  blocks: {
    Answer: {
      data: {
        uuid: R.T,
      },
      parent: {
        type: 'QA',
      },
    },
    Composition: {
      data: {
        assets: R.T,
        json: R.T,
        jsonFile: R.T,
        uuid: R.T,
      },
      isVoid: true,
    },
    CroppedImage: {
      data: {
        image: R.T,
        src: R.T,
        uuid: R.T,
      },
      isVoid: true,
    },
    Divider: {
      data: {
        uuid: R.T,
      },
      isVoid: true,
    },
    Heading: {
      data: {
        primary: R.T,
        size: R.T,
        uuid: R.T,
      },
    },
    Hero: {
      data: {
        gradient: R.T,
        image: R.T,
        imageSRC: R.T,
        title: R.T,
        uuid: R.T,
      },
    },
    Image: {
      data: {
        image: R.T,
        src: R.T,
        uuid: R.T,
      },
      isVoid: true,
    },
    Impress: {
      data: {
        duration: R.T,
        height: R.T,
        maxScale: R.T,
        minScale: R.T,
        perspective: R.T,
        uuid: R.T,
        width: R.T,
      },
    },
    List: {
      data: {
        color: R.T,
        start: R.T,
        style: R.T,
        uuid: R.T,
      },
    },
    ListItem: {
      data: {
        uuid: R.T,
      },
      parent: {
        type: 'List',
      },
    },
    Paragraph: {
      data: {
        align: R.T,
        flush: R.T,
        indent: R.T,
        uuid: R.T,
      },
    },
    PullMedia: {
      data: {
        float: R.T,
        uuid: R.T,
      },
    },
    PullQuote: {
      data: {
        float: R.T,
        uuid: R.T,
      },
    },
    Question: {
      data: {
        uuid: R.T,
      },
      parent: {
        type: 'QA',
      },
    },
    Step: {
      data: {
        rotate: R.T,
        rotateX: R.T,
        rotateY: R.T,
        rotateZ: R.T,
        scale: R.T,
        uuid: R.T,
        x: R.T,
        y: R.T,
        z: R.T,
      },
      parent: {
        type: 'Impress',
      },
    },
    Video: {
      data: {
        sources: R.T,
        uuid: R.T,
        video: R.T,
      },
      isVoid: true,
    },
    VideoPlayer: {
      data: {
        sources: R.T,
        uuid: R.T,
        video: R.T,
      },
      isVoid: true,
    },
  },
  document: {
    nodes: [
      {
        match: [
          { type: 'Annotation' },
          { type: 'Answer' },
          { type: 'Article' },
          { type: 'BlockQuote' },
          { type: 'Caption' },
          { type: 'Citation' },
          { type: 'Composition' },
          { type: 'CroppedImage' },
          { type: 'Divider' },
          { type: 'Dropcap' },
          { type: 'Epigraph' },
          { type: 'Heading' },
          { type: 'Hero' },
          { type: 'Highlight' },
          { type: 'Image' },
          { type: 'Impress' },
          { type: 'Inline' },
          { type: 'Lede' },
          { type: 'Link' },
          { type: 'List' },
          { type: 'ListItem' },
          { type: 'Paragraph' },
          { type: 'PullMedia' },
          { type: 'PullQuote' },
          { type: 'QA' },
          { type: 'Question' },
          { type: 'Step' },
          { type: 'Verse' },
          { type: 'Video' },
          { type: 'VideoPlayer' },
        ],
      },
    ],
  },
  inlines: {
    Annotation: {
      data: {
        alignment: R.T,
        children: R.T,
        color: R.T,
        embed: R.T,
        uuid: R.T,
      },
    },
    Dropcap: {
      data: {
        accent: R.T,
        baseline: R.T,
        height: R.T,
      },
    },
    Highlight: {
      data: {
        uuid: R.T,
      },
    },
    Inline: {
      data: {
        style: R.T,
        uuid: R.T,
      },
    },
    Link: {
      data: {
        background: R.T,
        color: R.T,
        plain: R.T,
        popup: R.T,
        to: R.T,
        uuid: R.T,
      },
    },
  },
}

export default schema
