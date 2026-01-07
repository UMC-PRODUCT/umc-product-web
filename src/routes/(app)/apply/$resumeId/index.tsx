import { createFileRoute, useNavigate } from '@tanstack/react-router'

import Resume from '@/features/apply/pages/Resume'
import { MOCKFORMSDATA_WITH_ANSWER } from '@/shared/mocks/questions'

type ResumeSearch = {
  page: number
}

export const Route = createFileRoute('/(app)/apply/$resumeId/')({
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
  return <Resume data={MOCKFORMSDATA_WITH_ANSWER} page={page} setPage={setPage} />
}
