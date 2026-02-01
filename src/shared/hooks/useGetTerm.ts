import { termsKeys } from '@/shared/api/auth/queries'
import type { TermsType } from '@/shared/types/umc'

import { useCustomSuspenseQuery } from './customQuery'

export function useGetTerm({ termsType }: { termsType: TermsType }) {
  const { data: response, ...rest } = useCustomSuspenseQuery(
    termsKeys.detail(termsType).queryKey,
    termsKeys.detail(termsType).queryFn,
  )

  return { data: response.result, ...rest }
}
