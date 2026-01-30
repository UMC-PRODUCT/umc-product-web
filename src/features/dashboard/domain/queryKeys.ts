import { createQueryKeys } from '@lukemorales/query-key-factory'

import { getMyApplications } from './api'

export const dashboardKeys = createQueryKeys('dashboard', {
  getMyApplications: () => ({
    queryKey: ['myApplications'],
    queryFn: getMyApplications,
  }),
})
