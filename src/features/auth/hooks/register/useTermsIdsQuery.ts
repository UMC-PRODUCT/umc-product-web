// 약관 ID와 내용을 한 번에 가져오는 쿼리 훅

import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import type { TermsType } from '@/shared/types/umc'

import { termsKeys } from '../../domain/queryKeys'

export const useTerms = ({ termsType }: { termsType: TermsType }) => {
  return useCustomSuspenseQuery(
    termsKeys.detail(termsType).queryKey,
    termsKeys.detail(termsType).queryFn,
    { retry: false },
  )
}
