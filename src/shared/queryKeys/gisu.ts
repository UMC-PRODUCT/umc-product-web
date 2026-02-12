import { createQueryKeys } from '@lukemorales/query-key-factory'

const gisuKeyFactory = createQueryKeys('gisu', {
  all: null,
  active: null,
})

export const gisuKeys = {
  all: gisuKeyFactory.all.queryKey,
  active: gisuKeyFactory.active.queryKey,
}
