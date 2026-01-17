import type { JSX } from 'react'
import { useMemo } from 'react'
import { Controller, useWatch } from 'react-hook-form'

import CautionPartChange from '@/features/apply/components/modals/CautionPartChange'
import PartDivider from '@/features/apply/components/PartDivider'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { ResumeFormSectionProps } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Question } from '@/shared/ui/common/question/Question'
import ResumeNavigation from '@/shared/ui/common/ResumeNavigation'

import type { QuestionAnswerValue, QuestionUnion } from '../../domain/model'
import { isAnswerEmpty } from './ResumeFormSection.helpers'
import { usePartChangeGuard } from './usePartChangeGuard'

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
  isEdit,
}: ResumeFormSectionProps) => {
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

  const {
    isPartChangeModalOpen,
    partChangeRanksText,
    requestPartChange,
    handleConfirmPartChange,
    handleCancelPartChange,
  } = usePartChangeGuard({
    partQuestions,
    setValue,
    clearErrors,
    hasPartAnswers,
  })

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
                mode={isEdit ? 'edit' : 'view'}
                data={question}
                value={field.value as QuestionAnswerValue}
                onChange={(_, newValue) => {
                  if (question.type === 'PART') {
                    const isBlocked = requestPartChange({
                      questionId: question.id,
                      currentValue: field.value as QuestionAnswerValue,
                      nextValue: newValue,
                    })
                    if (isBlocked) {
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

      <Flex
        width={360}
        css={{
          marginTop: '40px',
          alignSelf: 'center',
          [media.down(theme.breakPoints.mobile)]: { maxWidth: '70vw' },
        }}
      >
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
