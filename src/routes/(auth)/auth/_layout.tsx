import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/auth/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet></Outlet>
}
