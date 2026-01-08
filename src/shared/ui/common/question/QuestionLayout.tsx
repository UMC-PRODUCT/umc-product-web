import * as S from '@/features/apply/components/shared'
import Necessary from '@/shared/assets/icons/necessary.svg?react'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'

interface QuestionLayoutProps {
  children: React.ReactNode
  question: string
  questionNumber: number
  necessary: boolean
  errorMessage?: string | undefined
}

export default function QuestionLayout({
  children,
  question,
  questionNumber,
  necessary,
  errorMessage,
}: QuestionLayoutProps) {
  return (
    <S.QuestionLayout alignItems="flex-start">
      <S.QuestionTitle>
        <div className="title">
          {`${questionNumber}. ${question}`} {necessary ? <Necessary /> : ''}
        </div>
        {errorMessage && <ErrorMessage typo="B5.Md" errorMessage={errorMessage} />}
      </S.QuestionTitle>
      {children}
    </S.QuestionLayout>
  )
}
