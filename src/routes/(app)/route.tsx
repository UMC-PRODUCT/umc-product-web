import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'

import Footer from '@shared/layout/Footer/Footer'
import ChallengerHeader from '@shared/layout/Header/ChallengerHeader'
import SuperHeader from '@shared/layout/Header/SuperHeader'
import Flex from '@shared/ui/common/Flex/Flex'

import SchoolHeader from '@/shared/layout/Header/SchoolHeader'

const RouteComponent = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const isManagement = pathname.startsWith('/management')
  const isSchool = pathname.startsWith('/school')

  return (
    <Flex flexDirection="column" minHeight="100vh">
      {isManagement ? <SuperHeader /> : isSchool ? <SchoolHeader /> : <ChallengerHeader />}
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
