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
  // 폼 문항 리스트 필드 배열 제어
  const { fields, append, remove, move, update, replace } = useFieldArray<RecruitingForms, 'items'>(
    {
      control,
      name: 'items',
    },
  )

  const watchedItems = useWatch({
    control,
    name: 'items' as never,
  }) as RecruitingForms['items'] | undefined
  // watch 결과가 undefined일 수 있어서 안전하게 배열로 정규화
  const normalizedItems = useMemo<RecruitingForms['items']>(
    () => (Array.isArray(watchedItems) ? watchedItems : []),
    [watchedItems],
  )
  const normalizedSignature = useMemo(
    () =>
      normalizedItems
        .map((item) => {
          const targetKey =
            item.target.kind === 'PART'
              ? `PART:${item.target.part}`
              : `COMMON:${item.target.pageNo}`
          const questionKey = item.question.questionId ?? 'new'
          return `${targetKey}|${questionKey}|${item.question.type}|${item.question.orderNo}`
        })
        .join('||'),
    [normalizedItems],
  )
  const lastReplacedSignatureRef = useRef<string>('')
  const fieldsSignature = useMemo(
    () =>
      fields
        .map((item) => {
          const itemTarget = item.target
          const question = item.question
          const targetKey =
            itemTarget.kind === 'PART' ? `PART:${itemTarget.part}` : `COMMON:${itemTarget.pageNo}`
          const questionKey = question.questionId ?? 'new'
          return `${targetKey}|${questionKey}|${question.type}|${question.orderNo}`
        })
        .join('||'),
    [fields],
  )

  useEffect(() => {
    if (normalizedSignature === lastReplacedSignatureRef.current) return
    if (normalizedSignature !== fieldsSignature) {
      lastReplacedSignatureRef.current = normalizedSignature
      replace(normalizedItems)
    }
  }, [normalizedSignature, fieldsSignature, normalizedItems, replace])

  // 현재 페이지(공통/파트)에 해당하는 문항 인덱스만 추려서 orderNo 기준 정렬
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
        .sort((a, b) => {
          const aOrder = Number(a.item.question.orderNo)
          const bOrder = Number(b.item.question.orderNo)
          if (Number.isNaN(aOrder) || Number.isNaN(bOrder)) return 0
          return aOrder - bOrder
        })
        .map(({ index }) => index),
    [normalizedItems, target],
  )

  // 공통 고정 문항(희망파트/면접시간)은 삭제/타입변경 불가
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

  // 화면에 보이는 순서대로 orderNo를 동기화 (드래그/추가/삭제 대응)
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

  // 문항 추가 + 임시저장(있을 때만)
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

  // 문항 삭제 (고정 문항은 막음)
  const handleDeleteQuestion = (index: number, isFixed: boolean) => {
    if (isLocked || isFixed) return
    const item = normalizedItems[index]
    const questionId = item.question.questionId
    remove(index)
    deleteSingleQuestionMutate(String(questionId), {
      onSuccess: (data) => {
        recruitmentForm.setValue('items', convertApplicationFormToItems(data.result), {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: true,
        })
        queryClient.invalidateQueries({ queryKey: applicationQuery.queryKey })
      },
    })
  }

  // 드래그 시작 시 placeholder 높이 계산
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

  // 드래그 중 위치 계산
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

  // 드롭 시 순서 변경
  const handleDrop = (targetIndex: number) => (event: DragEvent<HTMLDivElement>) => {
    if (isLocked) return
    event.preventDefault()
    const sourceIndex = draggingId.current
    draggingId.current = null
    if (sourceIndex === null || sourceIndex === targetIndex) return
    move(sourceIndex, targetIndex)
    setPlaceholderIndex(null)
  }

  // 현재 페이지에 보여줄 문항 렌더링 순서 계산
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
      const aOrder = Number(normalizedItems[a.itemIndex]?.question.orderNo)
      const bOrder = Number(normalizedItems[b.itemIndex]?.question.orderNo)
      if (Number.isNaN(aOrder) || Number.isNaN(bOrder)) return a.orderIndex - b.orderIndex
      if (aOrder !== bOrder) return aOrder - bOrder
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
