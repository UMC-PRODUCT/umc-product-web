import RequiredIcon from '@/shared/assets/icons/necessary.svg?react'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'

import * as S from './QuestionLayout.style'

interface QuestionLayoutProps {
  children: React.ReactNode
  questionText: string
  questionNumber: number
  isRequired: boolean
  errorMessage?: string
}

const QuestionLayout = ({
  children,
  questionText,
  questionNumber,
  isRequired,
  errorMessage,
}: QuestionLayoutProps) => {
  const formattedQuestion = `${questionNumber}. ${questionText}`

  return (
    <S.Container alignItems="flex-start">
      <S.Header>
        <div className="title">
          {formattedQuestion}
          {isRequired && <RequiredIcon />}
        </div>
        {errorMessage && <ErrorMessage typo="B5.Md" errorMessage={errorMessage} />}
      </S.Header>
      {children}
    </S.Container>
  )
}

export default QuestionLayout
