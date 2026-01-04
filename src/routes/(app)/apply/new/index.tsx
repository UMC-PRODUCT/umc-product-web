import { createFileRoute } from '@tanstack/react-router'

import Resume from '@/features/apply/pages/Resume'

export const Route = createFileRoute('/(app)/apply/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Resume />
}
