import type { FileUploadAnswer, QuestionAnswerValue, QuestionType } from '@/shared/types/apply'
import type { OptionAnswerValue, QuestionMode } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'

import { Choice } from './choice/Choice'
import { FileUpload } from './fileUpload/FileUpload/FileUpload'
import { LongText } from './longText/LongText'
import { MultipleChoice } from './multipleChoice/MultipleChoice'
import PartChoice from './partChoice/PartChoice'
import { Text } from './text/Text'
import QuestionLayout from './QuestionLayout'

type ChoiceOption = {
  optionId?: string
  content: string
  isOther?: boolean
}

type PartOption = {
  optionId?: string
  content: PartType
}

type QuestionOptions = Array<ChoiceOption | PartOption>

interface QuestionProps {
  questionId: number
  type: QuestionType
  question: string
  questionNumber: number
  required: boolean
  options: QuestionOptions
  value?: QuestionAnswerValue
  mode: QuestionMode
  onChange?: (questionId: number, newValue: QuestionAnswerValue) => void
  errorMessage?: string
  maxSelectCount: string | null
  preferredPartOptions: Array<{
    recruitmentPartId: string | number
    label: string
    value: PartType
  }> | null
}

export const Question = ({
  questionId,
  type,
  question,
  questionNumber,
  required,
  options,
  value,
  onChange,
  errorMessage,
  mode,
  maxSelectCount,
  preferredPartOptions,
}: QuestionProps) => {
  const handleValueChange = (newValue: QuestionAnswerValue) => {
    onChange?.(questionId, newValue)
  }
  const renderQuestionInput = () => {
    switch (type) {
      case 'LONG_TEXT':
        return (
          <LongText
            placeholder="자유롭게 작성해주세요."
            value={value as string | undefined}
            onChange={handleValueChange}
            mode={mode}
          />
        )
      case 'SHORT_TEXT':
        return <Text value={value as string | undefined} onChange={handleValueChange} mode={mode} />

      case 'CHECKBOX':
        return (
          <MultipleChoice
            options={options}
            value={value as OptionAnswerValue | undefined}
            onChange={handleValueChange}
            mode={mode}
          />
        )

      case 'PORTFOLIO':
        return (
          <FileUpload
            value={value as FileUploadAnswer | undefined}
            onChange={handleValueChange}
            mode={mode}
          />
        )

      case 'RADIO':
        return (
          <Choice
            value={value as OptionAnswerValue | undefined}
            onChange={handleValueChange}
            options={options as Array<ChoiceOption>}
            mode={mode}
          />
        )

      case 'PREFERRED_PART':
        return (
          <PartChoice
            value={value as Array<{ id: number; answer: PartType }> | undefined}
            onChange={handleValueChange}
            preferredPartOptions={preferredPartOptions!}
            mode={mode}
            maxSelectCount={maxSelectCount}
          />
        )

      default:
        return null
    }
  }

  return (
    <QuestionLayout
      isRequired={required}
      questionText={question}
      questionNumber={questionNumber}
      errorMessage={errorMessage}
    >
      {renderQuestionInput()}
    </QuestionLayout>
  )
}
