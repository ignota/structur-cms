export function toggleEpigraph(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Epigraph')
      .focus()

    return
  }

  change
    .wrapBlock('Epigraph')
    .focus()
}
