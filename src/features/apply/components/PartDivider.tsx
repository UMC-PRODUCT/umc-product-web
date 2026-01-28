import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

const transformLabel = (value: string) => {
  if (!value) return value
  const words = value.toLowerCase().split(' ')
  return words.map((word) => (word ? `${word[0].toUpperCase()}${word.slice(1)}` : word)).join(' ')
}

const PartDivider = ({ label }: { label: string }) => {
  const displayLabel = transformLabel(label)

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
