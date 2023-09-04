export function toggleCroppedImage(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .setBlocksAtRange(selection, {
        data: {},
        type: 'CroppedImage',
      })
      .insertBlock('Paragraph')
      .focus()

    return
  }

  change
    .setBlocks({
      data: {},
      type: 'CroppedImage',
    })
    .insertBlock('Paragraph')
    .focus()
}
