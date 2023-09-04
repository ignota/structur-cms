export function toggleCaption(change) {
  const { selection } = change.value

  if (selection.isExpanded) {
    change
      .wrapBlockAtRange(selection, 'Caption')
      .focus()

    return
  }

  change
    .wrapBlock('Caption')
    .focus()
}
