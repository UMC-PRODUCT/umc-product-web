import { Outlet, createFileRoute } from '@tanstack/react-router'
import Header from '@/components/common/Header/Header'
import Footer from '@/components/common/Footer/Footer'
import Flex from '@/components/common/Flex/Flex'

export const Route = createFileRoute('/(app)/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Flex css={{ flex: 1 }}>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}
