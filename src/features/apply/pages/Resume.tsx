import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import * as S from '@/features/apply/components/shared'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

import { Question } from '../components/question/Question'
import ResumeNavigation from '../components/ResumeNavigation'
import type { QuestionList, QuestionUnion } from '../type/question'

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

  const defaultValues = useMemo(() => {
    const values: FormValues = {}
    data.pages.forEach((p) => {
      p.questions.forEach((q: QuestionUnion) => {
        values[q.id] = q.answer
      })
    })
    return values
  }, [data])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
  })

  const onSubmit = (formValues: Record<string, unknown>) => {
    console.log('제출 데이터:', formValues)
    // API POST 호출 (formId와 answers 전송)
  }

  return (
    <S.PageLayout>
      <Flex maxWidth={'956px'}>
        <PageTitle title={`UMC ${schoolName} ${classNumber} 지원서`} />
      </Flex>
      <S.BorderSection alignItems="flex-start">
        {`지원자 안내 사항, 운영진 인사말 등\n지원자 안내 사항, 운영진 인사말 등 \n지원자 안내 사항, 운영진 인사말 등`}
      </S.BorderSection>
      <S.BorderSection>
        <Flex justifyContent="flex-end">
          <Flex width={'380px'} justifyContent="flex-end" alignItems="center" gap={'18px'}>
            <span>20xx년 x월 x일 xx:xx에 마지막으로 저장됨.</span>
            <Badge
              typo="C2.Md"
              tone="lime"
              variant="outline"
              onClick={() => {}}
              css={{ cursor: 'pointer' }}
            >
              저장하기
            </Badge>
          </Flex>
        </Flex>
      </S.BorderSection>

      <S.BorderSection>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentQuestions.map((q) => (
            <Flex key={q.id} flexDirection="column" gap={8} width="100%">
              <Controller
                name={`${q.id}`}
                control={control}
                rules={{
                  required: q.necessary ? '응답 필수 항목입니다.' : false,
                  validate: (value: any) => {
                    if (q.type === 'fileUpload' && value.links.length > 0) {
                      const isValidLinks = value.links.every((link: string) =>
                        link.startsWith('https://'),
                      )
                      if (!isValidLinks) {
                        return '올바르지 않은 링크 형식입니다. (https://로 시작해야 합니다.)'
                      }
                    }
                    if (q.type === 'timeTable') {
                      const hasSelection = value && Object.keys(value).length > 0
                      if (!hasSelection) return '면접 가능한 시간을 최소 하나 이상 선택해주세요.'

                      // 추가 검증: 날짜 키는 있지만 선택된 시간 배열이 모두 비어있는 경우 체크
                      const hasTimeSelected = Object.values(value).some(
                        (times: any) => times.length > 0,
                      )
                      if (!hasTimeSelected) return '면접 가능한 시간을 최소 하나 이상 선택해주세요.'
                    }
                    return true
                  },
                }}
                render={({ field }) => (
                  <Question
                    data={q}
                    value={field.value}
                    onChange={(_, val) => field.onChange(val)}
                    errorMessage={errors[`${q.id}`]?.message}
                  />
                )}
              />
            </Flex>
          ))}
          <ResumeNavigation page={page} setPage={setPage} totalPages={totalPages} />
          <Flex justifyContent="center" css={{ marginTop: '40px' }}>
            <Button type="submit" label="지원하기" tone="lime" />
          </Flex>
        </form>
      </S.BorderSection>
    </S.PageLayout>
  )
}
