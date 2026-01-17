import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import TanStackQueryDevtools from '@app/devtools/tanstack-query'

import { ErrorFallback, NotFoundPage } from '@/shared/ui/feedback'

interface MyRouterContext {
  queryClient: QueryClient
}

const RootErrorComponent = ({ error }: { error: Error }) => {
  const router = useRouter()

  const handleReset = () => {
    router.invalidate()
  }

  return <ErrorFallback error={error} resetErrorBoundary={handleReset} />
}

const RootNotFoundComponent = () => {
  return <NotFoundPage />
}

const RootComponent = () => {
  const shouldShowDevtools = import.meta.env.DEV

  return (
    <>
      <Outlet />
      {shouldShowDevtools ? (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      ) : null}
    </>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFoundComponent,
})
