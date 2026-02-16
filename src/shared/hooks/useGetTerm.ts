import { getTermsByType } from '@/features/auth/domain/api'
import { authKeys } from '@/shared/queryKeys'
import type { TermsType } from '@/shared/types/umc'

import { useCustomSuspenseQuery } from './customQuery'

export function useGetTerm({ termsType }: { termsType: TermsType }) {
  const { data: response, ...rest } = useCustomSuspenseQuery(
    authKeys.getTermsByType(termsType),
    () => getTermsByType({ termsType }),
  )

  return { data: response.result, ...rest }
}
