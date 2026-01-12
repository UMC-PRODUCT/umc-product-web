import { createFileRoute } from '@tanstack/react-router'

import SchoolDashboard from '@/features/school/pages/SchoolDashboard'

export const Route = createFileRoute('/(app)/school/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SchoolDashboard />
}
