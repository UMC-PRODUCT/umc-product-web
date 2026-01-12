import { createFileRoute } from '@tanstack/react-router'

import SchoolRecruiting from '@/features/school/pages/SchoolRecruiting'

export const Route = createFileRoute('/(app)/school/recruiting/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SchoolRecruiting />
}
