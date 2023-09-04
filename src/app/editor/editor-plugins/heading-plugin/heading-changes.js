export function toggleHeading(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .setBlocksAtRange(selection, {
        data: {},
        type: 'Heading',
      })
      .focus()

    return
  }

  change
    .setBlocks({ data: {}, type: 'Heading' })
    .focus()
}
