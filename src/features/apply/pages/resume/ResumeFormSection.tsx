import { useMemo } from 'react'
import { Controller, useWatch } from 'react-hook-form'

import PartDivider from '@/features/apply/components/PartDivider'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { ResumeFormSectionProps } from '@/shared/types/form'
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
      .flatMap((page) => (Array.isArray(page.questions) ? page.questions : []))
      .map((question) => question.questionId)
  }, [normalizedPages])

  const partQuestionValues = useWatch({
    control,
    name: partQuestionIds.map(String),
  })

  const hasPartAnswers = useMemo(() => {
    if (partQuestionIds.length === 0) return false
    return normalizedPages.some((page) =>
      (Array.isArray(page.questions) ? page.questions : []).some((question) => {
        const index = partQuestionIds.indexOf(question.questionId)
        const answerValue = partQuestionValues[index]
        return !isAnswerEmpty(question, answerValue)
      }),
    )
  }, [partQuestionValues, normalizedPages, partQuestionIds])

  const {
    isPartChangeModalOpen,
    partChangeRanksText,
    handleConfirmPartChange,
    handleCancelPartChange,
  } = usePartChangeGuard({
    pages: normalizedPages[2]?.partQuestions ?? [],
    setValue,
    clearErrors,
    hasPartAnswers,
  })

  const currentPageIndex = Math.max(0, Math.min(currentPage - 1, normalizedPages.length - 1))
  const activePage = normalizedPages[currentPageIndex]

  const activePagePartQuestions = Array.isArray(activePage.partQuestions)
    ? activePage.partQuestions
    : []
  const activePageQuestions = Array.isArray(activePage.questions) ? activePage.questions : []
  const activeScheduleQuestion = activePage.scheduleQuestion ? activePage.scheduleQuestion : null
  console.log('activeScheduleQuestion', activeScheduleQuestion)
  return (
    <form onSubmit={handleFormSubmit}>
      <Flex key={activePage.page} flexDirection="column" gap={24}>
        {activePagePartQuestions.map((partQuestion, index) => (
          <Flex
            key={`${activePage.page}-${partQuestion.part}-${index}`}
            flexDirection="column"
            gap={12}
          >
            <PartDivider label={partQuestion.part} />
            {partQuestion.questions.map((question, idx) => (
              <Controller
                key={question.questionId}
                name={String(question.questionId)}
                control={control}
                defaultValue={undefined}
                render={({ field }) => (
                  <Question
                    questionId={question.questionId}
                    question={question.questionText}
                    questionNumber={idx + 1}
                    required={question.required}
                    type={question.type}
                    options={question.options}
                    value={field.value as QuestionAnswerValue}
                    onChange={field.onChange}
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
            defaultValue={undefined}
            render={({ field }) => (
              <Question
                questionId={question.questionId}
                question={question.questionText}
                questionNumber={idx + 1}
                required={question.required}
                type={question.type}
                options={question.options}
                value={field.value as QuestionAnswerValue}
                onChange={field.onChange}
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
              defaultValue={undefined}
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
