import { useEffect, useLayoutEffect, useState } from 'react'
import type { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import type { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import type TanStackQueryDevtools from '@app/devtools/tanstack-query'

import { DEFAULT_OG_IMAGE, getSiteUrl, resolveSeoConfig, SITE_NAME } from '@/shared/constants/meta'
import { Flex } from '@/shared/ui/common/Flex'
import { ErrorFallback, NotFoundPage } from '@/shared/ui/feedback'
import { applySeoMeta } from '@/shared/utils/seo'

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

type DevtoolsState = {
  Devtools: typeof TanStackDevtools
  RouterPanel: typeof TanStackRouterDevtoolsPanel
  QueryDevtools: typeof TanStackQueryDevtools
}

const RootComponent = () => {
  const shouldShowDevtools = import.meta.env.DEV
  const locationHref = useRouterState({ select: (state) => state.location.href })
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [devtools, setDevtools] = useState<DevtoolsState | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const siteUrl = getSiteUrl()
    const { title, description, robots } = resolveSeoConfig(pathname)
    const canonicalUrl = `${siteUrl}${pathname}`
    const ogImageUrl = `${siteUrl}${DEFAULT_OG_IMAGE}`

    applySeoMeta({
      title,
      description,
      robots,
      canonicalUrl,
      ogImageUrl,
      siteName: SITE_NAME,
    })
  }, [pathname])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [locationHref])

  useEffect(() => {
    if (!shouldShowDevtools) return
    let isMounted = true
    Promise.all([
      import('@tanstack/react-devtools'),
      import('@tanstack/react-router-devtools'),
      import('@app/devtools/tanstack-query'),
    ]).then(([reactDevtools, routerDevtools, queryDevtools]) => {
      if (!isMounted) return
      setDevtools({
        Devtools: reactDevtools.TanStackDevtools,
        RouterPanel: routerDevtools.TanStackRouterDevtoolsPanel,
        QueryDevtools: queryDevtools.default,
      })
    })
    return () => {
      isMounted = false
    }
  }, [shouldShowDevtools])

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Outlet />
      {shouldShowDevtools && devtools ? (
        <devtools.Devtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <devtools.RouterPanel />,
            },
            devtools.QueryDevtools,
          ]}
        />
      ) : null}
    </Flex>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFoundComponent,
})
