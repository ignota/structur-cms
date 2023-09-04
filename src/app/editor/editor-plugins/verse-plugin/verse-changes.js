export function toggleVerse(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Verse')
      .focus()

    return
  }

  change
    .wrapBlock('Verse')
    .focus()
}
