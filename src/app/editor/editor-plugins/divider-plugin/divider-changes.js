export function insertDivider(change) {
  change
    .setBlocks({
      data: {},
      type: 'Divider',
    })
    .insertBlock({
      type: 'Paragraph',
    })
    .focus()
}
