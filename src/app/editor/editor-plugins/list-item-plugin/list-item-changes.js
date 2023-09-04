export function toggleListItem(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'ListItem')
      .focus()

    return
  }

  change
    .wrapBlock('ListItem')
    .focus()
}
