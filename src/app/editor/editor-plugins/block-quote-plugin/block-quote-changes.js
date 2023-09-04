export function toggleBlockQuote(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'BlockQuote')
      .focus()

    return
  }

  change
    .wrapBlock('BlockQuote')
    .focus()
}
