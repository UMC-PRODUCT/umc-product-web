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

interface MyRouterContext {
  queryClient: QueryClient
}

const upsertMetaByName = (name: string, content: string) => {
  const head = document.head
  let meta = head.querySelector(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    head.appendChild(meta)
  }
  if (meta.getAttribute('content') !== content) {
    meta.setAttribute('content', content)
  }
}

const upsertMetaByProperty = (property: string, content: string) => {
  const head = document.head
  let meta = head.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    head.appendChild(meta)
  }
  if (meta.getAttribute('content') !== content) {
    meta.setAttribute('content', content)
  }
}

const upsertCanonical = (href: string) => {
  const head = document.head
  let link = head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    head.appendChild(link)
  }
  if (link.getAttribute('href') !== href) {
    link.setAttribute('href', href)
  }
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

    document.title = title

    upsertMetaByName('description', description)
    upsertMetaByName('robots', robots)
    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', title)
    upsertMetaByName('twitter:description', description)
    upsertMetaByName('twitter:url', canonicalUrl)
    upsertMetaByName('twitter:image', ogImageUrl)

    upsertMetaByProperty('og:type', 'website')
    upsertMetaByProperty('og:site_name', SITE_NAME)
    upsertMetaByProperty('og:title', title)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByProperty('og:image', ogImageUrl)

    upsertCanonical(canonicalUrl)
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
