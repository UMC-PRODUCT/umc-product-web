import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import { managementKeys } from '@/shared/queryKeys'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SectionTitle from '@/shared/ui/common/SectionTitles/SectionTitle'
import LabelCalendar from '@/shared/ui/form/LabelCalendar/LabelCalendar'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from './GenerationCreate.style'

const GenerationCreate = () => {
  const queryClient = useQueryClient()
  const { usePostGisu } = useManagementMutations()
  const { mutate: postGisuMutation } = usePostGisu()
  const [gisuNumber, setGisuNumber] = useState('')
  const [startAt, setStartAt] = useState<Date | null>(null)
  const [endAt, setEndAt] = useState<Date | null>(null)

  const handleSubmit = () => {
    const trimmedNumber = gisuNumber.trim()
    if (!trimmedNumber || !startAt || !endAt) return

    postGisuMutation(
      {
        number: trimmedNumber,
        startAt: dayjs(startAt).startOf('day').toISOString(),
        endAt: dayjs(endAt).startOf('day').toISOString(),
      },
      {
        onSuccess: () => {
          setGisuNumber('')
          setStartAt(null)
          setEndAt(null)
          queryClient.invalidateQueries({ queryKey: managementKeys.getAllGisu })
          queryClient.invalidateQueries({ queryKey: ['management', 'gisuList'] })
        },
      },
    )
  }

  return (
    <Section variant="solid" alignItems="flex-start" gap={10}>
      <SectionTitle title="기수 생성" />
      <S.ButtonWrapper flexDirection="column" gap={20}>
        <Flex
          css={{
            width: '400px !important',
            alignSelf: 'flex-start',
            [media.down(theme.breakPoints.tablet)]: { width: '100%' },
          }}
        >
          <LabelTextField
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="none"
            label="기수 번호"
            placeholder="기수 번호를 입력하세요."
            value={gisuNumber}
            onChange={(event) => {
              const nextValue = event.target.value.replace(/\D/g, '')
              setGisuNumber(nextValue)
            }}
            css={{ width: '100%' }}
          />
        </Flex>
        <Flex
          css={{
            gap: '10px',
            [media.down(theme.breakPoints.tablet)]: { flexDirection: 'column', gap: '20px' },
          }}
        >
          <LabelCalendar
            label="기수 시작일"
            placeholder="시작일을 선택해주세요."
            value={startAt}
            onChange={(date) => setStartAt(date)}
          />
          <LabelCalendar
            label="기수 마감일"
            placeholder="마감일을 선택해주세요."
            value={endAt}
            onChange={(date) => setEndAt(date)}
          />
        </Flex>
        <Button
          variant="solid"
          tone="lime"
          label="생성하기"
          typo="C3.Md"
          css={{
            width: 'fit-content',
            height: '40px',
            padding: '7px 17px',

            alignSelf: 'flex-end',
          }}
          onClick={handleSubmit}
          disabled={!gisuNumber.trim() || !startAt || !endAt}
        />
      </S.ButtonWrapper>
    </Section>
  )
}

export default GenerationCreate
