import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { authKeys } from '@/shared/queryKeys'
import type { TermsType } from '@/shared/types/umc'

import { getTermsByType } from '../domain/api'

export function useGetTerm({ termsType }: { termsType: TermsType }) {
  const { data: response, ...rest } = useCustomSuspenseQuery(
    authKeys.getTermsByType(termsType),
    () => getTermsByType({ termsType }),
  )

  return { data: response.result, ...rest }
}
