export function toggleAnswer(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Answer')
      .focus()

    return
  }

  change
    .wrapBlock('Answer')
    .focus()
}
