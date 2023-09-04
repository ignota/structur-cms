export function toggleVideo(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .setBlocksAtRange(selection, {
        data: {},
        type: 'Video',
      })
      .insertBlock('Paragraph')
      .focus()

    return
  }

  change
    .setBlocks({
      data: {},
      type: 'Video',
    })
    .insertBlock('Paragraph')
    .focus()
}
