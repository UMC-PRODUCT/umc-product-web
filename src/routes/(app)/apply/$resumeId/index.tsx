import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { MOCKFORMSDATA_WITH_ANSWER } from '@/features/apply/mocks/questions'
import Resume from '@/features/apply/pages/Resume'

type ResumeSearch = {
  page: number
}

const RouteComponent = () => {
  const navigate = useNavigate()
  const { page = 1 } = Route.useSearch()
  const params = Route.useParams()
  const { questionData } = Route.useLoaderData()

  const setPage = (next: number) => {
    navigate({
      to: Route.to,
      params,
      search: (prev) => ({ ...prev, page: next }),
      replace: false,
    })
  }

  return <Resume questionData={questionData} currentPage={page} onPageChange={setPage} />
}

export const Route = createFileRoute('/(app)/apply/$resumeId/')({
  validateSearch: (search: Record<string, unknown>): ResumeSearch => {
    return {
      page: Number(search.page ?? 1),
    }
  },
  loader: () => ({ questionData: MOCKFORMSDATA_WITH_ANSWER }),
  component: RouteComponent,
})
