import { Outlet, createFileRoute } from '@tanstack/react-router'
import SuperHeader from '@/components/Header/SuperHeader'

export const Route = createFileRoute('/(app)/management')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SuperHeader />
      <Outlet />
    </>
  )
}
