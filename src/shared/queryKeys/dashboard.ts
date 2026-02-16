import { createQueryKeys } from '@lukemorales/query-key-factory'

const dashboardKeyFactory = createQueryKeys('dashboard', {
  recruitments: {
    queryKey: null,
    contextQueries: {
      me: {
        queryKey: null,
        contextQueries: {
          applications: null,
        },
      },
    },
  },
})

export const dashboardKeys = {
  getMyApplications: dashboardKeyFactory.recruitments._ctx.me._ctx.applications.queryKey,
}
