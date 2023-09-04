export function toggleDropcap(change) {
  const { fragment, inlines, selection } = change.value

  const previousDropcaps = inlines.filter(inline => inline.type === 'Dropcap')
  if (previousDropcaps.size) {
    previousDropcaps.forEach(dc => {
      change
        .removeNodeByKey(dc.key)
        .insertText(dc.text)
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
        type: 'Dropcap',
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
            { text: '?' },
          ],
          object: 'text',
        },
      ],
      type: 'Dropcap',
    })
    .focus()
}
