export function togglePullQuote(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'PullQuote')
      .focus()

    return
  }

  change
    .wrapBlock('PullQuote')
    .focus()
}
