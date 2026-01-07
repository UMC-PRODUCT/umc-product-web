import type { QuestionUnion } from '@/features/apply/type/question'

import { Choice } from './choice/Choice'
import { FileUpload } from './fileUpload/FileUpload/FileUpload'
import { MultipleChoice } from './multipleChoice/MultipleChoice'
import { Text } from './text/Text'
import { TimeTable } from './timeTable/TimeTable'
import QuestionLayout from './QuestionLayout'

type QuestionProps = {
  data: QuestionUnion
  value?: any
  mode: 'view' | 'edit'
  onChange?: (id: number, value: any) => void
  errorMessage?: string | undefined
}

export const Question = ({ data, value, onChange, errorMessage, mode }: QuestionProps) => {
  const handleChange = (newValue: any) => {
    onChange?.(data.id, newValue)
  }
  return (
    <QuestionLayout
      necessary={data.necessary}
      question={data.question}
      questionNumber={data.questionNumber}
      errorMessage={errorMessage}
    >
      {data.type === 'text' && <Text value={value} onChange={handleChange} mode={mode} />}
      {data.type === 'multipleChoice' && (
        <MultipleChoice options={data.options} value={value} onChange={handleChange} mode={mode} />
      )}
      {data.type === 'timeTable' && (
        <TimeTable
          dates={data.dates}
          timeRange={data.timeRange}
          value={value || {}}
          disabledSlots={data.disabled || {}}
          onChange={handleChange}
          mode={mode}
        />
      )}
      {data.type === 'fileUpload' && (
        <FileUpload value={value} onChange={handleChange} mode={mode} />
      )}
      {data.type === 'choice' && (
        <Choice value={value} onChange={handleChange} options={data.options} mode={mode} />
      )}
    </QuestionLayout>
  )
}
