import { profile } from '../profiles/schemas'
import { schema } from 'normalizr'

export const author = new schema.Entity(
  'authors',
  {
    profiles: [profile],
  },
  {
    idAttribute: 'uuid',
  },
)
