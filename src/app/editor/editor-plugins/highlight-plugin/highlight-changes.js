export function toggleHighlight(change) {
  const { fragment, inlines, selection } = change.value

  const previousHighlights = inlines.filter(inline => inline.type === 'Highlight')
  if (previousHighlights.size) {
    previousHighlights.forEach(highlight => {
      change
        .removeNodeByKey(highlight.key)
        .insertText(highlight.text)
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
        type: 'Highlight',
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
      type: 'Highlight',
    })
    .focus()
}
