import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { TermsRequestDTO } from '@/features/auth/domain/api'
import { getMyInfo, getTermsId } from '@/features/auth/domain/api'

export const termsKeys = createQueryKeys('terms', {
  detail: (termsType: TermsRequestDTO['termsType']) => ({
    queryKey: [termsType],
    queryFn: () => getTermsId({ termsType }),
  }),
})

export const memberKeys = createQueryKeys('member', {
  me: () => ({
    queryKey: ['me'],
    queryFn: () => getMyInfo(),
  }),
})
