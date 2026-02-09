// 약관 ID와 내용을 한 번에 가져오는 쿼리 훅

import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import type { TermsType } from '@/shared/types/umc'

import { authKeys } from '../../domain/queryKeys'

export const useTerms = ({ termsType }: { termsType: TermsType }) => {
  return useCustomSuspenseQuery(
    authKeys.getTermsByType(termsType).queryKey,
    authKeys.getTermsByType(termsType).queryFn,
    { retry: false },
  )
}

export const useTermsById = (termId: string) => {
  return useCustomSuspenseQuery(
    authKeys.getTermsById(termId).queryKey,
    authKeys.getTermsById(termId).queryFn,
    { retry: false },
  )
}
