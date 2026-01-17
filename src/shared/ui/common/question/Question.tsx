import type {
  FileUploadAnswer,
  QuestionAnswerValue,
  QuestionUnion,
} from '@features/apply/domain/model'

import type { QuestionMode } from '@/shared/types/form'
import type { PartType } from '@/shared/types/umc'

import { Choice } from './choice/Choice'
import { FileUpload } from './fileUpload/FileUpload/FileUpload'
import { LongText } from './longText/LongText'
import { MultipleChoice } from './multipleChoice/MultipleChoice'
import PartChoice from './partChoice/PartChoice'
import { Text } from './text/Text'
import { TimeTable } from './timeTable/TimeTable'
import QuestionLayout from './QuestionLayout'

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
            options={data.options}
            value={value as Array<string> | undefined}
            onChange={handleValueChange}
            mode={mode}
          />
        )

      case 'SCHEDULE':
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
            value={value as string | undefined}
            onChange={handleValueChange}
            options={data.options}
            mode={mode}
          />
        )

      case 'PART':
        return (
          <PartChoice
            value={value as Array<{ id: number; answer: PartType }> | undefined}
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
