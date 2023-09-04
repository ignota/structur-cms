export function toggleStep(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Step')
      .focus()

    return
  }

  change
    .wrapBlock('Step')
    .focus()
}
