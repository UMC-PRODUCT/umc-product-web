import { createFileRoute, Outlet } from '@tanstack/react-router'

const RouteComponent = () => {
  return <Outlet />
}

export const Route = createFileRoute('/(app)/management')({
  component: RouteComponent,
})
