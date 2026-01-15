import type { DragEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Control, UseFormTrigger } from 'react-hook-form'
import { useFieldArray, useFormState, useWatch } from 'react-hook-form'

import { getPartKey } from '@/features/school/utils/partQuestionBank'
import Plus from '@/shared/assets/icons/plus.svg?react'
import { theme } from '@/shared/styles/theme'
import type { Option, RecruitingForms } from '@/shared/types/form'
import type { PartType } from '@/shared/types/umc'
import { Flex } from '@/shared/ui/common/Flex'
import Navigation from '@/shared/ui/common/Navigation/Navigation'
import Section from '@/shared/ui/common/Section/Section'
import LabelDropdown from '@/shared/ui/form/LabelDropdown/LabelDropdown'

import MakeQuestion from '../MakeQuestion/MakeQuestion'
import * as Q from '../MakeQuestion/MakeQuestion.style'
import RecuritingPageNavigator from '../RecruitingPageNavigator/RecruitingPageNavigator'
import * as S from './common'

const PAGE_LIST = [1, 2, 3]
type QuestionItem = RecruitingForms['pages'][number]['questions'][number]
type QuestionListValue = Array<QuestionItem | undefined>

type QuestionListProps = {
  control: Control<RecruitingForms>
  fieldArrayName: string
  namePrefixBase: string
  getNextQuestionId: () => number
  trigger: UseFormTrigger<RecruitingForms>
  hasTouched: boolean
}

const QuestionList = ({
  control,
  fieldArrayName,
  namePrefixBase,
  getNextQuestionId,
  trigger,
  hasTouched,
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

  const handleDragEnd = () => {
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
                namePrefix={`${namePrefixBase}.${index}`}
                onDelete={() => handleDeleteQuestion(index)}
                canDelete={!isPartQuestion}
                dragHandleProps={{
                  draggable: true,
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
  page,
  setPage,
  part,
  setPart,
}: {
  control: Control<RecruitingForms>
  trigger: UseFormTrigger<RecruitingForms>
  page: number
  setPage: (nextPage: number) => void
  part: PartType | null
  setPart: (nextPart: PartType | null) => void
}) => {
  const nextIdRef = useRef(1)
  const recruitingPart = useWatch({
    control,
    name: 'recruitingPart',
  })
  const pages = useWatch({
    control,
    name: 'pages',
  })
  const partQuestionBank = useWatch({
    control,
    name: 'partQuestionBank',
  })
  const { touchedFields } = useFormState({ control })
  const partOptions = useMemo<Array<Option<PartType>>>(
    () =>
      recruitingPart.map((partValue) => ({
        label: partValue,
        id: partValue,
      })),
    [recruitingPart],
  )
  const selectedPart =
    part && recruitingPart.includes(part)
      ? part
      : recruitingPart.length > 0
        ? recruitingPart[0]
        : null
  const currentFormPageIndex = useMemo(() => {
    if (page === 1 || page === 2) {
      return pages.findIndex((pageEntry) => pageEntry.page === page)
    }
    return -1
  }, [page, pages])

  useEffect(() => {
    if (page !== 3) return
    const firstPart = recruitingPart.length > 0 ? recruitingPart[0] : null
    if (!selectedPart && firstPart) {
      setPart(firstPart)
    }
    if (selectedPart && !recruitingPart.includes(selectedPart)) {
      setPart(firstPart)
    }
  }, [page, recruitingPart, selectedPart, setPart])

  const getNextQuestionId = () => {
    const current = nextIdRef.current
    nextIdRef.current = current + 1
    return current
  }

  const maxQuestionId = useMemo(() => {
    const pageIds = pages.flatMap((pageEntry) =>
      pageEntry.questions.map((question) => question.questionId),
    )
    const partIds = Object.values(partQuestionBank).flatMap((questions) =>
      Array.isArray(questions) ? questions.map((question) => question.questionId) : [],
    )
    return Math.max(0, ...pageIds, ...partIds)
  }, [pages, partQuestionBank])

  useEffect(() => {
    if (maxQuestionId >= nextIdRef.current) {
      nextIdRef.current = maxQuestionId + 1
    }
  }, [maxQuestionId])

  const touchedPages = (
    touchedFields as unknown as {
      pages?: Array<{ questions?: unknown }>
    }
  ).pages
  const touchedPagesLength = touchedPages ? touchedPages.length : 0
  const currentTouchedPage =
    touchedPages && currentFormPageIndex >= 0 ? touchedPages[currentFormPageIndex] : undefined
  const hasTouchedPageQuestions =
    currentFormPageIndex >= 0 &&
    currentFormPageIndex < touchedPagesLength &&
    Boolean(currentTouchedPage && currentTouchedPage.questions)
  const touchedPartBank = (
    touchedFields as unknown as {
      partQuestionBank?: Record<string, unknown>
    }
  ).partQuestionBank
  const hasTouchedPartQuestions =
    selectedPart && Boolean(touchedPartBank && touchedPartBank[getPartKey(selectedPart)])

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
      {page === 3 && (
        <LabelDropdown
          label="파트 선택"
          placeholder="파트를 선택해 주세요."
          options={partOptions}
          value={
            selectedPart
              ? {
                  label: selectedPart,
                  id: selectedPart,
                }
              : undefined
          }
          onChange={(option) => setPart(option.label)}
        />
      )}
      {currentFormPageIndex >= 0 ? (
        <QuestionList
          key={currentFormPageIndex}
          control={control}
          fieldArrayName={`pages.${currentFormPageIndex}.questions`}
          namePrefixBase={`pages.${currentFormPageIndex}.questions`}
          getNextQuestionId={getNextQuestionId}
          trigger={trigger}
          hasTouched={hasTouchedPageQuestions}
        />
      ) : page === 3 && selectedPart ? (
        <QuestionList
          key={selectedPart}
          control={control}
          fieldArrayName={`partQuestionBank.${getPartKey(selectedPart)}`}
          namePrefixBase={`partQuestionBank.${getPartKey(selectedPart)}`}
          getNextQuestionId={getNextQuestionId}
          trigger={trigger}
          hasTouched={Boolean(hasTouchedPartQuestions)}
        />
      ) : (
        <Flex flexDirection="column" alignItems="flex-start">
          <S.SubTitle>모집할 파트를 먼저 선택해 주세요.</S.SubTitle>
        </Flex>
      )}
      <Flex justifyContent="center">
        <Navigation currentPage={page} totalPages={PAGE_LIST.length} onChangePage={setPage} />
      </Flex>
    </Flex>
  )
}

export default Step3
