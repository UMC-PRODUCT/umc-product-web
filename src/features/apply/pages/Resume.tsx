import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'

import LeaveConfirmModal from '@/features/apply/components/modals/CautionLeave'
import SubmitConfirmModal from '@/features/apply/components/modals/CautionSubmit'
import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { useAutoSave } from '@/shared/hooks/useAutoSave'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { applyKeys, dashboardKeys } from '@/shared/queryKeys'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { formatDateTimeKorean, scrollToTop } from '@/shared/utils'

import ResumeContent from '../components/ResumeContent'
import type { QuestionAnswerValue } from '../domain/model'
import { useApplyMutation } from '../hooks/useApplyMutation'
import {
  useGetRecruitmentApplicationAnswer,
  useGetRecruitmentApplicationForm,
} from '../hooks/useGetApplicationQuery'
import { useUnsavedChangesBlocker } from '../hooks/useUnsavedChangeBlocker'
import { getPageRequiredFieldIds, getSubmissionItems } from '../utils'
import { useResumeForm } from './resume/useResumeForm'

const AUTO_SAVE_INTERVAL_MS = 60_000

interface ResumeProps {
  currentPage: number
  onPageChange: (nextPage: number) => void
}

const ResumeContentPage = ({ currentPage, onPageChange }: ResumeProps) => {
  const { recruitmentId, resumeId } = useParams({ from: '/(app)/apply/$recruitmentId/$resumeId/' })
  const { data: questionsData } = useGetRecruitmentApplicationForm(recruitmentId)
  const { data: answerData } = useGetRecruitmentApplicationAnswer(recruitmentId, resumeId)
  const { usePatchApplication, useSubmitApplication } = useApplyMutation()
  const { mutate: patchApplication } = usePatchApplication()
  const { mutate: submitApplication } = useSubmitApplication()
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const questionDataForForm = questionsData.result
  const resumeForm = useResumeForm(questionDataForForm, answerData?.result)
  const navigate = useNavigate()
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
    const raw = answerData?.result.lastSavedAt
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
              queryKey: applyKeys.getRecruitmentApplicationAnswer(recruitmentId, resumeId),
            })
          },
        },
      )
    },
    interval: AUTO_SAVE_INTERVAL_MS,
  })

  const handlePortfolioImmediateSave = (questionId: number, nextValue: QuestionAnswerValue) => {
    const currentValues = getValues()
    const sanitizedValue =
      nextValue && typeof nextValue === 'object'
        ? {
            ...nextValue,
            files: Array.isArray((nextValue as { files?: Array<{ status?: unknown }> }).files)
              ? (nextValue as { files: Array<{ status?: unknown }> }).files.filter(
                  (file) => file.status === 'success',
                )
              : [],
          }
        : nextValue
    const mergedValues = { ...currentValues, [String(questionId)]: sanitizedValue }
    const answers = getSubmissionItems(resolvedPages, mergedValues, defaultValues)
    patchApplication(
      { recruitmentId, formResponseId: resumeId, items: answers },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: applyKeys.getRecruitmentApplicationAnswer(recruitmentId, resumeId),
          })
        },
      },
    )
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
            queryKey: applyKeys.getRecruitmentApplicationAnswer(recruitmentId, resumeId),
          })
          queryClient.invalidateQueries({
            queryKey: applyKeys.getRecruitmentParts(recruitmentId),
          })
          queryClient.invalidateQueries({
            queryKey: applyKeys.getMyApplicationStatus(recruitmentId),
          })
          queryClient.invalidateQueries({
            queryKey: applyKeys.getActiveRecruitmentId,
          })
          queryClient.invalidateQueries({
            queryKey: dashboardKeys.getMyApplications,
          })
          setIsSubmitModalOpen(false)
          navigationBlocker.allowNextNavigationOnce()
          navigate({
            to: '/apply',
          })
        },

        onError: () => {
          alert('지원서 제출에 실패했습니다.')
        },
      },
    )
  }

  return (
    <PageLayout>
      <Flex maxWidth="956px">
        <PageTitle title={questionsData.result.recruitmentFormTitle} />
      </Flex>

      <ResumeContent
        pages={resolvedPages}
        formData={questionDataForForm}
        displayLastSavedTime={displayLastSavedTime}
        handleSave={handleSave}
        onPortfolioImmediateSave={handlePortfolioImmediateSave}
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
      {isSubmitModalOpen && <SubmitConfirmModal onClose={closeSubmitModal} onSubmit={onSubmit} />}

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
