import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

import { MOCKFORMSDATA_WITH_NO_ANSWER } from '@/features/apply/mocks/questions'
import * as S from '@/features/school/components/common/common'
import RecruitingPreview from '@/features/school/components/Recruiting/modals/RecruitingPreview'
import RecruitingStep from '@/features/school/components/Recruiting/RecruitingStepIndicator/RecruitingStep'
import { useRecruitingForm } from '@/features/school/hooks/useRecruitingForm'
import { useRecruitingStepNavigation } from '@/features/school/hooks/useRecruitingStepNavigation'
import { TEMP_CREATE_FORM_DATA } from '@/features/school/mocks/tempCreateFormData'
import {
  consumeTempDraftLoad,
  normalizeTempRecruitingForm,
} from '@/features/school/utils/recruiting/tempDraft'
import Check from '@/shared/assets/icons/check.svg?react'
import Search from '@/shared/assets/icons/search_bold.svg?react'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import type { QuestionList } from '@/shared/types/question'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import CurrentStepInfo from '../components/Recruiting/CurrentStepInfo/CurrentStepInfo'
import { Step1, Step2, Step3, Step4, Step5 } from '../components/Recruiting/RecruitingStepPage'

const Recruiting = () => {
  const navigate = useNavigate()
  const scrollTopRef = useRef<HTMLDivElement | null>(null)
  const [modal, setModal] = useState({
    modalName: '',
    isOpen: false,
  })
  const { form, values, interviewDates } = useRecruitingForm()
  const { control, trigger, setValue, setError, clearErrors } = form
  const [partCompletionByPart, setPartCompletionByPart] = useState<
    Partial<Record<RecruitingForms['recruitmentParts'][number], boolean>>
  >({})
  const partCompletionMap = useMemo(() => {
    const next: Partial<Record<RecruitingForms['recruitmentParts'][number], boolean>> = {}
    values.recruitmentParts.forEach((part) => {
      next[part] = partCompletionByPart[part] ?? false
    })
    return next
  }, [values.recruitmentParts, partCompletionByPart])
  const {
    step,
    setStep,
    step3PageNumber,
    setStep3PageNumber,
    step3SelectedPart,
    setStep3SelectedPart,
    canProceedStep,
    goToPreviousStep,
    goToNextStep,
  } = useRecruitingStepNavigation({
    values,
    interviewDates,
    trigger,
    partCompletion: partCompletionMap,
    scrollToTop: () => scrollTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  })

  const { title } = values

  useEffect(() => {
    if (!consumeTempDraftLoad()) return
    const normalized = normalizeTempRecruitingForm(TEMP_CREATE_FORM_DATA)
    form.reset(normalized, { keepDefaultValues: false })
  }, [form])

  const questionData: QuestionList = MOCKFORMSDATA_WITH_NO_ANSWER

  const formatDateForPayload = (value: Date | null) =>
    value ? dayjs(value).format('YYYY-MM-DDTHH:mm:ssZ') : null

  const submitPayload = {
    title: values.title,
    recruitmentParts: values.recruitmentParts,
    maxPreferredPartCount: values.maxPreferredPartCount,
    schedule: {
      applyStartAt: formatDateForPayload(values.schedule.applyStartAt),
      applyEndAt: formatDateForPayload(values.schedule.applyEndAt),
      docResultAt: formatDateForPayload(values.schedule.docResultAt),
      interviewStartAt: formatDateForPayload(values.schedule.interviewStartAt),
      interviewEndAt: formatDateForPayload(values.schedule.interviewEndAt),
      finalResultAt: formatDateForPayload(values.schedule.finalResultAt),
      interviewTimeTable: values.schedule.interviewTimeTable,
    },
    noticeContent: values.noticeContent,
    status: values.status,
    items: values.items,
  }

  const openPreview = () => setModal({ isOpen: true, modalName: 'recruitingPreview' })
  const closePreview = () => setModal({ isOpen: false, modalName: '' })
  return (
    <PageLayout>
      <div ref={scrollTopRef} />
      <S.Header>
        <PageTitle title="새로운 모집 생성" />
        <Button
          typo="B4.Md"
          tone="lime"
          variant="outline"
          label="← 뒤로가기"
          onClick={() =>
            navigate({
              to: '/school/recruiting',
              replace: true,
            })
          }
        />
      </S.Header>
      <Section
        variant="outline"
        css={{
          padding: '30px 18px 18px 18px',
          [media.down(theme.breakPoints.tablet)]: { padding: '0px' },
        }}
      >
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
              page={step3PageNumber}
              setPage={setStep3PageNumber}
              part={step3SelectedPart}
              setPart={setStep3SelectedPart}
              partCompletion={partCompletionMap}
              setPartCompletion={setPartCompletionByPart}
            />
          )}
          {step === 4 && <Step4 control={control} />}
          {step === 5 && <Step5 setStep={setStep} formData={values} />}
        </form>
      </Section>
      <Flex
        justifyContent="space-between"
        gap={step === 5 ? 10 : 0}
        css={{
          height: '40px',
          [media.down(theme.breakPoints.mobile)]: {
            flexDirection: 'column',
            gap: '10px',
            height: '100px',
          },
        }}
      >
        <Flex width={'fit-content'} height={39} gap={18}>
          <Button
            tone="gray"
            variant="outline"
            label={step == 1 ? '취소' : '← 이전 단계'}
            css={{ width: step == 1 ? 70 : 120 }}
            onClick={goToPreviousStep}
          />
          <Button
            tone="lime"
            variant="outline"
            label="임시 저장"
            css={{ width: 98 }}
            onClick={() => {
              console.log('[Recruiting] form data:', submitPayload)
            }}
          />
        </Flex>
        <Flex width={'fit-content'} height={39}>
          {step < 5 && (
            <Flex width={'fit-content'} height={39}>
              <Button
                tone={canProceedStep ? 'lime' : 'gray'}
                variant="solid"
                label="다음 단계 →"
                css={{ width: 118 }}
                disabled={!canProceedStep}
                onClick={goToNextStep}
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
                onClick={openPreview}
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
                  console.log('[Recruiting] form data:', submitPayload)
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
      {modal.isOpen && modal.modalName === 'recruitingPreview' && (
        <RecruitingPreview title={title} onClose={closePreview} questionData={questionData} />
      )}
    </PageLayout>
  )
}

export default Recruiting
