import { useState } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import LeaveConfirmModal from '@/features/apply/components/modals/CautionLeave'
import SubmitConfirmModal from '@/features/apply/components/modals/CautionSubmit'
import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { RECRUITMENT_INFO } from '@/shared/constants/recruitment'
import { useAutoSave } from '@/shared/hooks/useAutoSave'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { formatDateTimeKorean, scrollToTop } from '@/shared/utils'

import ResumeContent from '../components/ResumeContent'
import { applyKeys } from '../domain/queryKeys'
import { useApplyMutation } from '../hooks/useApplyMutation'
import {
  useGetApplicationAnswer,
  useGetApplicationQuestions,
} from '../hooks/useGetApplicationQuery'
import { useUnsavedChangesBlocker } from '../hooks/useUnsavedChangeBlocker'
import { findFirstErrorPageIndex, getPageRequiredFieldIds, getSubmissionItems } from '../utils'
import { useResumeForm } from './resume/useResumeForm'

const AUTO_SAVE_INTERVAL_MS = 60_000

type FormValues = Record<string, unknown>

interface ResumeProps {
  currentPage: number
  onPageChange: (nextPage: number) => void
}

const ResumeContentPage = ({ currentPage, onPageChange }: ResumeProps) => {
  const { schoolName, generation } = RECRUITMENT_INFO
  const { recruitmentId, resumeId } = useParams({ from: '/(app)/apply/$recruitmentId/$resumeId/' })
  const { data: questionsData } = useGetApplicationQuestions(recruitmentId)
  const { data: answerData } = useGetApplicationAnswer(recruitmentId, resumeId)
  const { usePatchApplication, useSubmitApplication } = useApplyMutation()
  const { mutate: patchApplication } = usePatchApplication()
  const { mutate: submitApplication } = useSubmitApplication()
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const questionDataForForm = questionsData.result
  const resumeForm = useResumeForm(questionDataForForm, answerData.result)

  const {
    control,
    trigger,
    getValues,
    setValue,
    clearErrors,
    errors,
    isDirty,
    isFormIncomplete,
    resolvedPages,
    defaultValues,
  } = resumeForm

  const totalPages = resolvedPages.length
  const currentPageIndex = Math.max(0, Math.min(currentPage - 1, totalPages - 1))
  const currentPageData = resolvedPages[currentPageIndex] ?? resolvedPages[0]
  const displayLastSavedTime = (() => {
    const raw = answerData.result.lastSavedAt
    if (!raw) return null
    const savedDate = new Date(raw)
    if (Number.isNaN(savedDate.getTime())) return null
    return formatDateTimeKorean(savedDate)
  })()
  const queryClient = useQueryClient()
  useBeforeUnload(isDirty)
  const navigationBlocker = useUnsavedChangesBlocker(isDirty)

  const { handleSave } = useAutoSave({
    getValues,
    onSave: (formValues) => {
      const answers = getSubmissionItems(resolvedPages, formValues, defaultValues)
      patchApplication(
        { recruitmentId, formResponseId: resumeId, items: answers },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: applyKeys.getApplicationAnswer(recruitmentId, resumeId).queryKey,
            })
          },
        },
      )
    },
    interval: AUTO_SAVE_INTERVAL_MS,
  })

  const navigateToFirstErrorPage = (formErrors: FieldErrors<FormValues>) => {
    const errorPageIndex = findFirstErrorPageIndex(formErrors, resolvedPages)

    if (errorPageIndex !== -1) {
      onPageChange(errorPageIndex + 1)
      scrollToTop()
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

  const onSubmit = () => {
    handleSave()
    submitApplication(
      {
        recruitmentId,
        formResponseId: resumeId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: applyKeys.getApplicationAnswer(recruitmentId, resumeId).queryKey,
          })
          setIsSubmitModalOpen(false)
        },
        onError: () => {
          navigateToFirstErrorPage(errors)
        },
      },
    )
  }

  return (
    <PageLayout>
      <Flex maxWidth="956px">
        <PageTitle title={`UMC ${schoolName} ${generation} 지원서`} />
      </Flex>

      <ResumeContent
        pages={resolvedPages}
        formData={questionDataForForm}
        displayLastSavedTime={displayLastSavedTime}
        handleSave={handleSave}
        control={control}
        setValue={setValue}
        clearErrors={clearErrors}
        errors={errors}
        currentPage={currentPage}
        totalPages={totalPages}
        isFormIncomplete={isFormIncomplete}
        openSubmitModal={openSubmitModal}
        handlePageNavigation={handlePageNavigation}
        isEdit={true}
      />
      {isSubmitModalOpen && (
        <SubmitConfirmModal
          onClose={closeSubmitModal}
          onSubmit={onSubmit}
          onAllowNavigate={navigationBlocker.allowNextNavigationOnce}
        />
      )}

      {navigationBlocker.isOpen && (
        <LeaveConfirmModal onClose={navigationBlocker.stay} onMove={navigationBlocker.leave} />
      )}
    </PageLayout>
  )
}

export const Resume = ({ currentPage, onPageChange }: ResumeProps) => (
  <AsyncBoundary fallback={<SuspenseFallback label="지원서를 불러오는 중입니다." />}>
    <ResumeContentPage currentPage={currentPage} onPageChange={onPageChange} />
  </AsyncBoundary>
)
