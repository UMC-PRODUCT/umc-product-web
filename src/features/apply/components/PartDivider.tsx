import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

const PartDivider = ({ label }: { label: string }) => {
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
      {label}
    </Section>
  )
}

export default PartDivider
