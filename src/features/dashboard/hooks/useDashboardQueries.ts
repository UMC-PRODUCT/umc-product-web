import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { dashboardKeys } from '../domain/queryKeys'

export function useMyApplications() {
  return useCustomSuspenseQuery(
    dashboardKeys.getMyApplications().queryKey,
    dashboardKeys.getMyApplications().queryFn,
  )
}
