import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'

import Flex from '@/components/common/Flex/Flex'
import Footer from '@/components/layout/Footer/Footer'
import ChallengerHeader from '@/components/layout/Header/ChallengerHeader'
import SuperHeader from '@/components/layout/Header/SuperHeader'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
})

function RouteComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const isManagement = pathname.startsWith('/management')

  return (
    <Flex flexDirection="column" minHeight="100vh">
      {isManagement ? <SuperHeader /> : <ChallengerHeader />}
      <Flex css={{ flex: 1 }}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}
