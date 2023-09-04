export function togglePullMedia(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'PullMedia')
      .focus()

    return
  }

  change
    .wrapBlock('PullMedia')
    .focus()
}
