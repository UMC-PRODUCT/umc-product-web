import type { DragEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Control, UseFormTrigger } from 'react-hook-form'
import { useFieldArray, useWatch } from 'react-hook-form'

import Plus from '@/shared/assets/icons/plus.svg?react'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import MakeQuestion from '../MakeQuestion/MakeQuestion'
import * as S from './QuestionList.style'

type QuestionItem = RecruitingForms['pages'][number]['questions'][number]
type QuestionListValue = Array<QuestionItem | undefined>

type QuestionListProps = {
  control: Control<RecruitingForms>
  fieldArrayName: string
  namePrefixBase: string
  getNextQuestionId: () => number
  trigger: UseFormTrigger<RecruitingForms>
  hasTouched: boolean
  isLocked?: boolean
}

const QuestionList = ({
  control,
  fieldArrayName,
  namePrefixBase,
  getNextQuestionId,
  trigger,
  hasTouched,
  isLocked = false,
}: QuestionListProps) => {
  const draggingId = useRef<number | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)
  const [placeholderHeight, setPlaceholderHeight] = useState<number>(0)
  const draggingIndexRef = useRef<number | null>(null)
  const placeholderHeightRef = useRef<number>(0)
  const isFirstRender = useRef(true)
  const prevQuestionsSignatureRef = useRef<string>('')
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: fieldArrayName as never,
  })
  const watchedQuestions = useWatch({
    control,
    name: fieldArrayName as never,
  }) as QuestionListValue | undefined
  const normalizedQuestions = useMemo<QuestionListValue>(
    () => (Array.isArray(watchedQuestions) ? watchedQuestions : []),
    [watchedQuestions],
  )
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevQuestionsSignatureRef.current = JSON.stringify(normalizedQuestions)
      return
    }
    if (!hasTouched) return
    const signature = JSON.stringify(normalizedQuestions)
    if (signature === prevQuestionsSignatureRef.current) return
    prevQuestionsSignatureRef.current = signature
    void trigger(fieldArrayName as never)
  }, [fieldArrayName, hasTouched, trigger, normalizedQuestions])

  const handleAddQuestion = () => {
    if (isLocked) return
    append({
      questionId: getNextQuestionId(),
      question: '',
      type: 'LONG_TEXT',
      necessary: true,
      options: [],
      partSinglePick: false,
      isPartQuestion: false,
    })
  }

  const handleDeleteQuestion = (index: number) => {
    if (isLocked) return
    remove(index)
  }

  const handleDragStart = (index: number) => (event: DragEvent<HTMLDivElement>) => {
    if (isLocked) return
    draggingId.current = index
    draggingIndexRef.current = index
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
    const cardNode = cardRefs.current[index]
    if (cardNode) {
      placeholderHeightRef.current = cardNode.getBoundingClientRect().height
      event.dataTransfer.setDragImage(cardNode, 0, 0)
    }
  }

  const handleDragEnd = () => {
    if (isLocked) return
    draggingId.current = null
    draggingIndexRef.current = null
    placeholderHeightRef.current = 0
    setDraggingIndex(null)
    setPlaceholderIndex(null)
    setPlaceholderHeight(0)
  }

  const handleDragOver = (index: number) => (event: DragEvent<HTMLDivElement>) => {
    if (isLocked) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    if (draggingIndex === null && draggingIndexRef.current !== null) {
      setDraggingIndex(draggingIndexRef.current)
    }
    if (placeholderHeight === 0 && placeholderHeightRef.current > 0) {
      setPlaceholderHeight(placeholderHeightRef.current)
    }
    if (draggingIndexRef.current === null || index === draggingIndexRef.current) return
    setPlaceholderIndex(index)
  }

  const handleDrop = (targetIndex: number) => (event: DragEvent<HTMLDivElement>) => {
    if (isLocked) return
    event.preventDefault()
    const sourceIndex = draggingId.current
    draggingId.current = null
    if (sourceIndex === null || sourceIndex === targetIndex) return
    move(sourceIndex, targetIndex)
    setPlaceholderIndex(null)
  }

  return (
    <Flex flexDirection="column" gap={18}>
      {fields.map((question, index) => {
        const currentQuestion = normalizedQuestions[index]
        const isPartQuestion = currentQuestion ? currentQuestion.isPartQuestion : false
        return (
          <div
            key={question.id}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
            css={{ width: '100%' }}
          >
            {placeholderIndex === index && draggingIndex !== null ? (
              <S.DragPlaceholder $height={placeholderHeight} />
            ) : null}
            <div
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              css={{
                width: '100%',
                transition: 'transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease',
                transform: draggingIndex === index ? 'scale(0.98)' : 'translateZ(0)',
                opacity: draggingIndex === index ? 0.7 : 1,
                boxShadow: draggingIndex === index ? '0 8px 20px rgba(0, 0, 0, 0.12)' : 'none',
              }}
            >
              <MakeQuestion
                index={index}
                control={control}
                namePrefix={`${namePrefixBase}.${index}`}
                onDelete={() => handleDeleteQuestion(index)}
                canDelete={!isPartQuestion && !isLocked}
                isLocked={isLocked}
                dragHandleProps={{
                  draggable: !isLocked,
                  onDragStart: handleDragStart(index),
                  onDragEnd: handleDragEnd,
                }}
              />
            </div>
          </div>
        )
      })}
      <Section
        variant="dashed"
        flexDirection="row"
        gap={6}
        justifyContent="center"
        css={{
          color: theme.colors.gray[500],
          cursor: isLocked ? 'not-allowed' : 'pointer',
          opacity: isLocked ? 0.5 : 1,
        }}
        onClick={isLocked ? undefined : handleAddQuestion}
      >
        <Plus />
        문항 추가하기
      </Section>
    </Flex>
  )
}
export default QuestionList
