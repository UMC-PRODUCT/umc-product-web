import { Question } from '@/shared/ui/common/question/Question'

import type { QuestionPage } from '../types/question'

export const ResumeForm = ({
  data,
  answers,
  onChange,
}: {
  data: QuestionPage
  answers: Record<number, any>
  onChange: (questionId: number, value: any) => void
}) => {
  return (
    <>
      {(data.questions ?? []).map((q) => {
        return (
          <Question
            mode="edit"
            key={q.id}
            data={q}
            value={answers[q.id]}
            onChange={(value) => onChange(q.id, value)}
          />
        )
      })}
    </>
  )
}
