import { useEffect, useLayoutEffect } from 'react'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import TanStackQueryDevtools from '@app/devtools/tanstack-query'

import { Flex } from '@/shared/ui/common/Flex'
import { ErrorFallback, NotFoundPage } from '@/shared/ui/feedback'

interface MyRouterContext {
  queryClient: QueryClient
}

const DEFAULT_DESCRIPTION =
  'UMC 운영팀이 정책·계정·데이터를 한 곳에서 관리할 수 있도록 만든 백오피스입니다.'
const HOME_DESCRIPTION =
  'UMC 운영팀을 위한 백오피스 홈입니다. 운영 효율과 정책 반영 속도를 높입니다.'
const DESCRIPTION_RULES: Array<{ prefix: string; description: string }> = [
  {
    prefix: '/auth/login',
    description: 'UMC Web 로그인 페이지입니다.',
  },
  {
    prefix: '/auth/register',
    description: 'UMC Web 회원가입 페이지입니다.',
  },
  {
    prefix: '/recruiting',
    description: 'UMC 모집 공고 및 일정 정보를 확인하는 페이지입니다.',
  },
  {
    prefix: '/apply',
    description: 'UMC 지원서 작성 및 제출을 위한 페이지입니다.',
  },
  {
    prefix: '/dashboard',
    description: 'UMC 지원 현황과 진행 상태를 확인하는 대시보드입니다.',
  },
  {
    prefix: '/management',
    description: '총괄 계정·시스템 관리 페이지입니다.',
  },
  {
    prefix: '/school',
    description: '학교별 UMC 운영 및 모집 관리를 위한 페이지입니다.',
  },
]

const resolveDescription = (pathname: string) => {
  if (pathname === '/') return HOME_DESCRIPTION
  const rule = DESCRIPTION_RULES.find((item) => pathname.startsWith(item.prefix))
  return rule?.description ?? DEFAULT_DESCRIPTION
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
  const locationKey = useRouterState({ select: (state) => state.location.href })
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const description = resolveDescription(pathname)
    const head = document.head
    let meta = head.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      head.appendChild(meta)
    }
    if (meta.getAttribute('content') !== description) {
      meta.setAttribute('content', description)
    }
  }, [pathname])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [locationKey])

  return (
    <Flex flexDirection="column" minHeight="100vh">
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
    </Flex>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: RootNotFoundComponent,
})
