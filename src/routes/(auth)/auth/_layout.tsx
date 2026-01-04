import { createFileRoute, Outlet } from '@tanstack/react-router'

import Footer from '@shared/layout/Footer/Footer'
import ChallengerHeader from '@shared/layout/Header/ChallengerHeader'
import Flex from '@shared/ui/common/Flex/Flex'

export const Route = createFileRoute('/(auth)/auth/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <ChallengerHeader />
      <Flex css={{ flex: 1 }}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}
