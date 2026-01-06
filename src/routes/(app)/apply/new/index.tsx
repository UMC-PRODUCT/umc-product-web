import { createFileRoute, useNavigate } from '@tanstack/react-router'

import Resume from '@/features/apply/pages/Resume'
import { MOCKFORMSDATA } from '@/shared/mocks/questions'

type ResumeSearch = {
  page: number
}

export const Route = createFileRoute('/(app)/apply/new/')({
  validateSearch: (search: Record<string, unknown>): ResumeSearch => {
    return {
      page: Number(search.page ?? 1),
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { page = 1 } = Route.useSearch()
  const setPage = (next: number) => {
    navigate({
      to: Route.to,
      search: (prev) => ({ ...prev, page: next }),
      replace: false,
    })
  }
  return <Resume data={MOCKFORMSDATA} page={page} setPage={setPage} />
}
