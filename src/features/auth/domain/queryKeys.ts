import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getMyInfo } from '@/features/auth/domain/api'
import type { TermsRequestDTO } from '@/shared/api/terms'
import { getTermsId } from '@/shared/api/terms'

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
