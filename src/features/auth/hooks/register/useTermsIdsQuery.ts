// 약관 ID와 내용을 한 번에 가져오는 쿼리 훅

import { termsKeys } from '@/shared/api/auth/queries'
import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import type { TermsType } from '@/shared/types/umc'

export const useTerms = ({ termsType }: { termsType: TermsType }) => {
  return useCustomSuspenseQuery(
    termsKeys.detail(termsType).queryKey,
    termsKeys.detail(termsType).queryFn,
    { retry: false },
  )
}
