import { createFileRoute, Outlet } from '@tanstack/react-router'

import Flex from '@/components/common/Flex/Flex'
import Footer from '@/components/layout/Footer/Footer'
import ChallengerHeader from '@/components/layout/Header/ChallengerHeader'

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
