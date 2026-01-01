import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/recruiting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/recruiting/"!</div>
}
