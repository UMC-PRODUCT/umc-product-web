import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Recruiting } from '@/features/school/pages/Recruiting'

type RecruitingSearch = {
  // source=extension: 추가모집 흐름 진입 플래그
  source?: 'temp' | 'extension'
  // 추가모집 생성 시 기준이 되는 Base 모집 ID
  baseRecruitmentId?: string
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
  const source = sourceValue === 'temp' || sourceValue === 'extension' ? sourceValue : undefined
  const baseRecruitmentId =
    typeof search.baseRecruitmentId === 'string' ? search.baseRecruitmentId : undefined
  const step = normalizeNumericSearch(search.step, 1)
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
