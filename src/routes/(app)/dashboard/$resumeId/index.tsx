import { createFileRoute, useNavigate } from '@tanstack/react-router'

import ViewResume from '@/features/dashboard/pages/ViewResume'
import { MOCK_VIEW_RESUME_DATA } from '@/shared/mocks/questions'

type ResumeSearch = {
  page: number
}

export const Route = createFileRoute('/(app)/dashboard/$resumeId/')({
  validateSearch: (search: Record<string, unknown>): ResumeSearch => {
    return {
      page: Number(search.page ?? 1),
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { resumeId } = Route.useParams()
  const { page = 1 } = Route.useSearch()
  const setPage = (next: number) => {
    navigate({
      to: Route.to,
      params: { resumeId },
      search: (prev) => ({ ...prev, page: next }),
      replace: false,
    })
  }
  return <ViewResume data={MOCK_VIEW_RESUME_DATA} page={page} setPage={setPage} />
}
