import { PART_TYPE_TO_SMALL_PART } from '@shared/constants/part'

import type { PartSmallType, PartType } from '@/features/auth/domain/model'
import CheckIcon from '@/shared/assets/icons/check.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

type Step3PartHeaderProps = {
  partOptions: Array<Option<PartSmallType>>
  selectedPart: PartType | null
  isSelectedPartComplete: boolean
  partCompletion: Partial<Record<PartType, boolean>>
  onChangePart: (part: PartType) => void
  onChangeStatus: (isComplete: boolean) => void
  disabled?: boolean
}

const Step3PartHeader = ({
  partOptions,
  selectedPart,
  isSelectedPartComplete,
  partCompletion,
  onChangePart,
  onChangeStatus,
  disabled = false,
}: Step3PartHeaderProps) => {
  const isCompletionToggleDisabled = disabled
  return (
    <Section
      variant="solid"
      justifyContent="space-between"
      alignItems="center"
      padding={'12px 26px'}
      css={{
        flexDirection: 'row',
        [media.down(theme.breakPoints.mobile)]: { flexDirection: 'column', gap: '12px' },
      }}
    >
      <Dropdown
        options={partOptions}
        placeholder="파트를 선택해 주세요."
        value={
          selectedPart
            ? {
                label: PART_TYPE_TO_SMALL_PART[selectedPart],
                id: selectedPart,
              }
            : undefined
        }
        onChange={(option) => onChangePart(option.id as PartType)}
        css={{ width: 300, maxWidth: '100%' }}
        optionSuffix={(option) =>
          partCompletion[option.id as PartType] ? (
            <span
              css={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: theme.colors.lime,
                flexShrink: 0,
              }}
            >
              <CheckIcon width={10} height={10} color={theme.colors.black} />
            </span>
          ) : null
        }
      />

      <Flex gap={14} width={'fit-content'} alignItems="center">
        <Badge
          typo="B4.Sb"
          tone={'gray'}
          variant={isSelectedPartComplete ? 'outline' : 'solid'}
          css={{
            padding: '4px 14px',
            cursor: selectedPart && !isCompletionToggleDisabled ? 'pointer' : 'default',
            opacity: isCompletionToggleDisabled ? 0.5 : 1,
          }}
          onClick={isCompletionToggleDisabled ? undefined : () => onChangeStatus(false)}
        >
          작성 중
        </Badge>
        <Badge
          typo="B4.Sb"
          tone={'gray'}
          variant={isSelectedPartComplete ? 'solid' : 'outline'}
          css={{
            padding: '4px 14px',
            cursor: selectedPart && !isCompletionToggleDisabled ? 'pointer' : 'default',
            opacity: isCompletionToggleDisabled ? 0.5 : 1,
          }}
          onClick={isCompletionToggleDisabled ? undefined : () => onChangeStatus(true)}
        >
          작성 완료
        </Badge>
      </Flex>
    </Section>
  )
}

export default Step3PartHeader
