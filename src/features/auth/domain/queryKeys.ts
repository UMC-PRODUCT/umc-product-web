import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { TermsType } from '@/shared/types/umc'

import { getMyInfo, getTerm } from './api'

export const authKeys = createQueryKeys('auth', {
  terms: (termsType: TermsType) => ({
    queryKey: ['terms', termsType, 'detail'],
    queryFn: () => getTerm({ termsType }),
  }),
  me: () => ({
    queryKey: ['member', 'me'],
    queryFn: () => getMyInfo(),
  }),
})
