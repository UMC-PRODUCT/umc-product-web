import { Outlet, createFileRoute } from '@tanstack/react-router'
import SuperHeader from '@/components/Header/SuperHeader'
import Footer from '@/components/common/Footer/Footer'
import Flex from '@/components/common/Flex/Flex'

export const Route = createFileRoute('/(app)/management')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex direction="column" minHeight="100vh">
      <SuperHeader />
      <Flex css={{ flex: 1 }}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}
