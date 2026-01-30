import { termsKeys } from '@/features/auth/domain/queryKeys'

import type { TermsType } from '../types/umc'
import { useCustomSuspenseQuery } from './customQuery'

export function useGetTerm({ termsType }: { termsType: TermsType }) {
  const { data: response, ...rest } = useCustomSuspenseQuery(
    termsKeys.detail(termsType).queryKey,
    termsKeys.detail(termsType).queryFn,
  )

  return { data: response.result, ...rest }
}
