import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import ResumeContent from '@/features/apply/components/ResumeContent'
import { useResumeForm } from '@/features/apply/pages/resume/useResumeForm'
import { useGetRecruitmentApplicationForm } from '@/features/school/hooks/useRecruitingQueries'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

const RecruitingPreviewPageContent = ({ recruitingId }: { recruitingId: string }) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useGetRecruitmentApplicationForm(recruitingId)
  const questionData = data.result

  const { control, setValue, clearErrors, errors, isFormIncomplete, resolvedPages } = useResumeForm(
    questionData,
    undefined,
    { labelMode: 'part', showAllParts: true },
  )

  const totalPages = resolvedPages.length
  const previewTitle =
    questionData.noticeTitle ||
    questionData.recruitmentFormTitle ||
    questionData.title ||
    '지원서 미리보기'

  const handlePageNavigation = (nextPage: number) => {
    setCurrentPage(nextPage)
  }

  return (
    <PageLayout>
      <Flex flexDirection="column" gap={32}>
        <Flex justifyContent="space-between" alignItems="center" gap={16} maxWidth={956}>
          <PageTitle title={previewTitle} />
          <Button
            label="목록으로 돌아가기"
            tone="lime"
            onClick={() => navigate({ to: '/school/recruiting' })}
            css={{ width: 'fit-content', height: '36px' }}
          />
        </Flex>
        <ResumeContent
          pages={resolvedPages}
          displayLastSavedTime={null}
          handleSave={() => {}}
          isEdit={false}
          control={control}
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          currentPage={currentPage}
          totalPages={totalPages}
          isFormIncomplete={isFormIncomplete}
          openSubmitModal={() => {}}
          handlePageNavigation={handlePageNavigation}
          formData={questionData}
        />
      </Flex>
    </PageLayout>
  )
}

export const RecruitingPreviewPage = ({ recruitingId }: { recruitingId: string }) => (
  <AsyncBoundary fallback={<SuspenseFallback label="지원서 미리보기를 불러오는 중입니다." />}>
    <RecruitingPreviewPageContent recruitingId={recruitingId} />
  </AsyncBoundary>
)
