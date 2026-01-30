import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getMyInfo, getTerm } from '@/features/auth/domain/api'
import type { TermsType } from '@/shared/types/umc'

export const termsKeys = createQueryKeys('terms', {
  detail: (termsType: TermsType) => ({
    queryKey: [termsType, 'detail'],
    queryFn: () => getTerm({ termsType }),
  }),
})

export const memberKeys = createQueryKeys('member', {
  me: () => ({
    queryKey: ['me'],
    queryFn: () => getMyInfo(),
  }),
})
