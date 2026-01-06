import { theme } from '@shared/styles/theme'

import Section from '@/shared/ui/common/Section/Section'

export function EmptySelectionNotice({ variant = 'solid' }: { variant?: 'solid' | 'outline' }) {
  return (
    <Section variant={variant}>
      <span
        css={{
          padding: '80px 0',
          color: theme.colors.gray[300],
          ...theme.typography.B3.Rg,
        }}
      >
        선택된 학교가 없습니다.
      </span>
    </Section>
  )
}
