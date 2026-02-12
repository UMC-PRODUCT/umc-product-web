import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { TermsType } from '@/shared/types/umc'

const authKeyFactory = createQueryKeys('auth', {
  terms: {
    queryKey: null,
    contextQueries: {
      type: (termsType: TermsType) => [termsType, 'detail'],
      detail: (termId: string) => [termId],
    },
  },
  member: {
    queryKey: null,
    contextQueries: {
      me: null,
      oauth: {
        queryKey: null,
        contextQueries: {
          me: null,
        },
      },
    },
  },
})

export const authKeys = {
  getTermsByType: (termsType: TermsType) => authKeyFactory.terms._ctx.type(termsType).queryKey,
  getTermsById: (termId: string) => authKeyFactory.terms._ctx.detail(termId).queryKey,
  getMemberMe: authKeyFactory.member._ctx.me.queryKey,
  getMemberOAuthMe: authKeyFactory.member._ctx.oauth._ctx.me.queryKey,
}
