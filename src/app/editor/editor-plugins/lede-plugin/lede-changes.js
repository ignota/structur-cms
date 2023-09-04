export function toggleLede(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Lede')
      .focus()

    return
  }

  change
    .wrapBlock('Lede')
    .focus()
}
