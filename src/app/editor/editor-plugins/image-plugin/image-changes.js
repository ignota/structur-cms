export function toggleImage(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .setBlocksAtRange(selection, {
        data: {},
        type: 'Image',
      })
      .insertBlock('Paragraph')
      .focus()

    return
  }

  change
    .setBlocks({
      data: {},
      type: 'Image',
    })
    .insertBlock('Paragraph')
    .focus()
}
