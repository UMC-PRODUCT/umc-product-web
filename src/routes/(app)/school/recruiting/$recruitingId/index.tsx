import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Recruiting } from '@/features/school/pages/Recruiting'
import type { RouteSearch } from '@/shared/router/search'
import { parseOptionalStringSearch, parsePositiveNumberSearch } from '@/shared/router/search'

type RecruitingSearch = {
  // source=extension: 추가모집 흐름 진입 플래그
  source?: 'temp' | 'extension'
  // 추가모집 생성 시 기준이 되는 Base 모집 ID
  baseRecruitmentId?: string
  step: number
}

const parseRecruitingSearch = (search: RouteSearch): RecruitingSearch => {
  const sourceValue = parseOptionalStringSearch(search, 'source')
  const source = sourceValue === 'temp' || sourceValue === 'extension' ? sourceValue : undefined
  const baseRecruitmentId = parseOptionalStringSearch(search, 'baseRecruitmentId')
  const step = parsePositiveNumberSearch(search, 'step', 1)
  return { source, baseRecruitmentId, step }
}

export const Route = createFileRoute('/(app)/school/recruiting/$recruitingId/')({
  validateSearch: (search) => parseRecruitingSearch(search),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const params = Route.useParams()
  const { step, source, baseRecruitmentId } = Route.useSearch()

  const updateSearch = (nextStep: number) => {
    navigate({
      to: Route.to,
      params,
      search: {
        source,
        baseRecruitmentId,
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
      source={source}
      baseRecruitmentId={baseRecruitmentId}
    />
  )
}
