import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Recruiting } from '@/features/school/pages/Recruiting'
import type { RouteSearch } from '@/shared/router/search'
import { parsePositiveNumberSearch } from '@/shared/router/search'

type RecruitingSearch = {
  step: number
}

const parseRecruitingSearch = (search: RouteSearch): RecruitingSearch => {
  const step = parsePositiveNumberSearch(search, 'step', 1)
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
