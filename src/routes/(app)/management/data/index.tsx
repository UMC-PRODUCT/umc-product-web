import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/management/data/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /(management)/management/Data!</div>
}
