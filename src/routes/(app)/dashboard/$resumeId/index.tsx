import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { MOCK_VIEW_RESUME_DATA } from '@/features/dashboard/mocks/viewResume'
import ViewResume from '@/features/dashboard/pages/ViewResume'

type ViewResumeSearch = {
  page: number
}

const RouteComponent = () => {
  const navigate = useNavigate()
  const { page = 1 } = Route.useSearch()
  const params = Route.useParams()
  const { resumeData } = Route.useLoaderData()

  const setPage = (next: number) => {
    navigate({
      to: Route.to,
      params,
      search: (prev) => ({ ...prev, page: next }),
      replace: false,
    })
  }

  return <ViewResume resumeData={resumeData} currentPage={page} onPageChange={setPage} />
}

export const Route = createFileRoute('/(app)/dashboard/$resumeId/')({
  validateSearch: (search: Record<string, unknown>): ViewResumeSearch => {
    return {
      page: Number(search.page ?? 1),
    }
  },
  loader: () => ({ resumeData: MOCK_VIEW_RESUME_DATA }),
  component: RouteComponent,
})
