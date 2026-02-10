import type { DragEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Control } from 'react-hook-form'
import { useFieldArray, useWatch } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

import { useRecruitingContext } from '@/features/school/components/Recruiting/RecruitingPage/RecruitingContext'
import { schoolKeys } from '@/features/school/domain/queryKeys'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import { convertApplicationFormToItems } from '@/features/school/utils/recruiting/applicationFormMapper'
import { buildQuestionsPayload } from '@/features/school/utils/recruiting/recruitingPayload'
import Plus from '@/shared/assets/icons/plus.svg?react'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms, RecruitingItemTarget } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import MakeQuestion from '../MakeQuestion/MakeQuestion'
import * as S from './QuestionList.style'

type QuestionListProps = {
  control: Control<RecruitingForms>
  target: RecruitingItemTarget
  isLocked?: boolean
}

const QuestionList = ({ control, target, isLocked = false }: QuestionListProps) => {
  const draggingId = useRef<number | null>(null)
  const router = useRouter()
  const recruitingMatch = router.state.matches.find(
    (m) => (m.params as Record<string, string>).recruitingId,
  )
  const recruitingId =
    (recruitingMatch?.params as Record<string, string> | undefined)?.recruitingId ?? ''

  const { recruitmentForm } = useRecruitingContext()
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null)
  const [placeholderHeight, setPlaceholderHeight] = useState<number>(0)
  const draggingIndexRef = useRef<number | null>(null)
  const placeholderHeightRef = useRef<number>(0)
  const { useDeleteRecruitmentQuestion, usePatchRecruitmentApplicationFormDraft } =
    useRecruitingMutation()
  const { mutate: deleteSingleQuestionMutate } = useDeleteRecruitmentQuestion(recruitingId)
  const { mutate: patchTempSavedRecruitQuestionsMutate } =
    usePatchRecruitmentApplicationFormDraft(recruitingId)
  const queryClient = useQueryClient()
  const applicationQuery = schoolKeys.getRecruitmentApplicationFormDraft(recruitingId)
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: 'items' as never,
  })

  const watchedItems = useWatch({
    control,
    name: 'items' as never,
  }) as RecruitingForms['items'] | undefined
  const normalizedItems = useMemo<RecruitingForms['items']>(
    () => (Array.isArray(watchedItems) ? watchedItems : []),
    [watchedItems],
  )

  const filteredIndices = useMemo(
    () =>
      normalizedItems
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => {
          if (target.kind === 'COMMON_PAGE') {
            return item.target.kind === 'COMMON_PAGE' && item.target.pageNo === target.pageNo
          }
          return item.target.kind === 'PART' && item.target.part === target.part
        })
        .map(({ index }) => index),
    [normalizedItems, target],
  )

  const fixedIndices = useMemo(() => {
    const next = new Set<number>()
    if (target.kind === 'COMMON_PAGE' && target.pageNo === 1) {
      const preferredIndex = filteredIndices.find(
        (index) => normalizedItems[index]?.question.type === 'PREFERRED_PART',
      )
      if (preferredIndex !== undefined) {
        next.add(preferredIndex)
      }
    }
    if (target.kind === 'COMMON_PAGE' && target.pageNo === 2) {
      const scheduleIndex = filteredIndices.find(
        (index) => normalizedItems[index]?.question.type === 'SCHEDULE',
      )
      if (scheduleIndex !== undefined) {
        next.add(scheduleIndex)
      }
    }
    return next
  }, [filteredIndices, normalizedItems, target])

  useEffect(() => {
    filteredIndices.forEach((itemIndex, orderIndex) => {
      const item = normalizedItems[itemIndex]
      if (Number(item.question.orderNo) === orderIndex + 1) return
      update(itemIndex, {
        ...item,
        question: {
          ...item.question,
          orderNo: String(orderIndex + 1),
        },
      })
    })
  }, [filteredIndices, normalizedItems, update])

  const handleAddQuestion = () => {
    if (isLocked) return
    const orderNo = String(filteredIndices.length + 1)
    const newItem: RecruitingForms['items'][number] = {
      target,
      question: {
        type: 'LONG_TEXT',
        questionText: '',
        required: true,
        orderNo,
        options: [],
      },
    }
    append(newItem)
    if (!recruitingId) return
    patchTempSavedRecruitQuestionsMutate(
      { items: buildQuestionsPayload([...normalizedItems, newItem]) },
      {
        onSuccess: (data) => {
          recruitmentForm.setValue('items', convertApplicationFormToItems(data.result), {
            shouldDirty: false,
            shouldTouch: false,
            shouldValidate: true,
          })
          queryClient.invalidateQueries({ queryKey: applicationQuery.queryKey })
        },
      },
    )
  }

  const handleDeleteQuestion = (index: number, isFixed: boolean) => {
    if (isLocked || isFixed) return
    const item = normalizedItems[index]
    const questionId = item.question.questionId
    remove(index)
    deleteSingleQuestionMutate(String(questionId), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: applicationQuery.queryKey })
      },
    })
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

  const visibleQuestions = useMemo(() => {
    const base = filteredIndices
      .map((itemIndex, orderIndex) => {
        const questionField = fields[itemIndex]
        return { orderIndex, itemIndex, questionField }
      })
      .filter(
        (
          entry,
        ): entry is {
          orderIndex: number
          itemIndex: number
          questionField: (typeof fields)[number]
        } => Boolean(entry.questionField),
      )
    return base.sort((a, b) => {
      const aType = normalizedItems[a.itemIndex]?.question.type
      const bType = normalizedItems[b.itemIndex]?.question.type
      if (aType === 'SCHEDULE' && bType !== 'SCHEDULE') return -1
      if (aType !== 'SCHEDULE' && bType === 'SCHEDULE') return 1
      return a.orderIndex - b.orderIndex
    })
  }, [filteredIndices, fields, normalizedItems])

  return (
    <Flex flexDirection="column" gap={18}>
      {visibleQuestions.map(({ itemIndex, orderIndex, questionField }) => {
        const isFixed = fixedIndices.has(itemIndex)

        return (
          <div
            key={questionField.id}
            onDragOver={handleDragOver(itemIndex)}
            onDrop={handleDrop(itemIndex)}
            css={{ width: '100%' }}
          >
            {placeholderIndex === itemIndex && draggingIndex !== null ? (
              <S.DragPlaceholder $height={placeholderHeight} />
            ) : null}
            <div
              ref={(node) => {
                cardRefs.current[itemIndex] = node
              }}
              css={{
                width: '100%',
                transition: 'transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease',
                transform: draggingIndex === itemIndex ? 'scale(0.98)' : 'translateZ(0)',
                opacity: draggingIndex === itemIndex ? 0.7 : 1,
                boxShadow: draggingIndex === itemIndex ? '0 8px 20px rgba(0, 0, 0, 0.12)' : 'none',
              }}
            >
              <MakeQuestion
                index={orderIndex}
                control={control}
                namePrefix={`items.${itemIndex}`}
                recruitingId={recruitingId}
                onDelete={() => handleDeleteQuestion(itemIndex, isFixed)}
                canDelete={!isLocked && !isFixed}
                isLocked={isLocked}
                isTypeLocked={isFixed}
                dragHandleProps={{
                  draggable: !isLocked && !isFixed,
                  onDragStart: handleDragStart(itemIndex),
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
