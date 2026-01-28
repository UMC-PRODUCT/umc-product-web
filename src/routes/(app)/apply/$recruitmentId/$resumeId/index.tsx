import { useEffect, useRef } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import Resume from '@/features/apply/pages/Resume'

type ResumeSearch = {
  page: number
}

const RouteComponent = () => {
  const navigate = useNavigate()
  const { page = 1 } = Route.useSearch()
  const params = Route.useParams()
  const hasInitializedRef = useRef(false)

  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true
      if (page !== 1) {
        navigate({
          to: Route.to,
          params,
          search: (prev) => ({ ...prev, page: 1 }),
          replace: true,
        })
      }
    }
  }, [page, navigate, params])

  const setPage = (next: number) => {
    navigate({
      to: Route.to,
      params,
      search: (prev) => ({ ...prev, page: next }),
      replace: false,
    })
  }

  return <Resume currentPage={page} onPageChange={setPage} />
}

export const Route = createFileRoute('/(app)/apply/$recruitmentId/$resumeId/')({
  validateSearch: (search: Record<string, unknown>): ResumeSearch => {
    return {
      page: Number(search.page ?? 1),
    }
  },
  component: RouteComponent,
})
