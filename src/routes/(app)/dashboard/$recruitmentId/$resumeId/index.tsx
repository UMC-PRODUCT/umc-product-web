import { createFileRoute, useNavigate } from '@tanstack/react-router'

import ViewResume from '@/features/dashboard/pages/ViewResume'

type ViewResumeSearch = {
  page: number
}

const RouteComponent = () => {
  const navigate = useNavigate()
  const { page = 1 } = Route.useSearch()
  const params = Route.useParams()

  const setPage = (next: number) => {
    navigate({
      to: Route.to,
      params,
      search: (prev) => ({ ...prev, page: next }),
      replace: false,
    })
  }

  return <ViewResume currentPage={page} onPageChange={setPage} />
}

export const Route = createFileRoute('/(app)/dashboard/$recruitmentId/$resumeId/')({
  validateSearch: (search: Record<string, unknown>): ViewResumeSearch => {
    return {
      page: Number(search.page ?? 1),
    }
  },
  component: RouteComponent,
})
