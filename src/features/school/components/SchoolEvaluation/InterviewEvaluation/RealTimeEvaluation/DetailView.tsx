import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import AdditionalQuestionModal from '@/features/school/components/modals/AdditionalQuestionModal/AdditionalQuestionModal'
import ApplicationModal from '@/features/school/components/modals/ApplicationModal/ApplicationModal'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import { useGetInterviewEvaluationView } from '@/features/school/hooks/useRecruitingQueries'
import Plus from '@/shared/assets/icons/plus.svg?react'
import Search from '@/shared/assets/icons/search.svg?react'
import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { schoolKeys } from '@/shared/queryKeys'
import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import Section from '@/shared/ui/common/Section/Section'

import EvaluationStatus from '../../EvaluationStatus/EvaluationStatus'
import FilterBar from '../../FilterBar/FilterBar'
import MyEvaluation from '../../MyEvaluation/MyEvaluation'
import * as S from './index.style'
import QuestionItem from './QuestionItem'

const scrollParentsToTop = (element: HTMLElement | null) => {
  if (!element) return

  let parent: HTMLElement | null = element
  while (parent) {
    parent.scrollTop = 0
    parent = parent.parentElement
  }

  window.scrollTo({ top: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

const DetailView = ({
  recruitmentId,
  selectedUser,
  onBack,
}: {
  recruitmentId: string
  selectedUser: {
    id: string
    canSubmitInterview: boolean
  }
  onBack: () => void
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState<{
    isOpen: boolean
    id: string
    modalName: 'application' | 'additionalQuestion' | null
  }>({
    isOpen: false,
    id: '',
    modalName: null,
  })
  const [editingLiveQuestion, setEditingLiveQuestion] = useState<{
    liveQuestionId: string
    text: string
  } | null>(null)
  const queryClient = useQueryClient()

  const { useDeleteInterviewLiveQuestion } = useRecruitingMutation()
  const { mutate: deleteInterviewLiveQuestion } = useDeleteInterviewLiveQuestion()

  const [questionType, setQuestionType] = useState<
    'common' | 'firstChoice' | 'secondChoice' | 'live'
  >('common')

  const { data, isError, error } = useGetInterviewEvaluationView(recruitmentId, selectedUser.id)
  const applicant = data?.result.application.applicant
  const appliedParts = data?.result.application.appliedParts ?? []
  const errorStatus = (error as { response?: { status?: number } } | null)?.response?.status

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      scrollParentsToTop(containerRef.current)
    })
    return () => cancelAnimationFrame(rafId)
  }, [])

  if (isError && errorStatus === 404) {
    return (
      <S.Container>
        <ErrorPage
          title="지원자 정보를 찾을 수 없습니다."
          description="존재하지 않는 지원자입니다."
          retryLabel="뒤로가기"
          onRetry={onBack}
        />
      </S.Container>
    )
  }

  if (isError && errorStatus === 403) {
    return (
      <S.Container>
        <ErrorPage
          title="평가 가능한 시간이 아닙니다."
          description="해당 슬롯 시작 이후에 평가할 수 있습니다."
          retryLabel="뒤로가기"
          onRetry={onBack}
        />
      </S.Container>
    )
  }

  const onStartEdit = (item: { liveQuestionId: string; text: string }) => {
    setEditingLiveQuestion({ liveQuestionId: item.liveQuestionId, text: item.text })
    setModalOpen({
      isOpen: true,
      id: selectedUser.id,
      modalName: 'additionalQuestion',
    })
  }

  const handleRemoveQuestion = (liveQuestionId: string) => {
    deleteInterviewLiveQuestion(
      {
        recruitmentId,
        assignmentId: selectedUser.id,
        liveQuestionId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: schoolKeys.evaluation.interview.getView(recruitmentId, selectedUser.id),
          })
          queryClient.invalidateQueries({
            queryKey: schoolKeys.evaluation.interview.getLiveQuestions(
              recruitmentId,
              selectedUser.id,
            ),
          })
        },
      },
    )
  }

  return (
    <S.Container ref={containerRef}>
      <S.DetailWrapper>
        <FilterBar
          leftChild={
            <S.UserInfo>
              <h1>{applicant ? `${applicant.nickname}/${applicant.name}` : '-'}</h1>
              {appliedParts.map((part) => (
                <Badge
                  key={`${part.priority}-${part.key}`}
                  tone="lime"
                  variant="outline"
                  typo="B5.Md"
                >
                  {PART_TYPE_TO_SMALL_PART[part.key]}
                </Badge>
              ))}
            </S.UserInfo>
          }
          rightChild={
            <S.TopActions>
              <Button
                tone="gray"
                variant="solid"
                label="지원서 조회"
                Icon={Search}
                typo="B4.Sb"
                css={{ padding: '5.5px 14px', width: '122px' }}
                onClick={() =>
                  setModalOpen({ isOpen: true, id: selectedUser.id, modalName: 'application' })
                }
              />
              <Button
                tone="lime"
                variant="outline"
                typo="B4.Sb"
                label=" ← 뒤로가기"
                onClick={onBack}
                css={{ padding: '5.5px 14px', width: '122px' }}
              />
            </S.TopActions>
          }
        />

        <S.MainContent>
          {/* 왼쪽: 질문지 섹션 */}
          <S.ContentBox>
            <S.Header>
              <S.SubTitle>면접 질문지</S.SubTitle>
              <S.ToggleGroup>
                <S.ToggleButton
                  $active={questionType === 'common'}
                  onClick={() => setQuestionType('common')}
                >
                  공통
                </S.ToggleButton>
                <S.ToggleButton
                  $active={questionType === 'firstChoice'}
                  onClick={() => setQuestionType('firstChoice')}
                >
                  1지망
                </S.ToggleButton>
                {data?.result.application.appliedParts &&
                  data.result.application.appliedParts.length > 1 && (
                    <S.ToggleButton
                      $active={questionType === 'secondChoice'}
                      onClick={() => setQuestionType('secondChoice')}
                    >
                      2지망
                    </S.ToggleButton>
                  )}
                <S.ToggleButton
                  $active={questionType === 'live'}
                  onClick={() => setQuestionType('live')}
                >
                  추가 질문
                </S.ToggleButton>
              </S.ToggleGroup>
            </S.Header>
            <S.Content>
              {questionType !== 'live' &&
                data?.result.questions[questionType].map((item, idx) => (
                  <QuestionItem
                    key={item.questionId}
                    index={idx + 1}
                    question={item.text}
                    onStartEdit={() => undefined}
                    type={questionType}
                    editable={false}
                    onRemove={() => undefined}
                  />
                ))}
              {questionType === 'live' &&
                data?.result.questions[questionType].map((item, idx) => (
                  <QuestionItem
                    key={item.liveQuestionId}
                    index={idx + 1}
                    question={item.text}
                    ownerName={item.createdBy.nickname + '/' + item.createdBy.name}
                    onStartEdit={() =>
                      onStartEdit({ liveQuestionId: item.liveQuestionId, text: item.text })
                    }
                    type={questionType}
                    editable={item.canEdit}
                    onRemove={() => handleRemoveQuestion(item.liveQuestionId)}
                  />
                ))}
              {questionType === 'live' && (
                <Section
                  variant="dashed"
                  flexDirection="row"
                  gap={6}
                  justifyContent="center"
                  css={{
                    color: theme.colors.gray[500],
                    cursor: 'pointer',
                    borderColor: '#4e4e4e',
                  }}
                  onClick={() =>
                    (() => {
                      setEditingLiveQuestion(null)
                      setModalOpen({
                        isOpen: true,
                        id: selectedUser.id,
                        modalName: 'additionalQuestion',
                      })
                    })()
                  }
                >
                  <Plus />
                  문항 추가하기
                </Section>
              )}
            </S.Content>
          </S.ContentBox>

          {/* 오른쪽: 현황 및 입력 섹션 */}
          <S.SideColumn>
            <EvaluationStatus
              selectedUserId={selectedUser.id}
              recruitingId={recruitmentId}
              mode="interview"
            />
            <MyEvaluation
              selectedUserId={selectedUser.id}
              recruitingId={recruitmentId}
              mode="interview"
            />
          </S.SideColumn>
        </S.MainContent>
      </S.DetailWrapper>

      {modalOpen.isOpen && modalOpen.modalName === 'application' && data?.result.assignmentId && (
        <ApplicationModal
          assignmentId={data.result.assignmentId}
          recruitmentId={recruitmentId}
          onClose={() =>
            setModalOpen({
              id: '',
              isOpen: false,
              modalName: null,
            })
          }
        />
      )}
      {modalOpen.isOpen && modalOpen.modalName === 'additionalQuestion' && (
        <AdditionalQuestionModal
          recruitmentId={recruitmentId}
          assignmentId={modalOpen.id}
          liveQuestionId={editingLiveQuestion?.liveQuestionId}
          initialText={editingLiveQuestion?.text}
          onClose={() =>
            (() => {
              setEditingLiveQuestion(null)
              setModalOpen({
                id: '',
                isOpen: false,
                modalName: null,
              })
            })()
          }
        />
      )}
    </S.Container>
  )
}

export default DetailView
