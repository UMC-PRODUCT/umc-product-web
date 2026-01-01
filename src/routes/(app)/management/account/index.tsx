import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/management/account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "(management)/management/account"!</div>
}
