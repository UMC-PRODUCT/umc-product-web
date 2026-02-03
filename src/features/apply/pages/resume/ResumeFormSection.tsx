import { useMemo } from 'react'
import type { ControllerRenderProps } from 'react-hook-form'
import { Controller, useWatch } from 'react-hook-form'

import PartDivider from '@/features/apply/components/PartDivider'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { question, ResumeFormSectionProps } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Question } from '@/shared/ui/common/question/Question'
import QuestionLayout from '@/shared/ui/common/question/QuestionLayout'
import { TimeTable } from '@/shared/ui/common/question/timeTable/TimeTable'
import ResumeNavigation from '@/shared/ui/common/ResumeNavigation'

import CautionPartChange from '../../components/modals/CautionPartChange'
import type { QuestionAnswerValue } from '../../domain/model'
import { isAnswerEmpty } from './ResumeFormSection.helpers'
import { usePartChangeGuard } from './usePartChangeGuard'

const ResumeFormSection = ({
  pages,
  setValue,
  clearErrors,
  control,
  errors,
  currentPage,
  totalPages,
  isSubmitDisabled,
  onOpenSubmitModal,
  onPageChange,
  isEdit,
}: ResumeFormSectionProps) => {
  const normalizedPages = useMemo(() => (Array.isArray(pages) ? pages : []), [pages])
  const partQuestionGroups = useMemo(
    () =>
      normalizedPages.flatMap((page) =>
        Array.isArray(page.partQuestions) ? page.partQuestions : [],
      ),
    [normalizedPages],
  )

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  const getFieldErrorMessage = (questionId: number): string | undefined => {
    const fieldError = errors[String(questionId)]
    return fieldError?.message
  }

  const submitButtonTone = isSubmitDisabled ? 'gray' : 'lime'

  const partQuestionIds = useMemo(() => {
    return normalizedPages
      .flatMap((page) => {
        const baseQuestions = Array.isArray(page.questions) ? page.questions : []
        const partQuestions = Array.isArray(page.partQuestions)
          ? page.partQuestions.flatMap((partGroup) =>
              Array.isArray(partGroup.questions) ? partGroup.questions : [],
            )
          : []
        return [...baseQuestions, ...partQuestions]
      })
      .map((question) => question.questionId)
  }, [normalizedPages])

  const partQuestionValues = useWatch({
    control,
    name: partQuestionIds.map(String),
  })

  const hasPartAnswers = useMemo(() => {
    if (partQuestionIds.length === 0) return false
    return normalizedPages.some((page) => {
      const pageQuestions = Array.isArray(page.questions) ? page.questions : []
      const pagePartQuestions = Array.isArray(page.partQuestions)
        ? page.partQuestions.flatMap((partGroup) =>
            Array.isArray(partGroup.questions) ? partGroup.questions : [],
          )
        : []
      return [...pageQuestions, ...pagePartQuestions].some((question) => {
        const index = partQuestionIds.indexOf(question.questionId)
        const answerValue = partQuestionValues[index]
        return !isAnswerEmpty(question, answerValue)
      })
    })
  }, [partQuestionValues, normalizedPages, partQuestionIds])

  const {
    isPartChangeModalOpen,
    partChangeRanksText,
    requestPartChange,
    handleConfirmPartChange,
    handleCancelPartChange,
  } = usePartChangeGuard({
    pages: partQuestionGroups,
    setValue,
    clearErrors,
    hasPartAnswers,
  })

  const handleFieldValueChange = (
    question: question,
    field: ControllerRenderProps<Record<string, unknown>, string>,
    newValue: QuestionAnswerValue,
  ) => {
    requestPartChange({
      questionId: question.questionId,
      currentValue: field.value as QuestionAnswerValue,
      nextValue: newValue,
    })
    field.onChange(newValue)
  }

  const currentPageIndex = Math.max(0, Math.min(currentPage - 1, normalizedPages.length - 1))
  const activePage = normalizedPages[currentPageIndex]

  const activePagePartQuestions = Array.isArray(activePage.partQuestions)
    ? activePage.partQuestions
    : []
  const activePagePartQuestionIds = new Set(
    activePagePartQuestions.flatMap((group) =>
      Array.isArray(group.questions) ? group.questions.map((question) => question.questionId) : [],
    ),
  )
  const activePageQuestions = (
    Array.isArray(activePage.questions) ? activePage.questions : []
  ).filter((question) => !activePagePartQuestionIds.has(question.questionId))
  const activeScheduleQuestion = activePage.scheduleQuestion ? activePage.scheduleQuestion : null
  return (
    <form onSubmit={handleFormSubmit} method="POST">
      <Flex key={activePage.page} flexDirection="column" gap={24}>
        {activePagePartQuestions.map((partQuestion, index) => (
          <Flex
            key={`${activePage.page}-${partQuestion.part}-${index}`}
            flexDirection="column"
            gap={12}
          >
            <PartDivider label={partQuestion.label ?? partQuestion.part} />
            {partQuestion.questions.map((question, idx) => (
              <Controller
                key={question.questionId}
                name={String(question.questionId)}
                control={control}
                render={({ field }) => (
                  <Question
                    questionId={question.questionId}
                    question={question.questionText}
                    questionNumber={idx + 1}
                    required={question.required}
                    type={question.type}
                    options={question.options}
                    value={field.value as QuestionAnswerValue}
                    onChange={(_, newValue) => handleFieldValueChange(question, field, newValue)}
                    errorMessage={getFieldErrorMessage(question.questionId)}
                    mode={isEdit ? 'edit' : 'view'}
                    maxSelectCount={question.maxSelectCount}
                    preferredPartOptions={question.preferredPartOptions}
                  />
                )}
              />
            ))}
          </Flex>
        ))}

        {activePageQuestions.map((question, idx) => (
          <Controller
            key={question.questionId}
            name={String(question.questionId)}
            control={control}
            render={({ field }) => (
              <Question
                questionId={question.questionId}
                question={question.questionText}
                questionNumber={idx + 1}
                required={question.required}
                type={question.type}
                options={question.options}
                value={field.value as QuestionAnswerValue}
                onChange={(_, newValue) => handleFieldValueChange(question, field, newValue)}
                preferredPartOptions={question.preferredPartOptions}
                errorMessage={getFieldErrorMessage(question.questionId)}
                mode={isEdit ? 'edit' : 'view'}
                maxSelectCount={question.maxSelectCount}
              />
            )}
          />
        ))}
        {activeScheduleQuestion && (
          <QuestionLayout
            questionNumber={activePageQuestions.length + 1}
            questionText={activeScheduleQuestion.questionText}
            isRequired={activeScheduleQuestion.required}
            errorMessage={getFieldErrorMessage(activeScheduleQuestion.questionId)}
          >
            <Controller
              name={String(activeScheduleQuestion.questionId)}
              control={control}
              render={({ field }) => (
                <TimeTable
                  dateRange={activeScheduleQuestion.schedule.dateRange}
                  timeRange={activeScheduleQuestion.schedule.timeRange}
                  value={field.value as Record<string, Array<string>>}
                  disabledSlots={activeScheduleQuestion.schedule.disabledByDate}
                  onChange={field.onChange}
                  mode={isEdit ? 'edit' : 'view'}
                />
              )}
            />
          </QuestionLayout>
        )}
      </Flex>

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
