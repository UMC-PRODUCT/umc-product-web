import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { MOCKFORMSDATA } from '@/features/apply/mocks/questions'
import Resume from '@/features/apply/pages/Resume'

type ResumeSearch = {
  page: number
}

const RouteComponent = () => {
  const navigate = useNavigate()
  const { page = 1 } = Route.useSearch()
  const { questionData } = Route.useLoaderData()
  const setPage = (next: number) => {
    navigate({
      to: Route.to,
      search: (prev) => ({ ...prev, page: next }),
      replace: false,
    })
  }
  return <Resume questionData={questionData} currentPage={page} onPageChange={setPage} />
}

export const Route = createFileRoute('/(app)/apply/new/')({
  validateSearch: (search: Record<string, unknown>): ResumeSearch => {
    return {
      page: Number(search.page ?? 1),
    }
  },
  loader: () => ({ questionData: MOCKFORMSDATA }),
  component: RouteComponent,
})
