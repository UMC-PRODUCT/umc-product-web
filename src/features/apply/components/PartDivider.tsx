import type { PartType } from '@/features/auth/domain'
import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

const PartDivider = ({ label }: { label: PartType }) => {
  const displayLabel = PART_TYPE_TO_SMALL_PART[label]

  return (
    <Section
      key={`label-${label}`}
      variant="solid"
      alignItems="flex-start"
      padding={'15px 20px'}
      css={{
        ...theme.typography.B3.Sb,
        color: theme.colors.lime,
      }}
    >
      {displayLabel}
    </Section>
  )
}

export default PartDivider
