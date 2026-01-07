import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

import * as S from '@/features/apply/components/shared'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

import CautionLeave from '../components/modals/CautionLeave'
import CautionSubmit from '../components/modals/CautionSubmit'
import { Question } from '../components/question/Question'
import ResumeNavigation from '../components/ResumeNavigation'
import { useAutoSave } from '../hooks/useAutoSave'
import { useBeforeUnload } from '../hooks/useBeforeUnload'
import { useUnsavedChangesBlocker } from '../hooks/useUnsavedChangeBlocker'
import type { QuestionList, QuestionPage, QuestionUnion } from '../type/question'

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

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      const values: FormValues = {}
      data.pages.forEach((p) =>
        p.questions.forEach((q: QuestionUnion) => {
          values[q.id] = q.answer
        }),
      )
      return values
    }, [data]),
    shouldUnregister: false,
  })

  // ✅ 새로고침/탭닫기 방지 (브라우저 기본 경고창)
  useBeforeUnload(isDirty)

  // ✅ 라우터 이동 방지 (커스텀 모달)
  const leaveGuard = useUnsavedChangesBlocker(isDirty)

  const { lastSavedTime, handleSave } = useAutoSave({
    getValues,
    key: `umc_resume_${data.id || 'temp'}`,
    interval: 60000,
  })

  // 실시간 값 감시
  const allValues = useWatch({ control })

  const isFormIncomplete = useMemo(() => {
    return data.pages
      .flatMap((p) => p.questions)
      .some((q) => {
        if (!q.necessary) return false
        const val = allValues[q.id]

        if (!val) return true

        if (Array.isArray(val) && val.length === 0) return true

        if (q.type === 'timeTable') {
          const timeValues = Object.values(val as Record<string, Array<unknown>>)
          return timeValues.every((v) => v.length === 0)
        }

        return false
      })
  }, [allValues, data])

  useEffect(() => {
    data.pages.forEach((p) => {
      p.questions.forEach((q: QuestionUnion) => {
        register(`${q.id}`, { required: q.necessary })
      })
    })
  }, [data, register])

  const onInvalid = (formErrors: any) => {
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

  const handleFinalSubmit = async () => {
    const allFieldIds = data.pages.flatMap((p) =>
      p.questions.map((q: QuestionUnion) => String(q.id)),
    )

    const result = await trigger(allFieldIds as any)

    if (result) {
      handleSubmit((vals) => {
        console.log('최종 제출 데이터:', vals)
        setIsCautionSubmitModalOpen(false)
        reset(vals) // ✅ 제출 성공 시 dirty 해제
      })()
    } else {
      setIsCautionSubmitModalOpen(false)
      // react-hook-form 내부값 접근 대신, onInvalid에 errors 전달하는게 더 안전하지만
      // 기존 로직 유지
      onInvalid((control as any)._formState?.errors)
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
          <Flex width={'380px'} justifyContent="flex-end" alignItems="center" gap={'18px'}>
            {lastSavedTime && <span>{lastSavedTime}에 마지막으로 저장됨.</span>}
            <Badge
              typo="C2.Md"
              tone="lime"
              variant="outline"
              onClick={handleSave}
              css={{ cursor: 'pointer' }}
            >
              저장하기
            </Badge>
          </Flex>
        </Flex>
      </S.BorderSection>

      <S.BorderSection>
        <form onSubmit={(e) => e.preventDefault()}>
          {currentQuestions.map((q: QuestionUnion) => (
            <Flex key={q.id} flexDirection="column" gap={8} width="100%">
              <Controller
                name={`${q.id}`}
                control={control}
                rules={{
                  required: q.necessary ? '응답 필수 항목입니다.' : false,
                }}
                render={({ field }) => (
                  <Question
                    data={q}
                    value={field.value}
                    // ✅ 커스텀 컴포넌트 + 복합값에서 dirty 안정화
                    onChange={(_, val) =>
                      field.onChange(val, { shouldDirty: true, shouldTouch: true })
                    }
                    errorMessage={errors[`${q.id}`]?.message as any}
                  />
                )}
              />
            </Flex>
          ))}

          <ResumeNavigation page={page} setPage={setPage} totalPages={totalPages} />

          <Flex justifyContent="center" css={{ marginTop: '40px' }}>
            <Button
              type="button"
              label="지원하기"
              tone={isFormIncomplete ? 'gray' : 'lime'}
              disabled={isFormIncomplete}
              onClick={() => setIsCautionSubmitModalOpen(true)}
            />
          </Flex>
        </form>
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
