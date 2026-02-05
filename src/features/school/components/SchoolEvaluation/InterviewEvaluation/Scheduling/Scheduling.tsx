import type { DragEvent } from 'react'
import { useState } from 'react'

import { APPLICANTS, TIME_SLOTS } from '@/features/school/mocks/scheduling'
import Search from '@/shared/assets/icons/search.svg?react'
import { theme } from '@/shared/styles/theme'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import Section from '@/shared/ui/common/Section/Section'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import FilterBar from '../../FilterBar/FilterBar'
import ApplicantCard from './ApplicantCard'
import * as S from './Scheduling.style'

const Scheduling = () => {
  const [availableApplicants, setAvailableApplicants] = useState(APPLICANTS.default)
  const [assignedApplicants, setAssignedApplicants] = useState<typeof APPLICANTS.assigned>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragStart = (id: string) => (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return

    const applicant = availableApplicants.find((item) => item.id === id)
    if (!applicant) return

    setAvailableApplicants((prev) => prev.filter((item) => item.id !== id))
    setAssignedApplicants((prev) => [
      ...prev,
      {
        id: applicant.id,
        name: applicant.name,
        nickname: applicant.nickname,
        tags: applicant.tags,
        score: applicant.score,
        time: '2026.02.03 (화) 13:30 - 14:00',
      },
    ])
    setIsDragOver(false)
  }
  return (
    <div
      style={{
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      <FilterBar
        leftChild={
          <>
            <Dropdown
              options={[{ label: '2026.01.20 (화)', id: 0 }]}
              placeholder="면접 일자"
              css={{ width: '200px', height: '36px', ...theme.typography.B4.Rg }}
            />
            <Dropdown
              options={[{ label: '전체 파트', id: 0 }]}
              placeholder="전체 파트"
              css={{ width: '200px', height: '36px', ...theme.typography.B4.Rg }}
            />
            <S.SelectionInfo>전체 120명 중 32명 완료</S.SelectionInfo>
          </>
        }
        rightChild={<S.Notice>* 파트 필터는 1지망 기준입니다.</S.Notice>}
      />

      <S.MainLayout>
        {/* 좌측 시간대 리스트 */}
        <S.Sidebar height={'100%'} width={360} variant="solid" padding={'15px 17px'}>
          <S.SectionTitle>시간대별 가능 인원</S.SectionTitle>
          <S.TimeSlotList>
            {TIME_SLOTS.map((slot) => (
              <S.TimeSlotItem key={slot.time} isActive={slot.selected}>
                <span className="time">{slot.time}</span>
                <S.CountBadge isCompleted={slot.completed}>
                  {slot.count}명 가능 {slot.completed && <S.Circle>✓</S.Circle>}
                </S.CountBadge>
              </S.TimeSlotItem>
            ))}
          </S.TimeSlotList>
        </S.Sidebar>

        {/* 우측 상세 내용 */}
        <S.Content>
          <Section
            variant="solid"
            padding={'12px 17px'}
            gap={20}
            height={320}
            css={{ overflow: 'hidden', borderRadius: '6px' }}
          >
            <S.ContentHeader>
              <S.SectionTitle>16:00 - 16:30 지원자 목록</S.SectionTitle>
              <TextField
                type="text"
                autoComplete="none"
                placeholder="닉네임, 이름으로 검색"
                Icon={Search}
                css={{ width: '320px', height: '36px', padding: '7px 12px' }}
              />
            </S.ContentHeader>

            <S.ApplicantList
              padding={'14px 16px'}
              height={320}
              css={{ overflowY: 'auto', borderRadius: '6px' }}
            >
              {availableApplicants.map((app, i) => {
                return (
                  <ApplicantCard
                    key={app.id}
                    name={app.name}
                    nickname={app.nickname}
                    tags={app.tags}
                    score={app.score}
                    i={i}
                    draggable={!app.time}
                    onDragStart={!app.time ? handleDragStart(app.id) : undefined}
                    time={app.time}
                    mode="default"
                  />
                )
              })}
              <S.Divider />
              {assignedApplicants.map((app, i) => {
                return (
                  <ApplicantCard
                    key={app.id}
                    name={app.name}
                    nickname={app.nickname}
                    tags={app.tags}
                    score={app.score}
                    i={i}
                    draggable={!app.time}
                    onDragStart={!app.time ? handleDragStart(app.id) : undefined}
                    time={app.time}
                    mode="assigned"
                  />
                )
              })}
            </S.ApplicantList>
          </Section>

          <S.InterviewerSection variant="solid" padding={'12px 17px'} css={{ borderRadius: '6px' }}>
            <S.ContentHeader>
              <S.SectionTitle>16:00 - 16:30 면접자</S.SectionTitle>
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
              {assignedApplicants.length === 0 ? (
                <S.DropPlaceholder>드롭하여 배치</S.DropPlaceholder>
              ) : (
                <S.AssignedList>
                  {assignedApplicants.map((app, i) => (
                    <ApplicantCard
                      key={app.id}
                      name={app.name}
                      tags={app.tags}
                      nickname={app.nickname}
                      score={app.score}
                      i={i}
                      mode="assigned"
                    />
                  ))}
                </S.AssignedList>
              )}
            </S.DropZone>
          </S.InterviewerSection>
        </S.Content>
      </S.MainLayout>
    </div>
  )
}

export default Scheduling
