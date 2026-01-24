import { createFileRoute } from '@tanstack/react-router'

import Recruiting from '@/features/school/pages/Recruiting'

const parseRecruitingSearch = (search: Record<string, unknown>) => {
  const sourceValue = typeof search.source === 'string' ? search.source : undefined
  const source = sourceValue === 'temp' ? sourceValue : undefined
  return { source }
}

export const Route = createFileRoute('/(app)/school/recruiting/$recruitingId/')({
  validateSearch: (search) => parseRecruitingSearch(search),
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { source } = Route.useSearch()
  const shouldLoadTempDraft = source === 'temp'

  return <Recruiting shouldLoadTempDraft={shouldLoadTempDraft} recruitingId={params.recruitingId} />
}
