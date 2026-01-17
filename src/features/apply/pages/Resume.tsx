import { useMemo, useState } from 'react'
import type { FieldErrors } from 'react-hook-form'

import LeaveConfirmModal from '@/features/apply/components/modals/CautionLeave'
import SubmitConfirmModal from '@/features/apply/components/modals/CautionSubmit'
import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { RECRUITMENT_INFO } from '@/shared/constants/recruitment'
import { useAutoSave } from '@/shared/hooks/useAutoSave'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import { scrollToTop } from '@/shared/utils/scrollToTop'

import ResumeContent from '../components/ResumeContent'
import type { QuestionList } from '../domain/model'
import { useUnsavedChangesBlocker } from '../hooks/useUnsavedChangeBlocker'
import {
  findFirstErrorPageIndex,
  getAllQuestionFieldIds,
  getPageRequiredFieldIds,
  getSubmissionValues,
} from '../utils'
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
      scrollToTop()
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
        scrollToTop()
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

      <ResumeContent
        questionData={questionData}
        displayLastSavedTime={displayLastSavedTime}
        handleSave={handleSave}
        currentQuestions={currentQuestions}
        partQuestions={partQuestions}
        control={control}
        setValue={setValue}
        clearErrors={clearErrors}
        errors={errors}
        currentPage={currentPage}
        totalPages={totalPages}
        isFormIncomplete={isFormIncomplete}
        openSubmitModal={openSubmitModal}
        handlePageNavigation={handlePageNavigation}
      />
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
