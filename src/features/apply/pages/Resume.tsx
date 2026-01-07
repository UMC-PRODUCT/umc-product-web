import { useState } from 'react'
import type { FieldErrors } from 'react-hook-form'

import * as S from '@/features/apply/components/shared'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'
import { Flex } from '@/shared/ui/common/Flex'

import CautionLeave from '../components/modals/CautionLeave'
import CautionSubmit from '../components/modals/CautionSubmit'
import { useAutoSave } from '../hooks/useAutoSave'
import { useBeforeUnload } from '../hooks/useBeforeUnload'
import { useUnsavedChangesBlocker } from '../hooks/useUnsavedChangeBlocker'
import type { QuestionList, QuestionPage, QuestionUnion } from '../type/question'
import ResumeFormSection from './resume/ResumeFormSection'
import { useResumeForm } from './resume/useResumeForm'

type FormValues = Record<string, unknown>

export default function Resume({
  data,
  page,
  setPage,
}: {
  data: QuestionList
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

  const [isCautionSubmitModalOpen, setIsCautionSubmitModalOpen] = useState(false)

  const { control, handleSubmit, trigger, getValues, reset, errors, isDirty, isFormIncomplete } =
    useResumeForm(data)

  // 새로고침 및 페이지 이탈 방지
  useBeforeUnload(isDirty)
  // 작성 중인 내용이 있을 때, 라우트 변경 방지
  const leaveGuard = useUnsavedChangesBlocker(isDirty)

  // 1분마다 자동 저장
  const { lastSavedTime, handleSave } = useAutoSave({
    getValues,
    interval: 60000,
  })

  // 모든 페이지에 대해서 유효성 검사
  const onInvalid = (formErrors: FieldErrors<FormValues>) => {
    const errorFieldIds = Object.keys(formErrors)
    if (errorFieldIds.length > 0) {
      const firstErrorId = errorFieldIds[0]
      const errorPageIndex = data.pages.findIndex((p: QuestionPage) =>
        p.questions.some((q: QuestionUnion) => String(q.id) === firstErrorId),
      )

      if (errorPageIndex !== -1) {
        setPage(errorPageIndex + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  // 최종 제출 처리
  const handleFinalSubmit = async () => {
    const allFieldIds = data.pages.flatMap((p) =>
      p.questions.map((q: QuestionUnion) => String(q.id)),
    )

    const result = await trigger(allFieldIds)

    if (result) {
      handleSubmit((vals) => {
        console.log('최종 제출 데이터:', vals)
        setIsCautionSubmitModalOpen(false)
        reset(vals) // 제출 성공 시 dirty 해제
      })()
    } else {
      setIsCautionSubmitModalOpen(false)
      onInvalid(errors)
    }
  }

  return (
    <S.PageLayout>
      <Flex maxWidth={'956px'}>
        <PageTitle title={`UMC ${schoolName} ${classNumber} 지원서`} />
      </Flex>

      <S.BorderSection alignItems="flex-start">{data.description}</S.BorderSection>

      <S.BorderSection>
        <Flex justifyContent="flex-end">
          <Flex justifyContent="flex-end" alignItems="center" gap={'18px'}>
            {lastSavedTime && (
              <span className="last-saved-time">{lastSavedTime}에 마지막으로 저장됨.</span>
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
      </S.BorderSection>

      <S.BorderSection>
        <ResumeFormSection
          currentQuestions={currentQuestions}
          control={control}
          errors={errors}
          page={page}
          totalPages={totalPages}
          isFormIncomplete={isFormIncomplete}
          onOpenSubmitModal={() => setIsCautionSubmitModalOpen(true)}
          onPageChange={(next) => {
            leaveGuard.allowNextNavigationOnce()
            setPage(next)
          }}
        />
      </S.BorderSection>

      {isCautionSubmitModalOpen && (
        <CautionSubmit
          onClose={() => setIsCautionSubmitModalOpen(false)}
          onSubmit={handleFinalSubmit}
        />
      )}

      {leaveGuard.open && <CautionLeave onClose={leaveGuard.stay} onMove={leaveGuard.leave} />}
    </S.PageLayout>
  )
}
