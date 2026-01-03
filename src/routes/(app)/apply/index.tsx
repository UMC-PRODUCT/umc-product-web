import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/apply/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /(app)/apply/!</div>
}
