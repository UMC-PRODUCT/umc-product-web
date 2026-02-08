import type { DragEvent } from 'react'
import { useState } from 'react'

import type { PartType } from '@/features/auth/domain'
import { PART_CONFIG, PART_LIST } from '@/features/auth/domain/constants'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import Label from '@/shared/ui/common/Label'
import Section from '@/shared/ui/common/Section/Section'
import LabelLongTextField from '@/shared/ui/form/LabelLongTextField/LabelLongTextField'

import FilterBar from '../../FilterBar/FilterBar'
import QuestionCard from '../../QuestionCard/QuestionCard'
import * as S from './InterviewQuestions.style'

type PartKey = PartType | 'common'
type QuestionItem = { id: string; text: string }
type PartState = { status: 'draft' | 'done'; items: Array<QuestionItem> }

const buildInitialQuestions = (): Record<PartKey, PartState> => {
  const base = PART_LIST.reduce<Record<PartType, PartState>>(
    (acc, part) => {
      acc[part] = {
        status: 'draft',
        items: [],
      }
      return acc
    },
    {} as Record<PartType, PartState>,
  )

  return {
    common: {
      status: 'draft',
      items: [
        { id: 'c-1', text: '팀 내에서 갈등이 발생했을 때 어떻게 해결했나요?' },
        { id: 'c-2', text: '최근에 몰입했던 프로젝트를 소개해주세요.' },
        { id: 'c-3', text: 'UMC에 지원한 이유와 기대하는 점을 알려주세요.' },
      ],
    },
    ...base,
  }
}

const PART_OPTIONS = [
  { id: 'common', label: '공통' },
  ...PART_LIST.map((part) => ({ id: part, label: PART_CONFIG[part].label })),
]

const InterviewQuestions = () => {
  const [selectedPart, setSelectedPart] = useState<PartKey>('common')
  const [questionByPart, setQuestionByPart] =
    useState<Record<PartKey, PartState>>(buildInitialQuestions())
  const [draftQuestion, setDraftQuestion] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)

  const selectedState = questionByPart[selectedPart]
  const isSelectedPartComplete = selectedState.status === 'done'
  const isCompletionToggleDisabled = selectedState.items.length === 0
  const selectedLabel = selectedPart === 'common' ? '공통' : PART_CONFIG[selectedPart].label

  const onChangeStatus = (isComplete: boolean) => {
    setQuestionByPart((prev) => ({
      ...prev,
      [selectedPart]: {
        ...prev[selectedPart],
        status: isComplete ? 'done' : 'draft',
      },
    }))
  }

  const handleAddQuestion = () => {
    const trimmed = draftQuestion.trim()
    if (!trimmed) return
    const newItem: QuestionItem = {
      id: `${selectedPart}-${Date.now()}`,
      text: trimmed,
    }
    setQuestionByPart((prev) => ({
      ...prev,
      [selectedPart]: {
        ...prev[selectedPart],
        items: [...prev[selectedPart].items, newItem],
      },
    }))
    setDraftQuestion('')
  }

  const handleRemoveQuestion = (id: string) => {
    setQuestionByPart((prev) => ({
      ...prev,
      [selectedPart]: {
        ...prev[selectedPart],
        items: prev[selectedPart].items.filter((item) => item.id !== id),
      },
    }))
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
    setQuestionByPart((prev) => ({
      ...prev,
      [selectedPart]: {
        ...prev[selectedPart],
        items: prev[selectedPart].items.map((item) =>
          item.id === editingId ? { ...item, text: trimmed } : item,
        ),
      },
    }))
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
    setQuestionByPart((prev) => {
      const items = [...prev[selectedPart].items]
      const [moved] = items.splice(sourceIndex, 1)
      items.splice(targetIndex, 0, moved)
      return {
        ...prev,
        [selectedPart]: {
          ...prev[selectedPart],
          items,
        },
      }
    })
    setDraggingIndex(null)
    setPlaceholderIndex(null)
  }

  return (
    <S.Wrapper>
      <FilterBar
        leftChild={
          <>
            <Dropdown
              options={PART_OPTIONS}
              value={PART_OPTIONS.find((option) => option.id === selectedPart)}
              onChange={(option) => setSelectedPart(option.id as PartKey)}
              placeholder="파트 선택"
              css={{ height: '40px' }}
            />
            <S.SelectionInfo>
              {selectedLabel} 질문 총 {selectedState.items.length}개
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
              onClick={isCompletionToggleDisabled ? undefined : () => onChangeStatus(false)}
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
              onClick={isCompletionToggleDisabled ? undefined : () => onChangeStatus(true)}
            >
              작성 완료
            </Badge>
          </>
        }
      />
      <S.GridWrapper>
        <Section variant="outline" padding={'15px 17px'} gap={14} alignItems="flex-start">
          <Label label="등록된 질문 목록" />
          {selectedState.items.length === 0 ? (
            <S.EmptyState>등록된 질문이 없습니다.</S.EmptyState>
          ) : (
            <S.QuestionList>
              {selectedState.items.map((question, index) => (
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

export default InterviewQuestions
