import ResumeNavigation from '@/features/apply/components/ResumeNavigation'
import type { ResumeType } from '@/features/apply/type/question'
import * as S from '@/features/dashboard/components/shared'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import { Question } from '@/shared/ui/common/question/Question'

export default function ViewResume({
  data,
  page,
  setPage,
}: {
  data: ResumeType
  page: number
  setPage: (next: number) => void
}) {
  const schoolName = '중앙대학교'
  const classNumber = '10기'

  const totalPages = data.pages.length
  const pageNumber = Number.isFinite(page) && page > 0 ? page : 1
  const currentPageIndex = Math.min(Math.max(pageNumber - 1, 0), Math.max(totalPages - 1, 0))
  const currentPage = data.pages[currentPageIndex] ?? data.pages[0]
  const currentQuestions = currentPage.questions

  return (
    <S.PageLayout>
      <Flex maxWidth={'956px'}>
        <PageTitle title={`UMC ${schoolName} ${classNumber} 지원서`} />
      </Flex>

      <S.BorderSection alignItems="flex-start">{data.description}</S.BorderSection>

      <S.BorderSection>
        <Flex justifyContent="flex-end">
          <Flex justifyContent="flex-end" alignItems="center" gap={'18px'}>
            {data.lastSavedTime && (
              <span className="last-saved-time">{data.lastSavedTime}에 제출됨.</span>
            )}
          </Flex>
        </Flex>
      </S.BorderSection>

      <S.BorderSection>
        {currentQuestions.map((q) => (
          <Flex key={q.id} flexDirection="column" gap={8} width="100%">
            <Question data={q} value={q.answer} mode="view" />
          </Flex>
        ))}
        <ResumeNavigation page={page} totalPages={totalPages} onPageChange={setPage} />
      </S.BorderSection>
    </S.PageLayout>
  )
}
