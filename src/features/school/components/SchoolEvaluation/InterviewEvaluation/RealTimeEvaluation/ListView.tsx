import { useMemo, useState } from 'react'

import type { PartType } from '@/features/auth/domain'
import {
  useGetInterviewAssignments,
  useGetInterviewEvaluationOptions,
} from '@/features/school/hooks/useRecruitingQueries'
import { Dropdown } from '@/shared/ui/common/Dropdown'

import FilterBar from '../../FilterBar/FilterBar'
import EvaluationCard from '../EvaluationCard/EvaluationCard'
import * as S from './index.style'

const QUERY_KEYS = {
  date: 'rtDate',
} as const

const formatTimeToHourMinute = (value: string) => {
  const [hour = '', minute = ''] = value.split(':')
  if (!hour || !minute) return value
  return `${hour}:${minute}`
}

const canStartEvaluation = ({
  serverNow,
  slotDate,
  slotStart,
}: {
  serverNow: string
  slotDate: string
  slotStart: string
}) => {
  const now = new Date(serverNow)
  const slotStartDate = new Date(`${slotDate}T${slotStart}`)

  if (Number.isNaN(now.getTime()) || Number.isNaN(slotStartDate.getTime())) return true
  return slotStartDate < now
}

const readDateFromQuery = (): string | null => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get(QUERY_KEYS.date)
}

const writeDateToQuery = (date: string) => {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.set(QUERY_KEYS.date, date)
  const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`
  window.history.replaceState(null, '', nextUrl)
}

const ListView = ({
  recruitmentId,
  onStartEval,
}: {
  recruitmentId: string
  onStartEval: (user: { id: string }) => void
}) => {
  const { data: optionsData } = useGetInterviewEvaluationOptions(recruitmentId)
  const [selectedDateId, setSelectedDateId] = useState<string | null>(() => readDateFromQuery())
  const [selectedPartId, setSelectedPartId] = useState<PartType | 'ALL' | null>(null)

  const dateOptions = useMemo(
    () => optionsData?.result.dates.map((date) => ({ id: date, label: date })) ?? [],
    [optionsData?.result.dates],
  )
  const partOptions = useMemo(
    () => [
      ...(optionsData?.result.parts.map((part) => ({
        id: part.key,
        label: part.label,
      })) ?? []),
    ],
    [optionsData?.result.parts],
  )

  const hasSelectedDate = selectedDateId
    ? dateOptions.some((option) => option.id === selectedDateId)
    : false
  const resolvedDateId = (hasSelectedDate ? selectedDateId : null) ?? dateOptions[0]?.id
  const resolvedPartId = selectedPartId as PartType | 'ALL'

  const selectedDateOption = dateOptions.find((option) => option.id === resolvedDateId)
  const selectedPartOption = partOptions.find((option) => option.id === resolvedPartId)

  const { data } = useGetInterviewAssignments(recruitmentId, {
    date: resolvedDateId,
    part: resolvedPartId,
  })

  return (
    <S.Container>
      <FilterBar
        leftChild={
          <>
            <Dropdown
              options={dateOptions}
              value={selectedDateOption}
              placeholder="날짜"
              css={{ height: '40px' }}
              onChange={(option) => {
                const nextDate = String(option.id)
                setSelectedDateId(nextDate)
                writeDateToQuery(nextDate)
              }}
            />
            <Dropdown
              options={partOptions}
              value={selectedPartOption}
              placeholder="전체 파트"
              css={{ height: '40px' }}
              onChange={(option) => setSelectedPartId(option.id as PartType | 'ALL')}
            />
          </>
        }
        rightChild={<S.FilterNotice>* 파트 필터는 1지망 기준입니다.</S.FilterNotice>}
      />

      <S.CardGrid>
        {data?.result.interviewAssignmentTimeGroups.map((group) => (
          <div key={group.start} css={{ gap: '14px', display: 'flex', flexDirection: 'column' }}>
            <S.TimeTitle>
              {formatTimeToHourMinute(group.start)} ~ {formatTimeToHourMinute(group.end)}
              <div className="divider" />
            </S.TimeTitle>
            <S.CardWrapper>
              {group.interviewAssignmentSlots.map((applicant) => (
                <EvaluationCard
                  key={applicant.assignmentId}
                  time={formatTimeToHourMinute(applicant.slot.start)}
                  name={applicant.applicant.name}
                  nickname={applicant.applicant.nickname}
                  score={Number(applicant.documentScore)}
                  tags={applicant.appliedParts.map((part) => part.key)}
                  status={applicant.evaluationProgressStatus}
                  canStartEval={canStartEvaluation({
                    serverNow: data.result.serverNow,
                    slotDate: applicant.slot.date,
                    slotStart: applicant.slot.start,
                  })}
                  handleStartEval={() =>
                    onStartEval({
                      id: String(applicant.assignmentId),
                    })
                  }
                />
              ))}
            </S.CardWrapper>
          </div>
        ))}
      </S.CardGrid>
    </S.Container>
  )
}

export default ListView
