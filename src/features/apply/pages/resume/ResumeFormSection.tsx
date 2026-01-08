import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import type { QuestionAnswerValue } from '@/shared/types/question'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Question } from '@/shared/ui/common/question/Question'
import ResumeNavigation from '@/shared/ui/common/ResumeNavigation'

import type { QuestionUnion } from '../../types/question'

type FormValues = Record<string, unknown>

interface ResumeFormSectionProps {
  questions: Array<QuestionUnion>
  control: Control<FormValues>
  errors: FieldErrors<FormValues>
  currentPage: number
  totalPages: number
  isSubmitDisabled: boolean
  onOpenSubmitModal: () => void
  onPageChange: (nextPage: number) => void
}

const REQUIRED_FIELD_MESSAGE = '응답 필수 항목입니다.'
const SUBMIT_BUTTON_MARGIN_TOP = '40px'

const ResumeFormSection = ({
  questions,
  control,
  errors,
  currentPage,
  totalPages,
  isSubmitDisabled,
  onOpenSubmitModal,
  onPageChange,
}: ResumeFormSectionProps) => {
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  const getFieldErrorMessage = (questionId: number): string | undefined => {
    const fieldError = errors[String(questionId)]
    return fieldError?.message
  }

  const submitButtonTone = isSubmitDisabled ? 'gray' : 'lime'

  return (
    <form onSubmit={handleFormSubmit}>
      {questions.map((question) => (
        <Flex key={question.id} flexDirection="column" gap={8} width="100%">
          <Controller
            name={String(question.id)}
            control={control}
            rules={{
              required: question.necessary ? REQUIRED_FIELD_MESSAGE : false,
            }}
            render={({ field }) => (
              <Question
                mode="edit"
                data={question}
                value={field.value as QuestionAnswerValue}
                onChange={(_, newValue) =>
                  field.onChange(newValue, { shouldDirty: true, shouldTouch: true })
                }
                errorMessage={getFieldErrorMessage(question.id)}
              />
            )}
          />
        </Flex>
      ))}

      <ResumeNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <Flex justifyContent="center" css={{ marginTop: SUBMIT_BUTTON_MARGIN_TOP }}>
        <Button
          type="button"
          label="지원하기"
          tone={submitButtonTone}
          disabled={isSubmitDisabled}
          onClick={onOpenSubmitModal}
        />
      </Flex>
    </form>
  )
}

export default ResumeFormSection
