import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/management/notice/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div css={{ color: 'white' }}>Hello "/(app)/management/notice"!</div>
}
