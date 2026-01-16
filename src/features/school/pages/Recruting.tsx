import { useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import * as S from '@/features/school/components/common/common'
import RecruitingStep from '@/features/school/components/Recruiting/RecruitingStepIndicator/RecruitingStep'
import { buildPartQuestionBankPayload } from '@/features/school/utils/partQuestionBank'
import Check from '@/shared/assets/icons/check.svg?react'
import Search from '@/shared/assets/icons/search_bold.svg?react'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import CurrentStepInfo from '../components/Recruiting/CurrentStepInfo/CurrentStepInfo'
import Step1 from '../components/Recruiting/RecruitingStepPage/Step1'
import Step2 from '../components/Recruiting/RecruitingStepPage/Step2'
import Step3 from '../components/Recruiting/RecruitingStepPage/Step3'
import Step4 from '../components/Recruiting/RecruitingStepPage/Step4'
import Step5 from '../components/Recruiting/RecruitingStepPage/Step5'
import { useRecruitingForm } from '../hooks/useRecruitingForm'
import { useRecruitingStepNavigation } from '../hooks/useRecruitingStepNavigation'

const Recruiting = () => {
  const navigate = useNavigate()
  const topRef = useRef<HTMLDivElement | null>(null)
  const { form, values, interviewDates } = useRecruitingForm()
  const { control, trigger, setValue, setError, clearErrors } = form
  const [partCompletion, setPartCompletion] = useState<
    Partial<Record<RecruitingForms['recruitingPart'][number], boolean>>
  >({})
  const normalizedPartCompletion = useMemo(() => {
    const next: Partial<Record<RecruitingForms['recruitingPart'][number], boolean>> = {}
    values.recruitingPart.forEach((part) => {
      next[part] = partCompletion[part] ?? false
    })
    return next
  }, [values.recruitingPart, partCompletion])
  const {
    step,
    setStep,
    step3Page,
    setStep3Page,
    step3Part,
    setStep3Part,
    isStepReady,
    handlePrevious,
    handleNext,
  } = useRecruitingStepNavigation({
    values,
    interviewDates,
    trigger,
    partCompletion: normalizedPartCompletion,
    scrollToTop: () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  })

  const {
    recruitingName,
    recruitingPart,
    documentStartDate,
    documentEndDate,
    documentResultDate,
    interviewStartDate,
    interviewEndDate,
    finalResultDate,
    interviewTimeSlots,
    pages,
    partQuestionBank,
    noticeTitle,
    noticeContent,
  } = values
  const payload = {
    ...values,
    partQuestionBank: buildPartQuestionBankPayload(partQuestionBank, recruitingPart),
  }

  return (
    <PageLayout>
      <div ref={topRef} />
      <S.Header>
        <PageTitle title="새로운 모집 생성" />
        <Button typo="B4.Md" tone="lime" variant="outline" label="← 뒤로가기" />
      </S.Header>
      <Section variant="outline" padding={'30px 18px 18px 18px'}>
        <RecruitingStep step={step} />
        <CurrentStepInfo step={step} />
        <form css={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }} action="">
          {step === 1 && <Step1 control={control} />}
          {step === 2 && (
            <Step2
              control={control}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
          )}
          {step === 3 && (
            <Step3
              control={control}
              trigger={trigger}
              page={step3Page}
              setPage={setStep3Page}
              part={step3Part}
              setPart={setStep3Part}
              partCompletion={normalizedPartCompletion}
              setPartCompletion={setPartCompletion}
            />
          )}
          {step === 4 && <Step4 control={control} />}
          {step === 5 && (
            <Step5
              setStep={setStep}
              formData={{
                recruitingName,
                recruitingPart,
                documentStartDate,
                documentEndDate,
                documentResultDate,
                interviewStartDate,
                interviewEndDate,
                finalResultDate,
                interviewTimeSlots,
                pages,
                partQuestionBank,
                noticeTitle,
                noticeContent,
              }}
            />
          )}
        </form>
      </Section>
      <Flex justifyContent="space-between" height={39}>
        <Flex width={'fit-content'} height={39} gap={18}>
          <Button
            tone="gray"
            variant="outline"
            label={step == 1 ? '취소' : '← 이전 단계'}
            css={{ width: step == 1 ? 70 : 120 }}
            onClick={handlePrevious}
          />
          <Button
            tone="lime"
            variant="outline"
            label="임시 저장"
            css={{ width: 98 }}
            onClick={() => {
              console.log('[Recruiting] form data:', payload)
            }}
          />
        </Flex>
        <Flex width={'fit-content'} height={39}>
          {step < 5 && (
            <Flex width={'fit-content'} height={39}>
              <Button
                tone={isStepReady ? 'lime' : 'gray'}
                variant="solid"
                label="다음 단계 →"
                css={{ width: 118 }}
                disabled={!isStepReady}
                onClick={handleNext}
              />
            </Flex>
          )}
          {step === 5 && (
            <Flex width={330} height={39} gap={18}>
              <Button
                tone="gray"
                variant="solid"
                typo="B3.Sb"
                label="지원서 미리보기"
                css={{ width: 163 }}
                onClick={handlePrevious}
                iconColor={theme.colors.black}
                Icon={Search}
              />
              <Button
                tone="lime"
                variant="solid"
                label="모집 생성하기"
                typo="B3.Sb"
                css={{ width: 149 }}
                Icon={Check}
                onClick={() => {
                  console.log('[Recruiting] form data:', payload)
                  alert('모집이 생성되었습니다!')
                  navigate({
                    to: '/school/recruiting',
                    replace: true,
                  })
                }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </PageLayout>
  )
}

export default Recruiting
