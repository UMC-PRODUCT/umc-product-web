import { useMemo, useState } from 'react'

import type { FinalStatusType } from '@/features/apply/domain'
import type { PartType } from '@/features/auth/domain'
import {
  useGetInterviewAssignments,
  useGetInterviewEvaluationOptions,
} from '@/features/school/hooks/useRecruitingQueries'
import { Dropdown } from '@/shared/ui/common/Dropdown'

import FilterBar from '../../FilterBar/FilterBar'
import EvaluationCard from '../EvaluationCard/EvaluationCard'
import * as S from './index.style'

const ListView = ({
  onStartEval,
}: {
  onStartEval: (user: { id: string; name: string }) => void
}) => {
  const recruitmentId = '40'
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

  const groupedSlots = useMemo(() => {
    const slots = data?.result.interviewAssignmentSlots ?? []
    const grouped = new Map<string, { timeLabel: string; applicants: typeof slots }>()

    slots.forEach((slot) => {
      const timeLabel = `${slot.slot.start} ~ ${slot.slot.end}`
      const slotKey = String(slot.slot.slotId)
      const existing = grouped.get(slotKey)
      if (existing) {
        existing.applicants.push(slot)
      } else {
        grouped.set(slotKey, { timeLabel, applicants: [slot] })
      }
    })

    return Array.from(grouped.entries()).map(([slotId, group]) => ({
      slotId,
      ...group,
    }))
  }, [data?.result.interviewAssignmentSlots])

  const mapStatus = (status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED'): FinalStatusType => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'EVALUATING'
      case 'COMPLETED':
        return 'PASSED'
      default:
        return 'PENDING'
    }
  }

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
        {groupedSlots.map((group) => (
          <div key={group.slotId} css={{ gap: '14px', display: 'flex', flexDirection: 'column' }}>
            <S.TimeTitle>
              {group.timeLabel}
              <div className="divider" />
            </S.TimeTitle>
            <S.CardWrapper>
              {group.applicants.map((applicant) => (
                <EvaluationCard
                  key={applicant.assignmentId}
                  time={group.timeLabel}
                  name={applicant.applicant.name}
                  nickname={applicant.applicant.nickname}
                  score={Number(applicant.documentScore)}
                  tags={applicant.appliedParts.map((part) => part.key as PartType)}
                  status={mapStatus(applicant.evaluationProgressStatus)}
                  handleStartEval={() =>
                    onStartEval({
                      id: String(applicant.assignmentId),
                      name: applicant.applicant.name,
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
