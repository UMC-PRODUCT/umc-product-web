import type { ComponentProps } from 'react'

import * as S from './Section.style'

type SectionProps = ComponentProps<typeof S.Section>

export default function Section({ variant, children, css, ...flexProps }: SectionProps) {
  return (
    <S.Section variant={variant} css={css} {...flexProps}>
      {children}
    </S.Section>
  )
}
