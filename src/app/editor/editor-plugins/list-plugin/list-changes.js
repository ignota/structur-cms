export function toggleList(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'List')
      .focus()

    return
  }

  change
    .wrapBlock('List')
    .focus()
}
