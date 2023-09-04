import { schema } from 'normalizr'

export const node = new schema.Entity(
  'nodes',
  {},
  {
    idAttribute: 'uuid',
  },
)
