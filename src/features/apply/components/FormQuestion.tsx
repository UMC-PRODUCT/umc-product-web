import * as S from '@/features/apply/components/shared'
import Necessary from '@/shared/assets/icons/necessary.svg?react'

export default function FormQuestion({
  children,
  question,
  questionNumber,
  necesssaruy,
}: {
  children: React.ReactNode
  question: string
  questionNumber: number
  necesssaruy: boolean
}) {
  return (
    <S.QuestionLayout alignItems="flex-start">
      <S.QuestionTitle>
        {`${questionNumber}. ${question}`} {necesssaruy ? <Necessary /> : ''}
      </S.QuestionTitle>
      {children}
    </S.QuestionLayout>
  )
}
