export function toggleInline(change) {
  const { fragment, inlines, selection } = change.value

  const previousInlines = inlines.filter(inline => inline.type === 'Inline')
  if (previousInlines.size) {
    previousInlines.forEach(inline => {
      change
        .removeNodeByKey(inline.key)
        .insertText(inline.text)
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
        type: 'Inline',
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
      type: 'Inline',
    })
    .focus()
}
