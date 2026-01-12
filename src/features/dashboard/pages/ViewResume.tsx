import * as S from '@/features/dashboard/components/ViewResumePage.style'
import { RECRUITMENT_INFO } from '@/shared/constants/recruitment'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import type { ResumeData } from '@/shared/types/question'
import { Flex } from '@/shared/ui/common/Flex'
import { Question } from '@/shared/ui/common/question/Question'
import ResumeNavigation from '@/shared/ui/common/ResumeNavigation'

interface ViewResumeProps {
  resumeData: ResumeData
  currentPage: number
  onPageChange: (nextPage: number) => void
}

function calculateCurrentPageIndex(pageNumber: number, totalPages: number): number {
  const validatedPageNumber = Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1
  const maxPageIndex = Math.max(totalPages - 1, 0)
  return Math.min(Math.max(validatedPageNumber - 1, 0), maxPageIndex)
}

const ViewResume = ({ resumeData, currentPage, onPageChange }: ViewResumeProps) => {
  const { schoolName, generation } = RECRUITMENT_INFO

  const totalPages = resumeData.pages.length
  const currentPageIndex = calculateCurrentPageIndex(currentPage, totalPages)
  const currentPageData = resumeData.pages[currentPageIndex] ?? resumeData.pages[0]
  const currentQuestions = currentPageData.questions ?? []

  const pageTitle = `UMC ${schoolName} ${generation} 지원서`
  const submittedTimeText = resumeData.lastSavedTime
    ? `${resumeData.lastSavedTime}에 제출됨.`
    : null

  return (
    <S.PageLayout>
      <Flex maxWidth="956px">
        <PageTitle title={pageTitle} />
      </Flex>

      <S.BorderSection alignItems="flex-start">{resumeData.description}</S.BorderSection>

      <S.BorderSection>
        <Flex justifyContent="flex-end">
          <Flex justifyContent="flex-end" alignItems="center" gap="18px">
            {submittedTimeText && <span className="last-saved-time">{submittedTimeText}</span>}
          </Flex>
        </Flex>
      </S.BorderSection>

      <S.BorderSection>
        {currentQuestions.map((question) => (
          <Flex key={question.id} flexDirection="column" gap={8} width="100%">
            <Question data={question} value={question.answer} mode="view" />
          </Flex>
        ))}

        <ResumeNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </S.BorderSection>
    </S.PageLayout>
  )
}

export default ViewResume
