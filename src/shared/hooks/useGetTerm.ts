import { authKeys } from '@/features/auth/domain/queryKeys'
import type { TermsType } from '@/shared/types/umc'

import { useCustomSuspenseQuery } from './customQuery'

export function useGetTerm({ termsType }: { termsType: TermsType }) {
  const { data: response, ...rest } = useCustomSuspenseQuery(
    authKeys.getTermsByType(termsType).queryKey,
    authKeys.getTermsByType(termsType).queryFn,
  )

  return { data: response.result, ...rest }
}
