import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'

import Footer from '@shared/layout/Footer/Footer'
import ChallengerHeader from '@shared/layout/Header/ChallengerHeader'
import SchoolHeader from '@shared/layout/Header/SchoolHeader'
import SuperHeader from '@shared/layout/Header/SuperHeader'
import Flex from '@shared/ui/common/Flex/Flex'

type HeaderType = 'challenger' | 'management' | 'school'

/**
 * 현재 경로에 맞는 헤더 타입을 결정
 */
function getHeaderType(pathname: string): HeaderType {
  if (pathname.startsWith('/management')) return 'management'
  if (pathname.startsWith('/school')) return 'school'
  return 'challenger'
}

/**
 * 헤더 타입에 따른 헤더 컴포넌트 매핑
 */
const HEADER_COMPONENTS: Record<HeaderType, React.ComponentType> = {
  challenger: ChallengerHeader,
  management: SuperHeader,
  school: SchoolHeader,
}

/**
 * 앱 레이아웃
 * - 경로에 따라 적절한 헤더 렌더링
 * - 공통 Footer 렌더링
 */
const RouteComponent = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const headerType = getHeaderType(pathname)
  const HeaderComponent = HEADER_COMPONENTS[headerType]

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <HeaderComponent />
      <Flex css={{ flex: 1 }}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
})
