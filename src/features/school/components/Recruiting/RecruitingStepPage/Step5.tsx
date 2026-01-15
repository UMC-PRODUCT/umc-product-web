import dayjs from 'dayjs'

import { buildPartQuestionBankPayload } from '@/features/school/utils/partQuestionBank'
import type { RecruitingForms } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { transformQuestionTypeKorean } from '@/shared/utils/transformKorean'

import { PAGE_INFO } from '../../../constants/PageInfo'
import PreviewSection from '../PreviewSection/PreviewSection'
import QuestionPreview from '../QuestionPreview/QuestionPreview'
import * as S from './common'

const Step5 = ({
  setStep,
  formData,
}: {
  setStep: (step: number) => void
  formData: RecruitingForms
}) => {
  const formatDateLabel = (value: Date | null) => (value ? dayjs(value).format('YYYY.MM.DD') : '')
  const partQuestionPayload = buildPartQuestionBankPayload(
    formData.partQuestionBank,
    formData.recruitingPart,
  )

  return (
    <Section variant="solid">
      <Flex flexDirection="column" alignItems="flex-start">
        <S.Title>최종 검토</S.Title>
        <S.SubTitle>모든 정보가 입력되었습니다. 아래 내용을 확인하고 모집을 생성하세요.</S.SubTitle>
      </Flex>
      <PreviewSection title="기본 정보 입력" step={1} setStep={setStep}>
        <QuestionPreview questionLabel={formData.recruitingName} questionTitle="모집 이름" />
        <QuestionPreview questionLabel={formData.recruitingPart} questionTitle="모집 파트" />
      </PreviewSection>
      <PreviewSection title="기간 설정" step={2} setStep={setStep}>
        <QuestionPreview
          questionLabel={`${formatDateLabel(formData.documentStartDate)} - ${formatDateLabel(
            formData.documentEndDate,
          )}`}
          questionTitle="서류 모집"
        />

        <QuestionPreview
          questionLabel={formatDateLabel(formData.documentResultDate)}
          questionTitle="서류 결과 발표"
        />
        <QuestionPreview
          questionLabel={`${formatDateLabel(formData.interviewStartDate)} - ${formatDateLabel(
            formData.interviewEndDate,
          )}`}
          questionTitle="면접 평가"
        />
        <QuestionPreview
          questionLabel={formatDateLabel(formData.finalResultDate)}
          questionTitle="최종 결과 발표"
        />
      </PreviewSection>
      <PreviewSection title="지원서 문항 작성" step={3} setStep={setStep}>
        {formData.pages.map((page, pageIndex) => {
          const pageMeta = PAGE_INFO.find((item) => item.page === page.page)
          return (
            <div
              key={`${page.page}-${pageIndex}`}
              css={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}
            >
              <S.PageTitle>
                Page {page.page}
                <span>{pageMeta?.title ?? '지원서 문항'}</span>
              </S.PageTitle>
              <Section variant="both" padding="12px 18px" gap={12}>
                {page.questions.map((question, questionIndex) => (
                  <QuestionPreview
                    key={questionIndex}
                    questionLabel={question.question}
                    questionTitle={`문항 ${questionIndex + 1} (${transformQuestionTypeKorean(question.type)}, ${
                      question.necessary ? '필수 문항' : '선택 문항'
                    })`}
                  />
                ))}
              </Section>
            </div>
          )
        })}
        {formData.recruitingPart.length > 0 ? (
          <div css={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}>
            <S.PageTitle>
              Page 3<span>파트별 문항</span>
            </S.PageTitle>
            <Flex flexDirection="column" gap={12} css={{ width: '100%' }}>
              {formData.recruitingPart.map((part) => {
                const questions = partQuestionPayload[part] ?? []
                return (
                  <Section
                    key={part}
                    variant="both"
                    padding="12px 18px"
                    gap={12}
                    alignItems="flex-start"
                    css={{ width: '100%' }}
                  >
                    <S.PartWarpper>{part}</S.PartWarpper>
                    {questions.map((question, questionIndex) => (
                      <QuestionPreview
                        key={questionIndex}
                        questionLabel={question.question}
                        questionTitle={`문항 ${questionIndex + 1} (${transformQuestionTypeKorean(question.type)}, ${
                          question.necessary ? '필수 문항' : '선택 문항'
                        })`}
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
        <QuestionPreview questionLabel={formData.noticeTitle} questionTitle="공지 제목" />
        <QuestionPreview questionLabel={formData.noticeContent} questionTitle="공지 내용" />
      </PreviewSection>
    </Section>
  )
}

export default Step5
