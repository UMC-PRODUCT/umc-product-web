import { createFileRoute, Outlet } from '@tanstack/react-router'

import Footer from '@/features/auth/components/layout/Footer/Footer'
import ChallengerHeader from '@/features/auth/components/layout/Header/ChallengerHeader'
import Flex from '@/shared/ui/common/Flex/Flex'

const RouteComponent = () => {
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

export const Route = createFileRoute('/(auth)/auth/_layout')({
  component: RouteComponent,
})
