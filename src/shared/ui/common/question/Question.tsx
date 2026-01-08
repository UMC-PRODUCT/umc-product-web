import type { FileUploadAnswer, QuestionAnswerValue, QuestionUnion } from '@/shared/types/question'

import { Choice } from './choice/Choice'
import { FileUpload } from './fileUpload/FileUpload/FileUpload'
import { MultipleChoice } from './multipleChoice/MultipleChoice'
import { Text } from './text/Text'
import { TimeTable } from './timeTable/TimeTable'
import QuestionLayout from './QuestionLayout'

type QuestionMode = 'view' | 'edit'

interface QuestionProps {
  data: QuestionUnion
  value?: QuestionAnswerValue
  mode: QuestionMode
  onChange?: (questionId: number, newValue: QuestionAnswerValue) => void
  errorMessage?: string
}

export const Question = ({ data, value, onChange, errorMessage, mode }: QuestionProps) => {
  const handleValueChange = (newValue: QuestionAnswerValue) => {
    onChange?.(data.id, newValue)
  }

  const renderQuestionInput = () => {
    switch (data.type) {
      case 'text':
        return <Text value={value as string | undefined} onChange={handleValueChange} mode={mode} />

      case 'multipleChoice':
        return (
          <MultipleChoice
            options={data.options}
            value={value as Array<string> | undefined}
            onChange={handleValueChange}
            mode={mode}
          />
        )

      case 'timeTable':
        return (
          <TimeTable
            dates={data.dates}
            timeRange={data.timeRange}
            value={(value ?? {}) as Record<string, Array<string>>}
            disabledSlots={data.disabled ?? {}}
            onChange={handleValueChange}
            mode={mode}
          />
        )

      case 'fileUpload':
        return (
          <FileUpload
            value={value as FileUploadAnswer | undefined}
            onChange={handleValueChange}
            mode={mode}
          />
        )

      case 'choice':
        return (
          <Choice
            value={value as string | undefined}
            onChange={handleValueChange}
            options={data.options}
            mode={mode}
          />
        )

      default:
        return null
    }
  }

  return (
    <QuestionLayout
      isRequired={data.necessary}
      questionText={data.question}
      questionNumber={data.questionNumber}
      errorMessage={errorMessage}
    >
      {renderQuestionInput()}
    </QuestionLayout>
  )
}
