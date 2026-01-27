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
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  const getFieldErrorMessage = (questionId: number): string | undefined => {
    const fieldError = errors[String(questionId)]
    return fieldError?.message
  }

  const submitButtonTone = isSubmitDisabled ? 'gray' : 'lime'

  const partQuestionIds = useMemo(
    () => pages.flatMap((page) => page.questions.map((question) => question.questionId)),
    [pages],
  )

  const partQuestionValues = useWatch({
    control,
    name: partQuestionIds.map(String),
  })

  const hasPartAnswers = useMemo(() => {
    if (partQuestionIds.length === 0) return false
    return pages.some((page) =>
      page.questions.some((question) => {
        const index = partQuestionIds.indexOf(question.questionId)
        const answerValue = partQuestionValues[index]
        return !isAnswerEmpty(question, answerValue)
      }),
    )
  }, [partQuestionValues, pages, partQuestionIds])

  const {
    isPartChangeModalOpen,
    partChangeRanksText,
    handleConfirmPartChange,
    handleCancelPartChange,
  } = usePartChangeGuard({
    pages: pages[2].partQuestions,
    setValue,
    clearErrors,
    hasPartAnswers,
  })
  return (
    <form onSubmit={handleFormSubmit}>
      <Flex key={pages[currentPage - 1].page} flexDirection="column" gap={24}>
        {pages[currentPage - 1].partQuestions.map((partQuestion, index) => (
          <Flex
            key={`${pages[currentPage - 1].page}-${partQuestion.part}-${index}`}
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

        {pages[currentPage - 1].questions.map((question, idx) => (
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
        {pages[currentPage - 1].scheduleQuestion && (
          <Controller
            key={pages[currentPage - 1].scheduleQuestion!.questionId}
            name={String(pages[currentPage - 1].scheduleQuestion!.questionId)}
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <QuestionLayout
                isRequired={true}
                questionText={pages[currentPage - 1].scheduleQuestion!.questionText}
                questionNumber={pages[currentPage - 1].scheduleQuestion!.questionId}
                errorMessage={getFieldErrorMessage(
                  pages[currentPage - 1].scheduleQuestion!.questionId,
                )}
              >
                <TimeTable
                  dateRange={
                    pages[currentPage - 1].scheduleQuestion!.schedule.interviewTimeTable.dateRange
                  }
                  timeRange={
                    pages[currentPage - 1].scheduleQuestion!.schedule.interviewTimeTable.timeRange
                  }
                  value={field.value as Record<string, Array<string>>}
                  disabledSlots={
                    pages[currentPage - 1].scheduleQuestion!.schedule.interviewTimeTable
                      .disabledByDate
                  }
                  onChange={field.onChange}
                  mode={isEdit ? 'edit' : 'view'}
                />
              </QuestionLayout>
            )}
          />
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
