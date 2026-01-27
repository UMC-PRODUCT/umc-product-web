import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { PART_CONFIG } from '@/features/auth/domain'
import { PART } from '@/shared/constants/umc'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms } from '@/shared/types/form'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from '../common'

const Step1 = ({ control }: { control: Control<RecruitingForms> }) => {
  return (
    <Flex flexDirection="column" gap={18}>
      <Section gap={29} variant="solid" flexDirection="column" alignItems="flex-start">
        <Flex gap={6} flexDirection="column" alignItems="flex-start">
          <S.Title>모집 이름</S.Title>
          <S.SubTitle>모집 이름을 입력하세요.</S.SubTitle>
        </Flex>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <LabelTextField
              type="text"
              autoComplete="none"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="모집 이름"
              placeholder="예: UMC 중앙대학교 9기 모집"
              css={{ maxWidth: 560 }}
              error={{
                error: !!fieldState.error,
                errorMessage: fieldState.error?.message || '',
              }}
            />
          )}
        />
      </Section>
      <Section gap={29} variant="solid" flexDirection="column" alignItems="flex-start">
        <Flex gap={6} flexDirection="column" alignItems="flex-start">
          <S.Title>모집 파트</S.Title>
          <S.SubTitle>모집할 파트를 1개 이상 선택하세요.</S.SubTitle>
        </Flex>
        <Controller
          name="recruitmentParts"
          control={control}
          render={({ field, fieldState }) => (
            <Flex gap={6} flexDirection="column" alignItems="flex-start">
              {fieldState.error && (
                <ErrorMessage
                  typo="B4.Md"
                  responsiveTypo={{ tablet: 'B4.Md' }}
                  errorMessage={fieldState.error.message || ''}
                />
              )}
              <Flex
                gap={20}
                css={{
                  flexWrap: 'wrap',
                  [media.down(theme.breakPoints.tablet)]: { justifyContent: 'center' },
                }}
              >
                {PART.map((part) => {
                  const selected = Array.isArray(field.value) ? field.value : []
                  const partId = part
                  const partLabel = PART_CONFIG[part].label
                  const isActive = selected.includes(partId)
                  return (
                    <S.Button
                      key={part}
                      isActive={isActive}
                      type="button"
                      onClick={() => {
                        const next = isActive
                          ? selected.filter((item: string) => item !== partId)
                          : [...selected, partId]
                        field.onChange(next)
                      }}
                    >
                      {partLabel}
                    </S.Button>
                  )
                })}
              </Flex>
            </Flex>
          )}
        />
      </Section>
    </Flex>
  )
}

export default Step1
