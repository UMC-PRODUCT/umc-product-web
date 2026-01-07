import type { QuestionPage } from '../type/question'
import { Question } from './question/Question'

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
      {data.questions.map((q) => {
        return (
          <Question
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
