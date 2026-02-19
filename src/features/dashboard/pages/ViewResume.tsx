import { useMemo } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'

import PartDivider from '@/features/apply/components/PartDivider'
import type { QuestionAnswerValue } from '@/features/apply/domain'
import {
  useGetRecruitmentApplicationAnswer,
  useGetRecruitmentApplicationForm,
} from '@/features/apply/hooks/useGetApplicationQuery'
import { buildDefaultValuesFromQuestions } from '@/features/apply/utils'
import * as S from '@/features/dashboard/components/ViewResumePage.style'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Question } from '@/shared/ui/common/Question/Question'
import QuestionLayout from '@/shared/ui/common/Question/QuestionLayout'
import { TimeTable } from '@/shared/ui/common/Question/TimeTable/TimeTable'
import ResumeNavigation from '@/shared/ui/common/ResumeNavigation'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

interface ViewResumeProps {
  currentPage: number
  onPageChange: (nextPage: number) => void
}

const ViewResumeContent = ({ currentPage, onPageChange }: ViewResumeProps) => {
  const { recruitmentId, resumeId } = useParams({
    from: '/(app)/dashboard/$recruitmentId/$resumeId/',
  })
  const navigate = useNavigate()
  const { data: questionsData } = useGetRecruitmentApplicationForm(recruitmentId)
  const { data: answerData } = useGetRecruitmentApplicationAnswer(recruitmentId, resumeId)
  const normalizedAnswers = useMemo(
    () => buildDefaultValuesFromQuestions(questionsData.result, answerData?.result),
    [questionsData, answerData],
  )

  const answeredQuestionIds = useMemo(() => {
    const answers = answerData?.result.answers ?? []
    return new Set(answers.map((entry) => String(entry.questionId)))
  }, [answerData])

  const pages = questionsData.result.pages
  const answerOnlyPages = useMemo(() => {
    return pages.filter((page) => {
      const questions = page.questions ?? []
      const hasQuestionAnswer = questions.some((q) => answeredQuestionIds.has(String(q.questionId)))
      const hasScheduleAnswer = page.scheduleQuestion
        ? answeredQuestionIds.has(String(page.scheduleQuestion.questionId))
        : false
      const hasPartAnswer = (page.partQuestions ?? []).some((group) =>
        group.questions.some((q) => answeredQuestionIds.has(String(q.questionId))),
      )
      return hasQuestionAnswer || hasScheduleAnswer || hasPartAnswer
    })
  }, [pages, answeredQuestionIds])

  const totalPages = answerOnlyPages.length
  if (totalPages === 0) {
    return (
      <PageLayout>
        <Flex
          maxWidth="956px"
          justifyContent="space-between"
          css={{ flexDirection: 'column', gap: '20px' }}
        >
          <PageTitle title={`${questionsData.result.noticeTitle}`} />
          <Button
            tone="lime"
            variant="outline"
            typo="B4.Sb"
            label=" ← 뒤로가기"
            onClick={() => navigate({ to: '/dashboard' })}
            css={{ padding: '5.5px 14px', width: '122px', height: '40px' }}
          />
        </Flex>
        <S.BorderSection alignItems="flex-start">
          {questionsData.result.noticeContent}
        </S.BorderSection>
        <S.BorderSection>
          <Flex justifyContent="center" width="100%">
            제출된 답변이 없습니다.
          </Flex>
        </S.BorderSection>
      </PageLayout>
    )
  }

  const currentPageIndex = Math.max(0, Math.min(currentPage - 1, totalPages - 1))
  const currentPageData = answerOnlyPages[currentPageIndex]
  const currentQuestions = (currentPageData.questions ?? []).filter((q) =>
    answeredQuestionIds.has(String(q.questionId)),
  )
  const currentScheduleQuestion =
    currentPageData.scheduleQuestion &&
    answeredQuestionIds.has(String(currentPageData.scheduleQuestion.questionId))
      ? currentPageData.scheduleQuestion
      : null
  const currentPartQuestions = (currentPageData.partQuestions ?? [])
    .map((group) => ({
      ...group,
      questions: group.questions.filter((q) => answeredQuestionIds.has(String(q.questionId))),
    }))
    .filter((group) => group.questions.length > 0)
  const baseQuestionCount = currentQuestions.length
  const scheduleQuestionCount = currentScheduleQuestion ? 1 : 0
  const flatPartQuestions = currentPartQuestions.flatMap((group) =>
    group.questions.map((question) => ({ group, question })),
  )

  const pageTitle = `${questionsData.result.noticeTitle}`
  const submittedAt = answerData?.result.submittedAt
  const submittedTimeText = submittedAt
    ? `${new Date(submittedAt).getFullYear()}년 ${(new Date(submittedAt).getMonth() + 1)
        .toString()
        .padStart(2, '0')}월 ${new Date(submittedAt)
        .getDate()
        .toString()
        .padStart(2, '0')}일 ${new Date(submittedAt)
        .getHours()
        .toString()
        .padStart(2, '0')}:${new Date(submittedAt)
        .getMinutes()
        .toString()
        .padStart(2, '0')}에 제출됨.`
    : ''

  const onBack = () => {
    navigate({
      to: '/dashboard',
    })
  }
  return (
    <PageLayout>
      <Flex maxWidth="956px" justifyContent="space-between">
        <PageTitle title={pageTitle} />
        <Button
          tone="lime"
          variant="outline"
          typo="B4.Sb"
          label=" ← 뒤로가기"
          onClick={onBack}
          css={{ padding: '5.5px 14px', width: '122px', height: '40px' }}
        />
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
        {currentScheduleQuestion && (
          <QuestionLayout
            questionNumber={baseQuestionCount + 1}
            questionText={currentScheduleQuestion.questionText}
            isRequired={currentScheduleQuestion.required}
          >
            <TimeTable
              dateRange={currentScheduleQuestion.schedule.dateRange}
              timeRange={currentScheduleQuestion.schedule.timeRange}
              value={
                normalizedAnswers[String(currentScheduleQuestion.questionId)] as Record<
                  string,
                  Array<string>
                >
              }
              disabledSlots={
                Array.isArray(
                  (
                    currentScheduleQuestion.schedule as {
                      disabled?: Array<{ date: string; times: Array<string> }>
                    }
                  ).disabled,
                )
                  ? ((
                      currentScheduleQuestion.schedule as {
                        disabled?: Array<{ date: string; times: Array<string> }>
                      }
                    ).disabled ?? [])
                  : currentScheduleQuestion.schedule.disabledByDate
              }
              mode="view"
            />
          </QuestionLayout>
        )}
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
              value={normalizedAnswers[String(question.questionId)] as QuestionAnswerValue}
            />
          </Flex>
        ))}

        {currentPartQuestions.map((partGroup, groupIndex) => {
          const groupQuestions = flatPartQuestions.filter((item) => item.group === partGroup)
          return (
            <Flex
              key={`${partGroup.part}-${groupIndex}`}
              flexDirection="column"
              gap={12}
              width="100%"
            >
              <PartDivider label={partGroup.part} />
              {groupQuestions.map((item) => {
                const partIndex = flatPartQuestions.indexOf(item)
                return (
                  <Flex key={item.question.questionId} flexDirection="column" gap={8} width="100%">
                    <Question
                      questionId={item.question.questionId}
                      questionNumber={baseQuestionCount + scheduleQuestionCount + partIndex + 1}
                      type={item.question.type}
                      question={item.question.questionText}
                      options={item.question.options}
                      required={item.question.required}
                      maxSelectCount={item.question.maxSelectCount}
                      preferredPartOptions={item.question.preferredPartOptions}
                      mode="view"
                      value={
                        normalizedAnswers[String(item.question.questionId)] as QuestionAnswerValue
                      }
                    />
                  </Flex>
                )
              })}
            </Flex>
          )
        })}

        <ResumeNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </S.BorderSection>
    </PageLayout>
  )
}

export const ViewResume = ({ currentPage, onPageChange }: ViewResumeProps) => (
  <AsyncBoundary fallback={<SuspenseFallback label="지원서를 불러오는 중입니다." />}>
    <ViewResumeContent currentPage={currentPage} onPageChange={onPageChange} />
  </AsyncBoundary>
)
