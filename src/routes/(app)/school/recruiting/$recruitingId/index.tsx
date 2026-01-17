import { createFileRoute } from '@tanstack/react-router'

import Recruiting from '@/features/school/pages/Recruiting'

export const Route = createFileRoute('/(app)/school/recruiting/$recruitingId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Recruiting></Recruiting>
}
