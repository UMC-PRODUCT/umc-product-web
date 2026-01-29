import { useCustomQuery } from '@/shared/hooks/customQuery'

import { dashboardKeys } from '../domain/queryKeys'

export function useMyApplications() {
  return useCustomQuery(
    dashboardKeys.getMyApplications().queryKey,
    dashboardKeys.getMyApplications().queryFn,
  )
}
