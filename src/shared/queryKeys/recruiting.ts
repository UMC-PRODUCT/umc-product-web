import { createQueryKeys } from '@lukemorales/query-key-factory'

const recruitingKeyFactory = createQueryKeys('recruiting', {})

export const recruitingKeys = {
  base: recruitingKeyFactory.queryKey,
}
