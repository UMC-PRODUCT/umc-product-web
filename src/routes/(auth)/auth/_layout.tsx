import { createFileRoute, Outlet } from '@tanstack/react-router'

import Flex from '@/components/common/Flex/Flex'
import Footer from '@/components/common/Footer/Footer'
import ChallengerHeader from '@/components/Header/ChallengerHeader'

export const Route = createFileRoute('/(auth)/auth/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex direction="column" minHeight="100vh">
      <ChallengerHeader />
      <Flex css={{ flex: 1 }}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}
