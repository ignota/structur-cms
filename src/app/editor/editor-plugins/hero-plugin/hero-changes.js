export function toggleHero(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .setBlocksAtRange(selection, {
        data: {},
        type: 'Hero',
      })
      .focus()

    return
  }

  change
    .setBlocks({ data: {}, type: 'Hero' })
    .focus()
}
