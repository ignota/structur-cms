export function toggleLink(change) {
  const { fragment, inlines, selection } = change.value

  const previousLinks = inlines.filter(inline => inline.type === 'Link')
  if (previousLinks.size) {
    previousLinks.forEach(link => {
      change
        .removeNodeByKey(link.key)
        .insertText(link.text)
        .focus()
    })

    return
  }

  if (selection.isExpanded) {
    change
      .insertInline({
        nodes: [
          {
            leaves: [
              { text: fragment.text },
            ],
            object: 'text',
          },
        ],
        type: 'Link',
      })
      .moveToEnd()
      .focus()

    return
  }

  change
    .insertInline({
      nodes: [
        {
          leaves: [
            { text: ' ' },
          ],
          object: 'text',
        },
      ],
      type: 'Link',
    })
    .focus()
}
