export function toggleParagraph(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Paragraph')
      .focus()

    return
  }

  change
    .insertBlock('Paragraph')
    .focus()
}
