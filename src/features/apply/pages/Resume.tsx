import { useMemo, useState } from 'react'
import type { FieldErrors } from 'react-hook-form'

import LeaveConfirmModal from '@/features/apply/components/modals/CautionLeave'
import SubmitConfirmModal from '@/features/apply/components/modals/CautionSubmit'
import * as S from '@/features/apply/components/ResumePage.style'
import { useAutoSave } from '@/features/apply/hooks/useAutoSave'
import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { RECRUITMENT_INFO } from '@/shared/constants/recruitment'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'
import { Flex } from '@/shared/ui/common/Flex'

import type { QuestionList } from '../domain/model'
import { useUnsavedChangesBlocker } from '../hooks/useUnsavedChangeBlocker'
import {
  findFirstErrorPageIndex,
  getAllQuestionFieldIds,
  getPageRequiredFieldIds,
  getSubmissionValues,
} from '../utils'
import ResumeFormSection from './resume/ResumeFormSection'
import { useResumeForm } from './resume/useResumeForm'

const AUTO_SAVE_INTERVAL_MS = 60_000

type FormValues = Record<string, unknown>

interface ResumeProps {
  questionData: QuestionList & { lastSavedTime?: string }
  currentPage: number
  onPageChange: (nextPage: number) => void
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
  const currentPageIndex = Math.max(0, Math.min(currentPage - 1, totalPages - 1))
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
    <S.PageLayout>
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
    </S.PageLayout>
  )
}

export default Resume
