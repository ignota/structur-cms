export function toggleQuestion(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Question')
      .focus()

    return
  }

  change
    .wrapBlock('Question')
    .focus()
}
