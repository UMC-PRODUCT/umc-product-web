import type { DragEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import type { Control, UseFormTrigger } from 'react-hook-form'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'

import Plus from '@/shared/assets/icons/plus.svg?react'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'
import Navigation from '@/shared/ui/common/Navigation/Navigation'
import Section from '@/shared/ui/common/Section/Section'

import MakeQuestion from '../MakeQuestion/MakeQuestion'
import * as Q from '../MakeQuestion/MakeQuestion.style'
import RecuritingPageNavigator from '../RecruitingPageNavigator/RecruitingPageNavigator'
import * as S from './common'

const PAGE_LIST = [1, 2, 3]

type QuestionListProps = {
  control: Control<RecruitingForms>
  pageIndex: number
  getNextQuestionId: () => number
  trigger: UseFormTrigger<RecruitingForms>
}

const QuestionList = ({ control, pageIndex, getNextQuestionId, trigger }: QuestionListProps) => {
  const draggingId = useRef<number | null>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)
  const [placeholderHeight, setPlaceholderHeight] = useState<number>(0)
  const draggingIndexRef = useRef<number | null>(null)
  const placeholderHeightRef = useRef<number>(0)
  const isFirstRender = useRef(true)
  const fieldArrayName = `questionPages.${pageIndex}.questions` as const
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: fieldArrayName,
  })
  const { touchedFields } = useFormState({ control })
  const watchedQuestions = useWatch({
    control,
    name: fieldArrayName,
  })
  const hasTouchedPageQuestions = Boolean(
    (
      touchedFields as unknown as {
        questionPages?: Array<{ questions?: unknown }>
      }
    ).questionPages?.[pageIndex]?.questions,
  )
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!hasTouchedPageQuestions) return
    void trigger(fieldArrayName)
  }, [fieldArrayName, hasTouchedPageQuestions, trigger, watchedQuestions])

  const handleAddQuestion = () => {
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
    remove(index)
  }

  const handleDragStart = (index: number) => (event: DragEvent<HTMLDivElement>) => {
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

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    draggingId.current = null
    draggingIndexRef.current = null
    placeholderHeightRef.current = 0
    setDraggingIndex(null)
    setPlaceholderIndex(null)
    setPlaceholderHeight(0)
  }

  const handleDragOver = (index: number) => (event: DragEvent<HTMLDivElement>) => {
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
    event.preventDefault()
    const sourceIndex = draggingId.current
    draggingId.current = null
    if (sourceIndex === null || sourceIndex === targetIndex) return
    move(sourceIndex, targetIndex)
    setPlaceholderIndex(null)
  }

  return (
    <Flex flexDirection="column" gap={18}>
      {fields.map((question, index) => (
        <div
          key={question.id}
          onDragOver={handleDragOver(index)}
          onDrop={handleDrop(index)}
          css={{ width: '100%' }}
        >
          {placeholderIndex === index && draggingIndex !== null ? (
            <Q.DragPlaceholder $height={placeholderHeight} />
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
              namePrefix={`questionPages.${pageIndex}.questions.${index}`}
              onDelete={() => handleDeleteQuestion(index)}
              canDelete={!watchedQuestions[index]?.isPartQuestion}
              dragHandleProps={{
                draggable: true,
                onDragStart: handleDragStart(index),
                onDragEnd: handleDragEnd,
              }}
            />
          </div>
        </div>
      ))}
      <Section
        variant="dashed"
        flexDirection="row"
        gap={6}
        justifyContent="center"
        css={{
          color: theme.colors.gray[500],
          cursor: 'pointer',
        }}
        onClick={handleAddQuestion}
      >
        <Plus />
        문항 추가하기
      </Section>
    </Flex>
  )
}

const Step3 = ({
  control,
  trigger,
}: {
  control: Control<RecruitingForms>
  trigger: UseFormTrigger<RecruitingForms>
}) => {
  const [page, setPage] = useState(1)
  const nextIdRef = useRef(5)
  const pageIndex = page - 1
  const getNextQuestionId = () => {
    const current = nextIdRef.current
    nextIdRef.current = current + 1
    return current
  }

  return (
    <Flex flexDirection="column" gap={18}>
      <Section gap={27} variant="solid" flexDirection="column" alignItems="flex-start">
        <Flex gap={6} flexDirection="column" alignItems="flex-start">
          <S.Title>지원서 페이지 안내</S.Title>
          <S.SubTitle>지원서 페이지별 주제에 맞는 문항을 작성하세요.</S.SubTitle>
        </Flex>
        <Flex gap={28}>
          {PAGE_LIST.map((pageNumber) => (
            <RecuritingPageNavigator
              key={pageNumber}
              page={pageNumber}
              setPage={setPage}
              currentPage={page}
            />
          ))}
        </Flex>
      </Section>
      <QuestionList
        key={pageIndex}
        control={control}
        pageIndex={pageIndex}
        getNextQuestionId={getNextQuestionId}
        trigger={trigger}
      />
      <Flex justifyContent="center">
        <Navigation currentPage={page} totalPages={PAGE_LIST.length} onChangePage={setPage} />
      </Flex>
    </Flex>
  )
}

export default Step3
