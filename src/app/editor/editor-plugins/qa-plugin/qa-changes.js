export function toggleQA(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'QA')
      .focus()

    return
  }

  change
    .wrapBlock('QA')
    .focus()
}
