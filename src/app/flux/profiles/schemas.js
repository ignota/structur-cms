import { schema } from 'normalizr'

export const profile = new schema.Entity('profiles', {}, {
  idAttribute: 'uuid',
})
