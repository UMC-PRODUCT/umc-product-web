import type { DragEvent } from 'react'
import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { PartType } from '@/features/auth/domain'
import { PART_CONFIG } from '@/features/auth/domain/constants'
import { schoolKeys } from '@/features/school/domain/queryKeys'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import {
  useGetAvailableInterviewParts,
  useGetInterviewQuestions,
} from '@/features/school/hooks/useRecruitingQueries'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import Label from '@/shared/ui/common/Label'
import Loading from '@/shared/ui/common/Loading/Loading'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import LabelLongTextField from '@/shared/ui/form/LabelLongTextField/LabelLongTextField'

import FilterBar from '../../FilterBar/FilterBar'
import QuestionCard from '../../QuestionCard/QuestionCard'
import * as S from './InterviewQuestions.style'

type PartKey = PartType | 'COMMON'
type QuestionItem = { id: string; text: string }

const InterviewQuestionsContent = () => {
  const recruitmentId = '40' // TODO: 추후 수정 예정
  const queryClient = useQueryClient()
  const {
    usePostInterviewQuestion,
    usePatchInterviewQuestion,
    usePatchInterviewQuestionOrder,
    useDeleteInterviewQuestion,
  } = useRecruitingMutation()
  const { mutate: postQuestion } = usePostInterviewQuestion()
  const { mutate: patchQuestion } = usePatchInterviewQuestion()
  const { mutate: patchOrder } = usePatchInterviewQuestionOrder()
  const { mutate: deleteQuestion } = useDeleteInterviewQuestion()

  const [selectedPart, setSelectedPart] = useState<PartKey>('COMMON')
  const [draftQuestion, setDraftQuestion] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)

  const selectedLabel = selectedPart === 'COMMON' ? '공통' : PART_CONFIG[selectedPart].label
  const { data: availablePartsData } = useGetAvailableInterviewParts(recruitmentId)
  const { data: interviewQuestionData, isLoading: isInterviewQuestionsLoading } =
    useGetInterviewQuestions(recruitmentId, selectedPart)
  const availableOptions = useMemo(
    () =>
      availablePartsData.result.parts.map((part) => ({
        id: part.key,
        label: part.key === 'COMMON' ? '공통' : PART_CONFIG[part.key].label,
      })),
    [availablePartsData.result.parts],
  )
  const serverItems = useMemo(() => {
    const questions = interviewQuestionData?.result.questions ?? []
    if (questions.length === 0) return []
    return questions
      .slice()
      .sort((a, b) => Number(a.orderNo) - Number(b.orderNo))
      .map((question) => ({
        id: question.questionId,
        text: question.questionText,
      }))
  }, [interviewQuestionData?.result.questions])

  const selectedItems = serverItems
  const [isSelectedPartComplete, setIsSelectedPartComplete] = useState(false)
  const isCompletionToggleDisabled = selectedItems.length === 0

  const invalidateQuestions = () => {
    queryClient.invalidateQueries({
      queryKey: schoolKeys.getInterviewQuestions(recruitmentId, selectedPart).queryKey,
    })
  }

  const handleAddQuestion = () => {
    const trimmed = draftQuestion.trim()
    if (!trimmed) return
    postQuestion(
      {
        recruitmentId,
        requestBody: { partKey: selectedPart, questionText: trimmed },
      },
      { onSuccess: invalidateQuestions },
    )
    setDraftQuestion('')
  }

  const handleRemoveQuestion = (id: string) => {
    deleteQuestion({ recruitmentId, questionId: id }, { onSuccess: invalidateQuestions })
  }

  const handleStartEdit = (question: QuestionItem) => {
    setEditingId(question.id)
    setEditingText(question.text)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const handleSaveEdit = () => {
    if (!editingId) return
    const trimmed = editingText.trim()
    if (!trimmed) return
    patchQuestion(
      {
        recruitmentId,
        questionId: editingId,
        requestBody: { questionText: trimmed },
      },
      { onSuccess: invalidateQuestions },
    )
    setEditingId(null)
    setEditingText('')
  }

  const handleDragStart = (index: number) => (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
    setDraggingIndex(index)
  }

  const handleDragEnd = () => {
    setDraggingIndex(null)
    setPlaceholderIndex(null)
  }

  const handleDragOver = (index: number) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    if (draggingIndex === null) {
      const sourceIndex = Number(event.dataTransfer.getData('text/plain'))
      if (!Number.isNaN(sourceIndex)) {
        setDraggingIndex(sourceIndex)
      }
    }
    if (draggingIndex === null || index === draggingIndex) return
    setPlaceholderIndex(index)
  }

  const handleDrop = (targetIndex: number) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const sourceIndex = Number(event.dataTransfer.getData('text/plain'))
    if (Number.isNaN(sourceIndex) || sourceIndex === targetIndex) return
    const currentItems = [...selectedItems]
    const [moved] = currentItems.splice(sourceIndex, 1)
    currentItems.splice(targetIndex, 0, moved)
    patchOrder(
      {
        recruitmentId,
        requestBody: {
          partKey: selectedPart,
          orderedQuestionIds: currentItems.map((item) => item.id),
        },
      },
      { onSuccess: invalidateQuestions },
    )
    setDraggingIndex(null)
    setPlaceholderIndex(null)
  }

  return (
    <S.Wrapper>
      <FilterBar
        leftChild={
          <>
            <Dropdown
              options={availableOptions}
              value={availableOptions.find((option) => option.id === selectedPart)}
              onChange={(option) => setSelectedPart(option.id as PartKey)}
              placeholder="파트 선택"
              css={{ height: '40px' }}
            />
            <S.SelectionInfo>
              {selectedLabel} 질문 총 {selectedItems.length}개
            </S.SelectionInfo>
          </>
        }
        rightChild={
          <>
            <Badge
              typo="B4.Sb"
              tone={'gray'}
              variant={isSelectedPartComplete ? 'outline' : 'solid'}
              css={{
                padding: '4px 14px',
                cursor: !isCompletionToggleDisabled ? 'pointer' : 'default',
              }}
              onClick={
                isCompletionToggleDisabled ? undefined : () => setIsSelectedPartComplete(false)
              }
            >
              작성 중
            </Badge>
            <Badge
              typo="B4.Sb"
              tone={'gray'}
              variant={isSelectedPartComplete ? 'solid' : 'outline'}
              css={{
                padding: '4px 14px',
                cursor: !isCompletionToggleDisabled ? 'pointer' : 'default',
              }}
              onClick={
                isCompletionToggleDisabled ? undefined : () => setIsSelectedPartComplete(true)
              }
            >
              작성 완료
            </Badge>
          </>
        }
      />
      <S.GridWrapper>
        <Section variant="outline" padding={'15px 17px'} gap={14} alignItems="flex-start">
          <Label label="등록된 질문 목록" />
          {isInterviewQuestionsLoading && selectedItems.length === 0 ? (
            <S.EmptyState>
              <Loading size={20} label="불러오는 중" labelPlacement="right" />
            </S.EmptyState>
          ) : selectedItems.length === 0 ? (
            <S.EmptyState>등록된 질문이 없습니다.</S.EmptyState>
          ) : (
            <S.QuestionList>
              {selectedItems.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={index}
                  placeholderIndex={placeholderIndex}
                  draggingIndex={draggingIndex}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                  handleDragStart={handleDragStart}
                  handleDragEnd={handleDragEnd}
                  handleRemoveQuestion={handleRemoveQuestion}
                  isEditing={editingId === question.id}
                  editingText={editingText}
                  onChangeEditText={setEditingText}
                  onStartEdit={() => handleStartEdit(question)}
                  onCancelEdit={handleCancelEdit}
                  onSaveEdit={handleSaveEdit}
                />
              ))}
            </S.QuestionList>
          )}
        </Section>
        <Section variant="outline" padding={'15px 17px'} gap={14}>
          <LabelLongTextField
            placeholder="질문 내용을 작성해주세요"
            label="질문 작성"
            necessary={false}
            value={draftQuestion}
            onChange={setDraftQuestion}
          />
          <Button
            tone="lime"
            label="질문 등록"
            onClick={handleAddQuestion}
            disabled={!draftQuestion.trim()}
            css={{ width: 'fit-content', padding: '6px 18px', marginLeft: 'auto' }}
          />
        </Section>
      </S.GridWrapper>
    </S.Wrapper>
  )
}

const InterviewQuestions = () => {
  return (
    <AsyncBoundary fallback={<SuspenseFallback label="면접 질문을 불러오는 중입니다." />}>
      <InterviewQuestionsContent />
    </AsyncBoundary>
  )
}

export default InterviewQuestions
