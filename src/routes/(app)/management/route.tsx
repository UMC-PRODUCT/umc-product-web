import { Outlet, createFileRoute } from '@tanstack/react-router'
import Flex from '@/components/common/Flex/Flex'

export const Route = createFileRoute('/(app)/management')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Flex css={{ flex: 1 }}>
        <Outlet />
      </Flex>
    </Flex>
  )
}
