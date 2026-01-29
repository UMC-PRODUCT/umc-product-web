import { createFileRoute } from '@tanstack/react-router'

import RecruitingPreviewPage from '@/features/school/pages/RecruitingPreviewPage'

export const Route = createFileRoute('/(app)/school/recruiting/$recruitingId/preview')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  return <RecruitingPreviewPage recruitingId={params.recruitingId} />
}
