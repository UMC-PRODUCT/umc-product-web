import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/management')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
