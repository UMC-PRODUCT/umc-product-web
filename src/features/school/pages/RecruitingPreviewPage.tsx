import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import ResumeContent from '@/features/apply/components/ResumeContent'
import { useResumeForm } from '@/features/apply/pages/resume/useResumeForm'
import { useGetApplicationFormData } from '@/features/school/hooks/useGetRecruitingData'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

const RecruitingPreviewPage = ({ recruitingId }: { recruitingId: string }) => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useGetApplicationFormData(recruitingId)
  const questionData = data?.result

  const { control, setValue, clearErrors, errors, isFormIncomplete, resolvedPages } = useResumeForm(
    questionData,
    undefined,
    { labelMode: 'part', showAllParts: true },
  )

  const totalPages = resolvedPages.length
  const previewTitle = questionData?.recruitmentFormTitle || '지원서 미리보기'

  const handlePageNavigation = (nextPage: number) => {
    setCurrentPage(nextPage)
  }

  if (!questionData) {
    return null
  }

  return (
    <PageLayout>
      <Flex flexDirection="column" gap={32}>
        <Flex justifyContent="space-between" alignItems="center" gap={16}>
          <PageTitle title={previewTitle} />
          <Button
            label="목록으로 돌아가기"
            tone="lime"
            onClick={() => navigate({ to: '/school/recruiting' })}
            css={{ width: 'fit-content', height: '36px' }}
          />
        </Flex>
        <ResumeContent
          questionData={questionData.pages}
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

export default RecruitingPreviewPage
