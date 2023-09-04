export function toggleArticle(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Article')
      .focus()

    return
  }

  change
    .wrapBlock('Article')
    .focus()
}
