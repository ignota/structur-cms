export function toggleComposition(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .setBlocksAtRange(selection, {
        data: {},
        type: 'Composition',
      })
      .insertBlock('Paragraph')
      .focus()

    return
  }

  change
    .setBlocks({
      data: {},
      type: 'Composition',
    })
    .insertBlock('Paragraph')
    .focus()
}
