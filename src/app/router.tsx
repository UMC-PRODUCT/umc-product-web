import { createBrowserHistory, createMemoryHistory, createRouter } from '@tanstack/react-router'

import * as TanStackQueryProvider from '@app/providers/tanstack-query'

import { routeTree } from '../routeTree.gen.ts'

type CreateAppRouterOptions = {
  path?: string
}

export const createAppRouter = ({ path }: CreateAppRouterOptions = {}) => {
  const { queryClient } = TanStackQueryProvider.getContext()
  const history = path
    ? createMemoryHistory({
        initialEntries: [path],
      })
    : createBrowserHistory()

  const router = createRouter({
    routeTree,
    history,
    context: {
      queryClient,
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
  })

  return {
    router,
    queryClient,
  }
}

export type AppRouter = ReturnType<typeof createAppRouter>['router']

declare module '@tanstack/react-router' {
  interface Register {
    router: AppRouter
  }
}
