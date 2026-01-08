import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import TanStackQueryDevtools from '@app/devtools/tanstack-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const RootErrorComponent = () => {
  // TODO: 추후 작업 필요
  return <div>TODO: 추후 작업 필요 - error UI</div>
}

const RootNotFoundComponent = () => {
  // TODO: 추후 작업 필요
  return <div>TODO: 추후 작업 필요 - not found UI</div>
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
