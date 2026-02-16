import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Recruiting } from '@/features/school/pages/Recruiting'

type RecruitingSearch = {
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
  const step = normalizeNumericSearch(search.step, 1)
  return { step }
}

export const Route = createFileRoute('/(app)/school/recruiting/$recruitingId/published')({
  validateSearch: (search) => parseRecruitingSearch(search),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const params = Route.useParams()
  const { step } = Route.useSearch()

  const updateSearch = (nextStep: number) => {
    navigate({
      to: Route.to,
      params,
      search: { step: nextStep },
      replace: true,
    })
  }

  return (
    <Recruiting
      recruitingId={params.recruitingId}
      initialStepNumber={step}
      onStepNumberChange={updateSearch}
      forceLockedMode={true}
    />
  )
}
