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

const formatTimeToHourMinute = (value: string) => {
  const [hour = '', minute = ''] = value.split(':')
  if (!hour || !minute) return value
  return `${hour}:${minute}`
}

const ListView = ({ onStartEval }: { onStartEval: (user: { id: string }) => void }) => {
  const recruitmentId = '12'
  const { data: optionsData } = useGetInterviewEvaluationOptions(recruitmentId)
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null)
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

  const resolvedDateId = selectedDateId ?? dateOptions[0]?.id
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
              onChange={(option) => setSelectedDateId(String(option.id))}
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
