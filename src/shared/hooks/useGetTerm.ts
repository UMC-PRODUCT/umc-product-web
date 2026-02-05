import { authKeys } from '@/features/auth/domain/queryKeys'
import type { TermsType } from '@/shared/types/umc'

import { useCustomSuspenseQuery } from './customQuery'

export function useGetTerm({ termsType }: { termsType: TermsType }) {
  const { data: response, ...rest } = useCustomSuspenseQuery(
    authKeys.terms(termsType).queryKey,
    authKeys.terms(termsType).queryFn,
  )

  return { data: response.result, ...rest }
}
