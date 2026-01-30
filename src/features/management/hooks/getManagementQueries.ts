import type { PartType } from '@/features/auth/domain'
import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { managementKeys } from '../domain/queryKeys'

export function useGetCurriculums(part: PartType) {
  const query = managementKeys.curriculums(part)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}
