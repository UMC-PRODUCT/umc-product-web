import dayjs from 'dayjs'

import { PAGE_INFO } from '@features/school/domain'

import { PART_TYPE_TO_SMALL_PART } from '@shared/constants/part'

import type { PartType } from '@/features/auth/domain'
import PreviewSection from '@/features/school/components/Recruiting/PreviewSection/PreviewSection'
import QuestionPreview from '@/features/school/components/Recruiting/QuestionPreview/QuestionPreview'
import type { RecruitingForms, RecruitingItem } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { transformQuestionTypeKorean } from '@/shared/utils/transformKorean'

import * as S from '../common'

const Step5 = ({
  setStep,
  formData,
}: {
  setStep: (step: number) => void
  formData: RecruitingForms
}) => {
  const formatDateLabel = (value: string | null) => (value ? dayjs(value).format('YYYY.MM.DD') : '')
  const recruitingPartLabels = formData.recruitmentParts
    .map((part) => PART_TYPE_TO_SMALL_PART[part])
    .filter((part): part is NonNullable<typeof part> => Boolean(part))
  const commonItems = formData.items
    .filter((item) => item.target.kind === 'COMMON_PAGE')
    .sort((a, b) => {
      const pageNoA = itemPageNo(a)
      const pageNoB = itemPageNo(b)
      if (pageNoA !== pageNoB) return pageNoA - pageNoB
      return a.question.orderNo - b.question.orderNo
    })

  const partItems = formData.items
    .filter((item) => item.target.kind === 'PART')
    .sort((a, b) => {
      const partA = itemPartKey(a)
      const partB = itemPartKey(b)
      if (partA !== partB) return partA.localeCompare(partB)
      return a.question.orderNo - b.question.orderNo
    })

  function itemPageNo(item: RecruitingItem) {
    return item.target.kind === 'COMMON_PAGE' ? item.target.pageNo : 0
  }

  function itemPartKey(item: RecruitingItem) {
    return item.target.kind === 'PART' ? (item.target.part ?? '') : ''
  }

  return (
    <Section variant="solid">
      <Flex flexDirection="column" alignItems="flex-start">
        <S.Title>최종 검토</S.Title>
        <S.SubTitle>모든 정보가 입력되었습니다. 아래 내용을 확인하고 모집을 생성하세요.</S.SubTitle>
      </Flex>
      <PreviewSection title="기본 정보 입력" step={1} setStep={setStep}>
        <QuestionPreview questionLabel={formData.title} questionTitle="모집 이름" />
        <QuestionPreview questionLabel={recruitingPartLabels} questionTitle="모집 파트" />
      </PreviewSection>
      <PreviewSection title="기간 설정" step={2} setStep={setStep}>
        <QuestionPreview
          questionLabel={`${formatDateLabel(formData.schedule.applyStartAt)} - ${formatDateLabel(
            formData.schedule.applyEndAt,
          )}`}
          questionTitle="서류 모집"
        />

        <QuestionPreview
          questionLabel={formatDateLabel(formData.schedule.docResultAt)}
          questionTitle="서류 결과 발표"
        />
        <QuestionPreview
          questionLabel={`${formatDateLabel(
            formData.schedule.interviewStartAt,
          )} - ${formatDateLabel(formData.schedule.interviewEndAt)}`}
          questionTitle="면접 평가"
        />
        <QuestionPreview
          questionLabel={formatDateLabel(formData.schedule.finalResultAt)}
          questionTitle="최종 결과 발표"
        />
      </PreviewSection>
      <PreviewSection title="지원서 문항 작성" step={3} setStep={setStep} showEdit={false}>
        {[1, 2].map((pageNumber) => {
          const pageMeta = PAGE_INFO.find((item) => item.page === pageNumber)
          const pageItems = commonItems.filter(
            (item) => item.target.kind === 'COMMON_PAGE' && item.target.pageNo === pageNumber,
          )
          return (
            <div
              key={`page-${pageNumber}`}
              css={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}
            >
              <S.PageTitle>
                Page {pageNumber}
                <span>{pageMeta?.title ?? '지원서 문항'}</span>
              </S.PageTitle>
              <Section variant="both" padding="12px 18px" gap={12}>
                {pageItems.map((item) => (
                  <QuestionPreview
                    key={`${pageNumber}-${item.question.orderNo}`}
                    questionLabel={item.question.questionText}
                    questionTitle={`문항 ${item.question.orderNo} (${transformQuestionTypeKorean(
                      item.question.type as never,
                    )}, ${item.question.required ? '필수 문항' : '선택 문항'})`}
                  />
                ))}
              </Section>
            </div>
          )
        })}
        {partItems.length > 0 ? (
          <div css={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}>
            <S.PageTitle>
              Page 3<span>파트별 문항</span>
            </S.PageTitle>
            <Flex flexDirection="column" gap={12} css={{ width: '100%' }}>
              {Object.values(
                partItems.reduce<Partial<Record<PartType, Array<RecruitingItem>>>>((acc, item) => {
                  if (item.target.kind !== 'PART' || !item.target.part) return acc
                  const partKey = item.target.part
                  if (!acc[partKey]) acc[partKey] = []
                  acc[partKey].push(item)
                  return acc
                }, {}),
              ).map((itemsForPart) => {
                const partKey = itemsForPart[0]?.target.part ?? ''
                const partLabel = partKey ? PART_TYPE_TO_SMALL_PART[partKey as never] : ''
                return (
                  <Section
                    key={partKey}
                    variant="both"
                    padding="12px 18px"
                    gap={12}
                    alignItems="flex-start"
                    css={{ width: '100%' }}
                  >
                    <S.PartWarpper>{partLabel}</S.PartWarpper>
                    {itemsForPart.map((item) => (
                      <QuestionPreview
                        key={`${partKey}-${item.question.orderNo}`}
                        questionLabel={item.question.questionText}
                        questionTitle={`문항 ${item.question.orderNo} (${transformQuestionTypeKorean(
                          item.question.type as never,
                        )}, ${item.question.required ? '필수 문항' : '선택 문항'})`}
                      />
                    ))}
                  </Section>
                )
              })}
            </Flex>
          </div>
        ) : null}
      </PreviewSection>
      <PreviewSection title="공지 작성" step={4} setStep={setStep}>
        <QuestionPreview
          isNotice={true}
          questionLabel={formData.noticeContent}
          questionTitle="공지 내용"
        />
      </PreviewSection>
    </Section>
  )
}

export default Step5
