import { author as authorSchema } from '../authors/schemas'
import { schema } from 'normalizr'
import { tag as tagsSchema } from '../tags/schemas'

export const post = new schema.Entity(
  'posts',
  {
    authors: [authorSchema],
    tags: [tagsSchema],
  },
  {
    idAttribute: 'uuid',
  },
)
