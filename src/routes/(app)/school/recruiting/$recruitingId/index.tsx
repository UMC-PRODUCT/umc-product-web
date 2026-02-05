import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Recruiting } from '@/features/school/pages/Recruiting'

type RecruitingSearch = {
  source?: 'temp'
  step: number
}

const normalizeNumericSearch = (value: unknown, fallback: number) => {
  const raw = typeof value === 'string' || typeof value === 'number' ? Number(value) : undefined
  if (Number.isFinite(raw ?? fallback) && raw !== undefined && raw > 0) {
    return raw
  }
  return fallback
}

const parseRecruitingSearch = (search: Record<string, unknown>): RecruitingSearch => {
  const sourceValue = typeof search.source === 'string' ? search.source : undefined
  const source = sourceValue === 'temp' ? sourceValue : undefined
  const step = normalizeNumericSearch(search.step, 1)
  return { source, step }
}

export const Route = createFileRoute('/(app)/school/recruiting/$recruitingId/')({
  validateSearch: (search) => parseRecruitingSearch(search),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const params = Route.useParams()
  const { step, source } = Route.useSearch()

  const updateSearch = (nextStep: number) => {
    navigate({
      to: Route.to,
      params,
      search: {
        source,
        step: nextStep,
      },
      replace: true,
    })
  }

  return (
    <Recruiting
      recruitingId={params.recruitingId}
      initialStepNumber={step}
      onStepNumberChange={updateSearch}
    />
  )
}
