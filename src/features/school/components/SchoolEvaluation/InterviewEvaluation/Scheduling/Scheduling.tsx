import type { DragEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { PartType } from '@/features/auth/domain'
import {
  getInterviewSchedulingSummary,
  getInterviewSlotAssignments,
  getInterviewSlots,
} from '@/features/school/domain/api'
import { schoolKeys } from '@/features/school/domain/queryKeys'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import { useGetInterviewSlotApplicants } from '@/features/school/hooks/useRecruitingQueries'
import Search from '@/shared/assets/icons/search.svg?react'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import Loading from '@/shared/ui/common/Loading/Loading'
import Section from '@/shared/ui/common/Section/Section'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import FilterBar from '../../FilterBar/FilterBar'
import ApplicantCard from './ApplicantCard'
import * as S from './Scheduling.style'

const Scheduling = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined)
  const [selectedDateOption, setSelectedDateOption] = useState<Option<string> | undefined>(
    undefined,
  )
  const [selectedPartOption, setSelectedPartOption] = useState<Option<string> | undefined>(
    undefined,
  )
  const queryClient = useQueryClient()
  const { usePostInterviewAssignApplicants, useDeleteInterviewAssignApplicants } =
    useRecruitingMutation()
  const { mutate: assignApplicantsMutate } = usePostInterviewAssignApplicants()
  const { mutate: deleteAssignmentMutate } = useDeleteInterviewAssignApplicants()

  const handleDragStart = (id: string) => (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
  }
  const { data: summaryData, isLoading: isSummaryLoading } = useCustomQuery(
    schoolKeys.getInterviewSchedulingSummary('40'),
    () => getInterviewSchedulingSummary('40'),
    {
      placeholderData: (previous) => previous,
    },
  ) // TODO: 추후 수정 예정

  const dateFallback = summaryData?.result.dateOptions[0]
  const partFallback = summaryData?.result.partOptions[0]?.part
  const dateParam = selectedDateOption?.id ? String(selectedDateOption.id) : dateFallback
  const partParam = (selectedPartOption?.id ?? partFallback) as PartType | 'ALL' | undefined

  const slotDate = dateParam ?? ''
  const slotPart = partParam ?? 'ALL'
  const { data: slotData, isLoading: isSlotsLoading } = useCustomQuery(
    schoolKeys.getInterviewSlots('40', slotDate, slotPart),
    () => getInterviewSlots('40', slotDate, slotPart),
    {
      enabled: Boolean(dateParam) && Boolean(partParam),
      placeholderData: (previous) => previous,
    },
  ) // TODO: 추후 수정 예정

  const resolvedSlotId = selectedTimeSlot ?? slotData?.result.slots[0]?.slotId
  const {
    data: slotApplicantsData,
    isLoading: isSlotApplicantsLoading,
    isFetching,
  } = useGetInterviewSlotApplicants('40', resolvedSlotId) // TODO: 추후 수정 예정
  const { data: assignedData, isLoading: isAssignmentsLoading } = useCustomQuery(
    schoolKeys.getInterviewSlotAssignments('40', resolvedSlotId ?? ''),
    () => getInterviewSlotAssignments('40', resolvedSlotId ?? ''),
    { enabled: Boolean(resolvedSlotId), placeholderData: (previous) => previous },
  ) // TODO: 추후 수정 예정

  const dateOptions: Array<Option<string>> = (summaryData?.result.dateOptions ?? []).map(
    (date) => ({
      label: date,
      id: date,
    }),
  )

  const partOptions: Array<Option<string>> = (summaryData?.result.partOptions ?? []).map(
    (part) => ({
      label: part.label,
      id: part.part,
    }),
  )
  const selectedSlotLabel = useMemo(() => {
    if (!slotData?.result.slots.length) return ''
    const selectedSlot =
      slotData.result.slots.find((slot) => slot.slotId === resolvedSlotId) ??
      slotData.result.slots[0]
    return `${selectedSlot.start} ~ ${selectedSlot.end}`
  }, [resolvedSlotId, slotData?.result.slots])

  useEffect(() => {
    if (!contentRef.current) return
    const element = contentRef.current
    const updateHeight = () => setContentHeight(element.getBoundingClientRect().height)
    updateHeight()
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateHeight)
      observer.observe(element)
      return () => observer.disconnect()
    }
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    if (!resolvedSlotId) return

    assignApplicantsMutate(
      {
        recruitmentId: '40',
        slotId: resolvedSlotId,
        applicationId: id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getInterviewSlotApplicants('40', resolvedSlotId),
          })
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getInterviewSlotAssignments('40', resolvedSlotId),
          })
          if (dateParam && partParam) {
            queryClient.invalidateQueries({
              queryKey: schoolKeys.getInterviewSlots('40', dateParam, partParam),
            })
          }
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getInterviewSchedulingSummary('40'),
          })
        },
      },
    )
    setIsDragOver(false)
  }
  const handleRemoveAssigned = (id: string) => {
    deleteAssignmentMutate(
      { recruitmentId: '40', assignmentId: id },
      {
        onSuccess: () => {
          if (!resolvedSlotId) return
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getInterviewSlotApplicants('40', resolvedSlotId),
          })
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getInterviewSlotAssignments('40', resolvedSlotId),
          })
          if (dateParam && partParam) {
            queryClient.invalidateQueries({
              queryKey: schoolKeys.getInterviewSlots('40', dateParam, partParam),
            })
          }
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getInterviewSchedulingSummary('40'),
          })
        },
      },
    )
  }
  return (
    <S.Wrapper>
      <FilterBar
        leftChild={
          <>
            <Dropdown
              options={dateOptions}
              placeholder="면접 일자"
              value={selectedDateOption ?? dateOptions[0]}
              onChange={(option) => {
                setSelectedDateOption(option)
                setSelectedTimeSlot(undefined)
              }}
              disabled={isSummaryLoading}
              css={{ width: '200px', height: '36px', ...theme.typography.B4.Rg }}
            />
            <Dropdown
              options={partOptions}
              placeholder="전체 파트"
              value={selectedPartOption ?? partOptions[0]}
              onChange={(option) => {
                setSelectedPartOption(option)
                setSelectedTimeSlot(undefined)
              }}
              disabled={isSummaryLoading}
              css={{ width: '200px', height: '36px', ...theme.typography.B4.Rg }}
            />
            <S.SelectionInfo>
              전체 {summaryData?.result.progress.total}명 중{' '}
              {summaryData?.result.progress.scheduled}명 완료
            </S.SelectionInfo>
          </>
        }
        rightChild={<S.Notice>* 파트 필터는 1지망 기준입니다.</S.Notice>}
      />

      <S.MainLayout>
        {/* 좌측 시간대 리스트 */}
        <S.Sidebar
          height={'100%'}
          variant="solid"
          padding={'15px 17px'}
          css={
            contentHeight
              ? {
                  maxHeight: contentHeight,
                  height: contentHeight,
                }
              : undefined
          }
        >
          <S.SectionTitle>시간대별 가능 인원</S.SectionTitle>
          <S.TimeSlotList>
            {(slotData?.result.slots ?? []).map((slot) => (
              <S.TimeSlotItem
                key={slot.slotId}
                isActive={slot.slotId === resolvedSlotId}
                onClick={() => setSelectedTimeSlot(slot.slotId)}
              >
                <span className="time">
                  {slot.start} ~ {slot.end}
                </span>
                <S.CountBadge isCompleted={!slot.done}>
                  {slot.availableCount}명 가능 {slot.done && <S.Circle>✓</S.Circle>}
                </S.CountBadge>
              </S.TimeSlotItem>
            ))}
          </S.TimeSlotList>
        </S.Sidebar>

        {/* 우측 상세 내용 */}
        <S.Content ref={contentRef}>
          <Section
            variant="solid"
            padding={'12px 17px'}
            gap={20}
            css={{
              overflow: 'hidden',
              borderRadius: '6px',
              height: '320px',
              [media.down(theme.breakPoints.desktop)]: { height: 'fit-content' },
            }}
          >
            <S.ContentHeader>
              <S.SectionTitle>{selectedSlotLabel} 지원자 목록</S.SectionTitle>
              <TextField
                type="text"
                autoComplete="none"
                placeholder="닉네임, 이름으로 검색"
                Icon={Search}
                css={{ maxWidth: '320px', height: '36px', padding: '7px 12px' }}
              />
            </S.ContentHeader>

            <S.ApplicantList
              padding={'14px 16px'}
              css={{
                overflowY: 'auto',
                borderRadius: '6px',
              }}
            >
              {(isSummaryLoading ||
                isSlotsLoading ||
                isSlotApplicantsLoading ||
                isAssignmentsLoading ||
                isFetching) && (
                <S.LoadingOverlay>
                  <Loading size={24} label="불러오는 중" labelPlacement="right" />
                </S.LoadingOverlay>
              )}
              {slotApplicantsData?.result.available.map((app, i) => {
                return (
                  <ApplicantCard
                    key={app.applicationId}
                    id={app.applicationId}
                    name={app.name}
                    nickname={app.nickname}
                    tags={[app.firstPart.part, app.secondPart?.part ?? '']}
                    score={app.documentScore}
                    i={i}
                    draggable={true}
                    onDragStart={handleDragStart(app.applicationId)}
                    mode="default"
                  />
                )
              })}
              <S.Divider />
              {slotApplicantsData?.result.alreadyScheduled.map((app, i) => {
                return (
                  <ApplicantCard
                    key={app.applicationId}
                    id={app.assignmentId}
                    name={app.name}
                    nickname={app.nickname}
                    tags={[app.firstPart.part, app.secondPart?.part ?? '']}
                    score={app.documentScore}
                    i={i}
                    draggable={!app.scheduledSlot}
                    onDragStart={undefined}
                    time={`${app.scheduledSlot.date} ${app.scheduledSlot.start} - ${app.scheduledSlot.end}`}
                    mode="assigned"
                  />
                )
              })}
            </S.ApplicantList>
          </Section>

          <S.InterviewerSection variant="solid" padding={'12px 17px'} css={{ borderRadius: '6px' }}>
            <S.ContentHeader>
              <S.SectionTitle>{selectedSlotLabel} 면접자</S.SectionTitle>
              <S.Notice>* 위 목록에서 드래그하고 드롭하여 배치하세요.</S.Notice>
            </S.ContentHeader>
            <S.DropZone
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragOver(true)
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              data-active={isDragOver}
              css={{ backgroundColor: theme.colors.black }}
            >
              {(assignedData?.result.assignments.length ?? 0) === 0 ? (
                <S.DropPlaceholder>드롭하여 배치</S.DropPlaceholder>
              ) : (
                <S.AssignedList>
                  {(assignedData?.result.assignments ?? []).map((app, i) => (
                    <ApplicantCard
                      key={app.applicationId}
                      id={app.assignmentId}
                      name={app.name}
                      tags={[app.firstPart.part, app.secondPart?.part ?? '']}
                      nickname={app.nickname}
                      score={app.documentScore}
                      i={i}
                      mode="assigned"
                      onRemove={handleRemoveAssigned}
                    />
                  ))}
                </S.AssignedList>
              )}
            </S.DropZone>
          </S.InterviewerSection>
        </S.Content>
      </S.MainLayout>
    </S.Wrapper>
  )
}

export default Scheduling
