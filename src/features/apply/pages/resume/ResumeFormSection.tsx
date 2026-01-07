import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

import { Question } from '../../components/question/Question'
import ResumeNavigation from '../../components/ResumeNavigation'
import type { QuestionUnion } from '../../type/question'

type ResumeFormSectionProps = {
  currentQuestions: Array<QuestionUnion>
  control: Control<Record<string, unknown>>
  errors: FieldErrors<Record<string, unknown>>
  page: number
  totalPages: number
  isFormIncomplete: boolean
  onOpenSubmitModal: () => void
  onPageChange: (next: number) => void
}

export default function ResumeFormSection({
  currentQuestions,
  control,
  errors,
  page,
  totalPages,
  isFormIncomplete,
  onOpenSubmitModal,
  onPageChange,
}: ResumeFormSectionProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {currentQuestions.map((q) => (
        <Flex key={q.id} flexDirection="column" gap={8} width="100%">
          <Controller
            name={`${q.id}`}
            control={control}
            rules={{
              required: q.necessary ? '응답 필수 항목입니다.' : false,
            }}
            render={({ field }) => (
              <Question
                data={q}
                value={field.value}
                onChange={(_, val) => field.onChange(val, { shouldDirty: true, shouldTouch: true })}
                errorMessage={errors[`${q.id}`]?.message}
              />
            )}
          />
        </Flex>
      ))}

      <ResumeNavigation page={page} totalPages={totalPages} onPageChange={onPageChange} />

      <Flex justifyContent="center" css={{ marginTop: '40px' }}>
        <Button
          type="button"
          label="지원하기"
          tone={isFormIncomplete ? 'gray' : 'lime'}
          disabled={isFormIncomplete}
          onClick={onOpenSubmitModal}
        />
      </Flex>
    </form>
  )
}
