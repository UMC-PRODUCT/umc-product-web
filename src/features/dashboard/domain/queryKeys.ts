import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getMyApplications } from './api'

export const dashboardKeys = createQueryKeys('dashboard', {
  /** GET /recruitments/me/applications */
  getMyApplications: () => ({
    queryKey: ['myApplications'],
    queryFn: getMyApplications,
  }),
})
