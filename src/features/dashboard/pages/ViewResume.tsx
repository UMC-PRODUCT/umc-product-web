import { useMemo } from 'react'
import { useParams } from '@tanstack/react-router'

import type { QuestionAnswerValue } from '@/features/apply/domain'
import {
  useGetApplicationAnswer,
  useGetApplicationQuestions,
} from '@/features/apply/hooks/useGetApplicationQuery'
import * as S from '@/features/dashboard/components/ViewResumePage.style'
import AsyncBoundary from '@/shared/components/AsyncBoundary/AsyncBoundary'
import { RECRUITMENT_INFO } from '@/shared/constants/recruitment'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import { Question } from '@/shared/ui/common/question/Question'
import ResumeNavigation from '@/shared/ui/common/ResumeNavigation'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

interface ViewResumeProps {
  currentPage: number
  onPageChange: (nextPage: number) => void
}

const ViewResumeContent = ({ currentPage, onPageChange }: ViewResumeProps) => {
  const { schoolName, generation } = RECRUITMENT_INFO
  const { recruitmentId, resumeId } = useParams({
    from: '/(app)/dashboard/$recruitmentId/$resumeId/',
  })

  const { data: questionsData } = useGetApplicationQuestions(recruitmentId)
  const { data: answerData } = useGetApplicationAnswer(recruitmentId, resumeId)
  const answerMap = useMemo(() => {
    const answers = Array.isArray(answerData.result.answer) ? answerData.result.answer : []
    return answers.reduce<Map<number, QuestionAnswerValue>>((acc, entry) => {
      acc.set(entry.questionId, entry.value as unknown as QuestionAnswerValue)
      return acc
    }, new Map<number, QuestionAnswerValue>())
  }, [answerData])
  const totalPages = 3

  const currentPageIndex = Math.max(0, Math.min(currentPage - 1, totalPages - 1))
  const currentPageData = questionsData.result.pages[currentPageIndex]
  const currentQuestions = currentPageData.questions

  const pageTitle = `UMC ${schoolName} ${generation} 지원서`
  const submittedTimeText = '2024.06.01 14:30에 제출됨.' // TODO: 지원서 제출 시간 API 연동 필요

  return (
    <PageLayout>
      <Flex maxWidth="956px">
        <PageTitle title={pageTitle} />
      </Flex>

      <S.BorderSection alignItems="flex-start">
        {questionsData.result.noticeContent}
      </S.BorderSection>

      <S.BorderSection>
        <Flex justifyContent="flex-end">
          <Flex justifyContent="flex-end" alignItems="center" gap="18px">
            <span className="last-saved-time">{submittedTimeText}</span>
          </Flex>
        </Flex>
      </S.BorderSection>

      <S.BorderSection>
        {currentQuestions.map((question, idx) => (
          <Flex key={question.questionId} flexDirection="column" gap={8} width="100%">
            <Question
              questionId={question.questionId}
              questionNumber={idx + 1}
              type={question.type}
              question={question.questionText}
              options={question.options}
              required={question.required}
              maxSelectCount={question.maxSelectCount}
              preferredPartOptions={question.preferredPartOptions}
              mode="view"
              value={answerMap.get(question.questionId)}
            />
          </Flex>
        ))}

        <ResumeNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </S.BorderSection>
    </PageLayout>
  )
}

const ViewResume = ({ currentPage, onPageChange }: ViewResumeProps) => (
  <AsyncBoundary fallback={<SuspenseFallback label="지원서를 불러오는 중입니다." />}>
    <ViewResumeContent currentPage={currentPage} onPageChange={onPageChange} />
  </AsyncBoundary>
)

export default ViewResume
