import * as S from '@/features/apply/components/shared'
import Necessary from '@/shared/assets/icons/necessary.svg?react'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'

export default function QuestionLayout({
  children,
  question,
  questionNumber,
  necessary,
  errorMessage,
}: {
  children: React.ReactNode
  question: string
  questionNumber: number
  necessary: boolean
  errorMessage?: string | undefined
}) {
  return (
    <S.QuestionLayout alignItems="flex-start">
      <S.QuestionTitle>
        <Flex>
          {`${questionNumber}. ${question}`} {necessary ? <Necessary /> : ''}
        </Flex>
        {errorMessage && <ErrorMessage typo="B5.Md" errorMessage={errorMessage} />}
      </S.QuestionTitle>
      {children}
    </S.QuestionLayout>
  )
}
