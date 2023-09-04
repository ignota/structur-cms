export function toggleAnnotation(change) {
  const { fragment, inlines, selection } = change.value

  const previousAnnotations = inlines.filter(inline => inline.type === 'Annotation')
  if (previousAnnotations.size) {
    previousAnnotations.forEach(annotation => {
      change
        .removeNodeByKey(annotation.key)
        .insertText(annotation.text)
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
        type: 'Annotation',
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
      type: 'Annotation',
    })
    .focus()
}
