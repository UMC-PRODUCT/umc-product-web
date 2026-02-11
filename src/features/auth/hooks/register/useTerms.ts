// 약관 ID와 내용을 한 번에 가져오는 쿼리 훅

import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { authKeys } from '@/shared/queryKeys'
import type { TermsType } from '@/shared/types/umc'

import { getTermsById, getTermsByType } from '../../domain/api'

export const useTerms = ({ termsType }: { termsType: TermsType }) => {
  return useCustomSuspenseQuery(
    authKeys.getTermsByType(termsType),
    () => getTermsByType({ termsType }),
    { retry: false },
  )
}

export const useTermsById = (termId: string) => {
  return useCustomSuspenseQuery(authKeys.getTermsById(termId), () => getTermsById(termId), {
    retry: false,
  })
}
