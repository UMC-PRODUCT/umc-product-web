import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'

import Footer from '@shared/layout/Footer/Footer'
import ChallengerHeader from '@shared/layout/Header/ChallengerHeader'
import SuperHeader from '@shared/layout/Header/SuperHeader'
import Flex from '@shared/ui/common/Flex/Flex'

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
