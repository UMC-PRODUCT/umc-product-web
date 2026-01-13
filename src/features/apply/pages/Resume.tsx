import { useMemo, useState } from 'react'
import type { FieldErrors } from 'react-hook-form'

import LeaveConfirmModal from '@/features/apply/components/modals/CautionLeave'
import SubmitConfirmModal from '@/features/apply/components/modals/CautionSubmit'
import * as S from '@/features/apply/components/ResumePage.style'
import { useAutoSave } from '@/features/apply/hooks/useAutoSave'
import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { RECRUITMENT_INFO } from '@/shared/constants/recruitment'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/umc'
import { Badge } from '@/shared/ui/common/Badge'
import { Flex } from '@/shared/ui/common/Flex'

import { useUnsavedChangesBlocker } from '../hooks/useUnsavedChangeBlocker'
import type { QuestionList, QuestionPage, QuestionUnion } from '../types/question'
import { findPartQuestion } from '../utils/findPartQuestion'
import { getSelectedPartsFromAnswer } from '../utils/getSelectedPartsFromAnswer'
import ResumeFormSection from './resume/ResumeFormSection'
import { useResumeForm } from './resume/useResumeForm'

const AUTO_SAVE_INTERVAL_MS = 60_000

type FormValues = Record<string, unknown>

interface ResumeProps {
  questionData: QuestionList & { lastSavedTime?: string }
  currentPage: number
  onPageChange: (nextPage: number) => void
}

function calculateCurrentPageIndex(pageNumber: number, totalPages: number): number {
  const validatedPageNumber = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1
  const maxPageIndex = Math.max(totalPages - 1, 0)
  return Math.min(Math.max(validatedPageNumber - 1, 0), maxPageIndex)
}

function findFirstErrorPageIndex(
  formErrors: FieldErrors<FormValues>,
  pages: Array<QuestionPage>,
): number {
  const errorFieldIds = Object.keys(formErrors)
  if (errorFieldIds.length === 0) return -1

  const firstErrorFieldId = errorFieldIds[0]
  return pages.findIndex((page: QuestionPage) =>
    (page.questions ?? []).some(
      (question: QuestionUnion) => String(question.id) === firstErrorFieldId,
    ),
  )
}

function getAllQuestionFieldIds(pages: Array<QuestionPage>): Array<string> {
  return pages.flatMap((page) =>
    (page.questions ?? []).map((question: QuestionUnion) => String(question.id)),
  )
}

function getPageRequiredFieldIds(page: QuestionPage | undefined): Array<string> {
  if (!page?.questions) return []
  return page.questions
    .filter((question: QuestionUnion) => question.necessary)
    .map((question: QuestionUnion) => String(question.id))
}

function getSelectedPartsForSubmission(
  questionData: QuestionList,
  formValues: FormValues,
): Array<PartType> {
  const partQuestionId = 3
  const partQuestion = findPartQuestion(questionData, partQuestionId)
  if (!partQuestion) return []

  const order: Array<1 | 2> = [1, 2]
  const requiredCount = Math.max(partQuestion.options.length, 1)
  const effectiveOrder = order.slice(0, requiredCount)
  const answerValue = formValues[String(partQuestionId)]
  return getSelectedPartsFromAnswer(answerValue, effectiveOrder)
}

function getSubmissionValues(questionData: QuestionList, formValues: FormValues): FormValues {
  const baseQuestionIds = questionData.pages.flatMap((page) =>
    (page.questions ?? []).map((question) => String(question.id)),
  )
  const selectedParts = getSelectedPartsForSubmission(questionData, formValues)
  const partQuestionIds = selectedParts.flatMap((part) =>
    questionData.partQuestionBank[part].flatMap((partPage) =>
      partPage.questions.map((question) => String(question.id)),
    ),
  )

  const allowedIds = new Set([...baseQuestionIds, ...partQuestionIds])
  return Object.keys(formValues).reduce<FormValues>((acc, key) => {
    if (allowedIds.has(key)) {
      acc[key] = formValues[key]
    }
    return acc
  }, {})
}

const Resume = ({ questionData, currentPage, onPageChange }: ResumeProps) => {
  const { schoolName, generation } = RECRUITMENT_INFO

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    clearErrors,
    reset,
    errors,
    isDirty,
    isFormIncomplete,
    resolvedPages,
  } = useResumeForm(questionData)

  const partQuestions = useMemo(
    () =>
      Object.values(questionData.partQuestionBank).flatMap((partPages) =>
        partPages.flatMap((partPage) => partPage.questions),
      ),
    [questionData.partQuestionBank],
  )

  const totalPages = resolvedPages.length
  const currentPageIndex = calculateCurrentPageIndex(currentPage, totalPages)
  const currentPageData = resolvedPages[currentPageIndex] ?? resolvedPages[0]
  const currentQuestions = useMemo(() => currentPageData.questions ?? [], [currentPageData])

  useBeforeUnload(isDirty)
  const navigationBlocker = useUnsavedChangesBlocker(isDirty)

  const { lastSavedTime, handleSave } = useAutoSave({
    getValues,
    interval: AUTO_SAVE_INTERVAL_MS,
  })
  const displayLastSavedTime = lastSavedTime || questionData.lastSavedTime

  const navigateToFirstErrorPage = (formErrors: FieldErrors<FormValues>) => {
    const errorPageIndex = findFirstErrorPageIndex(formErrors, resolvedPages)

    if (errorPageIndex !== -1) {
      onPageChange(errorPageIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFinalSubmit = async () => {
    const allFieldIds = getAllQuestionFieldIds(resolvedPages)
    const isValid = await trigger(allFieldIds)

    if (isValid) {
      handleSubmit((formValues) => {
        const submissionValues = getSubmissionValues(questionData, formValues)
        console.log('최종 제출 데이터:', submissionValues)
        setIsSubmitModalOpen(false)
        reset(submissionValues)
      })()
    } else {
      setIsSubmitModalOpen(false)
      navigateToFirstErrorPage(errors)
    }
  }

  const openSubmitModal = () => setIsSubmitModalOpen(true)
  const closeSubmitModal = () => setIsSubmitModalOpen(false)

  const handlePageNavigation = async (nextPage: number) => {
    if (nextPage > currentPage) {
      const currentPageFieldIds = getPageRequiredFieldIds(currentPageData)
      const isCurrentPageValid =
        currentPageFieldIds.length === 0 ||
        (await trigger(currentPageFieldIds, { shouldFocus: true }))

      if (!isCurrentPageValid) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }

    navigationBlocker.allowNextNavigationOnce()
    onPageChange(nextPage)
  }

  return (
    <PageLayout>
      <Flex maxWidth="956px">
        <PageTitle title={`UMC ${schoolName} ${generation} 지원서`} />
      </Flex>

      <S.BorderedSection alignItems="flex-start">{questionData.description}</S.BorderedSection>

      <S.BorderedSection>
        <Flex justifyContent="flex-end">
          <Flex justifyContent="flex-end" alignItems="center" gap="18px">
            {displayLastSavedTime && (
              <S.LastSavedTime>{displayLastSavedTime}에 마지막으로 저장됨.</S.LastSavedTime>
            )}
            <Badge
              typo="B3.Md"
              tone="lime"
              variant="outline"
              onClick={handleSave}
              css={{
                cursor: 'pointer',
                [media.down(theme.breakPoints.tablet)]: {
                  ...theme.typography.B4.Md,
                },
              }}
            >
              저장하기
            </Badge>
          </Flex>
        </Flex>
      </S.BorderedSection>

      <S.BorderedSection>
        <ResumeFormSection
          questions={currentQuestions}
          partQuestions={partQuestions}
          control={control}
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          currentPage={currentPage}
          totalPages={totalPages}
          isSubmitDisabled={isFormIncomplete}
          onOpenSubmitModal={openSubmitModal}
          onPageChange={handlePageNavigation}
        />
      </S.BorderedSection>

      {isSubmitModalOpen && (
        <SubmitConfirmModal
          onClose={closeSubmitModal}
          onSubmit={handleFinalSubmit}
          onAllowNavigate={navigationBlocker.allowNextNavigationOnce}
        />
      )}

      {navigationBlocker.isOpen && (
        <LeaveConfirmModal onClose={navigationBlocker.stay} onMove={navigationBlocker.leave} />
      )}
    </PageLayout>
  )
}

export default Resume
