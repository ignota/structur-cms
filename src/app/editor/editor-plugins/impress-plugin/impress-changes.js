export function toggleImpress(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Impress')
      .focus()

    return
  }

  change
    .wrapBlock('Impress')
    .focus()
}
