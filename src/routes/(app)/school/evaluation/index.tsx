import { createFileRoute } from '@tanstack/react-router'

import SchoolEvaluation from '@/features/school/pages/SchoolEvaluation'

export const Route = createFileRoute('/(app)/school/evaluation/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SchoolEvaluation />
}
