import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

import * as S from '@/features/school/components/common/common'
import RecruitingStep from '@/features/school/components/Recruiting/RecruitingStepIndicator/RecruitingStep'
import { PART } from '@/shared/constants/umc'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import type { RecruitingForms } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import CurrentStepInfo from '../components/Recruiting/CurrentStepInfo/CurrentStepInfo'
import Step1 from '../components/Recruiting/RecruitingStepPage/Step1'
import Step2 from '../components/Recruiting/RecruitingStepPage/Step2'
import Step3 from '../components/Recruiting/RecruitingStepPage/Step3'
import Step4 from '../components/Recruiting/RecruitingStepPage/Step4'
import { getStepReady, recruitingFormSchema } from './validation'

const Recruiting = () => {
  const [step, setStep] = useState(3)
  const navigate = useNavigate()
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigate({
        to: '/school/recruiting',
        replace: true,
      })
    }
  }

  const stepRef = useRef(step)
  useEffect(() => {
    stepRef.current = step
  }, [step])

  const resolver = useMemo(() => zodResolver(recruitingFormSchema), [])

  const { control, trigger, setValue, setError, clearErrors } = useForm<RecruitingForms>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver,
    defaultValues: {
      recruitingName: '',
      recruitingPart: [],
      documentStartDate: null,
      documentEndDate: null,
      documentResultDate: null,
      interviewStartDate: null,
      interviewEndDate: null,
      finalResultDate: null,
      interviewTimeSlots: {},
      noticeTitle: '',
      noticeContent: '',
      questionPages: [
        {
          page: 1,
          questions: [
            {
              questionId: 1,
              question: '',
              type: 'PART',
              necessary: true,
              options: [...PART],
              partSinglePick: false,
              isPartQuestion: true,
            },
            {
              questionId: 2,
              question: '',
              type: 'LONG_TEXT',
              necessary: true,
              options: [],
              partSinglePick: false,
              isPartQuestion: false,
            },
          ],
        },
        {
          page: 2,
          questions: [
            {
              questionId: 3,
              question: '',
              type: 'LONG_TEXT',
              necessary: true,
              options: [],
              partSinglePick: false,
              isPartQuestion: false,
            },
          ],
        },
        {
          page: 3,
          questions: [
            {
              questionId: 4,
              question: '',
              type: 'LONG_TEXT',
              necessary: true,
              options: [],
              partSinglePick: false,
              isPartQuestion: false,
            },
          ],
        },
      ],
    },
  })

  const [
    recruitingName,
    recruitingPart,
    documentStartDate,
    documentEndDate,
    documentResultDate,
    interviewStartDate,
    interviewEndDate,
    finalResultDate,
    interviewTimeSlots,
    questionPages,
    noticeTitle,
    noticeContent,
  ] = useWatch({
    control,
    name: [
      'recruitingName',
      'recruitingPart',
      'documentStartDate',
      'documentEndDate',
      'documentResultDate',
      'interviewStartDate',
      'interviewEndDate',
      'finalResultDate',
      'interviewTimeSlots',
      'questionPages',
      'noticeTitle',
      'noticeContent',
    ],
  })

  const interviewDates = useMemo(() => {
    if (!interviewStartDate || !interviewEndDate) return []
    const start = dayjs(interviewStartDate).startOf('day')
    const end = dayjs(interviewEndDate).startOf('day')
    if (end.isBefore(start, 'day')) return []
    const dates: Array<string> = []
    let current = start
    while (!current.isAfter(end, 'day')) {
      dates.push(current.format('YYYY/MM/DD'))
      current = current.add(1, 'day')
    }
    return dates
  }, [interviewStartDate, interviewEndDate])

  const isStepReady = useMemo(
    () =>
      getStepReady(
        step,
        {
          recruitingName,
          recruitingPart,
          documentStartDate,
          documentEndDate,
          documentResultDate,
          interviewStartDate,
          interviewEndDate,
          finalResultDate,
          interviewTimeSlots,
          questionPages,
          noticeTitle,
          noticeContent,
        },
        { interviewDates },
      ),
    [
      step,
      recruitingName,
      recruitingPart,
      documentStartDate,
      documentEndDate,
      documentResultDate,
      interviewStartDate,
      interviewEndDate,
      finalResultDate,
      interviewTimeSlots,
      questionPages,
      noticeTitle,
      noticeContent,
      interviewDates,
    ],
  )
  const handleNext = async () => {
    if (step === 1) {
      if (!getStepReady(1, { recruitingName, recruitingPart } as RecruitingForms)) {
        await trigger(['recruitingName', 'recruitingPart'], { shouldFocus: true })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    if (step === 2) {
      if (
        !getStepReady(
          2,
          {
            documentStartDate,
            documentEndDate,
            documentResultDate,
            interviewStartDate,
            interviewEndDate,
            finalResultDate,
            interviewTimeSlots,
          } as RecruitingForms,
          { interviewDates },
        )
      ) {
        await trigger(
          [
            'documentStartDate',
            'documentEndDate',
            'documentResultDate',
            'interviewStartDate',
            'interviewEndDate',
            'finalResultDate',
            'interviewTimeSlots',
          ],
          { shouldFocus: true },
        )
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    if (step === 3) {
      if (!getStepReady(3, { questionPages } as RecruitingForms)) {
        await trigger(['questionPages'], { shouldFocus: true })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    if (step === 4) {
      if (!getStepReady(4, { noticeTitle, noticeContent } as RecruitingForms)) {
        await trigger(['noticeTitle', 'noticeContent'], { shouldFocus: true })
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
    }
    setStep(step + 1)
  }

  return (
    <PageLayout>
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
          {step === 3 && <Step3 control={control} trigger={trigger} />}
          {step === 4 && <Step4 control={control} />}
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
          <Button tone="lime" variant="outline" label="임시 저장" css={{ width: 98 }} />
        </Flex>
        <Button
          tone={isStepReady ? 'lime' : 'gray'}
          variant="solid"
          label="다음 단계 →"
          css={{ width: 118 }}
          disabled={!isStepReady}
          onClick={handleNext}
        />
      </Flex>
    </PageLayout>
  )
}

export default Recruiting
