export function toggleCitation(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .setBlocksAtRange(selection, {
        data: {},
        type: 'Citation',
      })
      .focus()

    return
  }

  change
    .setBlocks({ data: {}, type: 'Citation' })
    .focus()
}
