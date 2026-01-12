import type { JSX } from 'react'
import { useMemo, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'

import CautionPartChange from '@/features/apply/components/modals/CautionPartChange'
import PartDivider from '@/features/apply/components/PartDivider'
import type { ResumeFormSectionProps } from '@/shared/types/form'
import type { QuestionAnswerValue, QuestionUnion } from '@/shared/types/question'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Question } from '@/shared/ui/common/question/Question'
import ResumeNavigation from '@/shared/ui/common/ResumeNavigation'

import {
  getChangedPartRanks,
  isAnswerEmpty,
  isPartSelectionEqual,
} from './ResumeFormSection.helpers'

const ResumeFormSection = ({
  questions,
  partQuestions,
  control,
  setValue,
  clearErrors,
  errors,
  currentPage,
  totalPages,
  isSubmitDisabled,
  onOpenSubmitModal,
  onPageChange,
}: ResumeFormSectionProps) => {
  const [isPartChangeModalOpen, setIsPartChangeModalOpen] = useState(false)
  const [pendingPartSelection, setPendingPartSelection] = useState<QuestionAnswerValue | null>(null)
  const [pendingCurrentSelection, setPendingCurrentSelection] =
    useState<QuestionAnswerValue | null>(null)
  const [pendingPartQuestionId, setPendingPartQuestionId] = useState<number | null>(null)
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  const getFieldErrorMessage = (questionId: number): string | undefined => {
    const fieldError = errors[String(questionId)]
    return fieldError?.message
  }

  const submitButtonTone = isSubmitDisabled ? 'gray' : 'lime'

  const partQuestionIds = useMemo(
    () => partQuestions.map((question) => question.id),
    [partQuestions],
  )
  const partQuestionValues = useWatch({
    control,
    name: partQuestionIds.map(String),
  })

  const hasPartAnswers = useMemo(() => {
    if (partQuestionIds.length === 0) return false
    return partQuestions.some((question, index) => {
      const answerValue = partQuestionValues[index]
      return !isAnswerEmpty(question, answerValue)
    })
  }, [partQuestionIds.length, partQuestions, partQuestionValues])

  const resetPartQuestionAnswers = () => {
    partQuestions.forEach((question) => {
      setValue(String(question.id), question.answer, { shouldDirty: true })
    })
    if (partQuestionIds.length > 0) {
      clearErrors(partQuestionIds.map(String))
    }
  }

  const handleConfirmPartChange = () => {
    if (pendingPartQuestionId === null || pendingPartSelection === null) return
    setValue(String(pendingPartQuestionId), pendingPartSelection, {
      shouldDirty: true,
      shouldTouch: true,
    })
    resetPartQuestionAnswers()
    setPendingPartSelection(null)
    setPendingCurrentSelection(null)
    setPendingPartQuestionId(null)
    setIsPartChangeModalOpen(false)
  }

  const handleCancelPartChange = () => {
    setPendingPartSelection(null)
    setPendingCurrentSelection(null)
    setPendingPartQuestionId(null)
    setIsPartChangeModalOpen(false)
  }

  const partChangeRanksText = useMemo(() => {
    const changedRanks = getChangedPartRanks(pendingCurrentSelection, pendingPartSelection)

    return changedRanks.length > 0 ? `${changedRanks.join(', ')}지망` : '선택'
  }, [pendingPartSelection, pendingCurrentSelection])

  const questionsWithLabels = questions as Array<QuestionUnion & { __partLabel?: string }>
  const renderedQuestions = questionsWithLabels.reduce<{
    elements: Array<JSX.Element>
    lastLabel?: string
  }>(
    (acc, question) => {
      const label = question.__partLabel
      const showLabel = Boolean(label) && label !== acc.lastLabel

      const nextElements = [...acc.elements]

      if (showLabel && label) {
        nextElements.push(<PartDivider key={`label-${label}`} label={label} />)
      }

      nextElements.push(
        <Flex key={question.id} flexDirection="column" gap={8} width="100%">
          <Controller
            name={String(question.id)}
            control={control}
            render={({ field }) => (
              <Question
                mode="edit"
                data={question}
                value={field.value as QuestionAnswerValue}
                onChange={(_, newValue) => {
                  if (question.type === 'PART') {
                    const isSameSelection = isPartSelectionEqual(
                      field.value as QuestionAnswerValue,
                      newValue,
                    )
                    if (hasPartAnswers && !isSameSelection) {
                      setPendingPartSelection(newValue)
                      setPendingCurrentSelection((field.value as QuestionAnswerValue) ?? null)
                      setPendingPartQuestionId(question.id)
                      setIsPartChangeModalOpen(true)
                      return
                    }
                  }

                  field.onChange(newValue, { shouldDirty: true, shouldTouch: true })
                }}
                errorMessage={getFieldErrorMessage(question.id)}
              />
            )}
          />
        </Flex>,
      )

      return {
        elements: nextElements,
        lastLabel: showLabel && label ? label : acc.lastLabel,
      }
    },
    { elements: [] },
  ).elements

  return (
    <form onSubmit={handleFormSubmit}>
      {renderedQuestions}

      <ResumeNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <Flex width={360} css={{ marginTop: '40px', alignSelf: 'center' }}>
        <Button
          type="button"
          label="지원하기"
          tone={submitButtonTone}
          disabled={isSubmitDisabled}
          onClick={onOpenSubmitModal}
        />
      </Flex>

      {isPartChangeModalOpen && (
        <CautionPartChange
          onClose={handleCancelPartChange}
          onConfirm={handleConfirmPartChange}
          ranksText={partChangeRanksText}
        />
      )}
    </form>
  )
}

export default ResumeFormSection
