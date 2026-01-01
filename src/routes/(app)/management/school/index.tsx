import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/management/school/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/management/school"!</div>
}
