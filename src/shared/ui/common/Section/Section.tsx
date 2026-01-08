import type { ComponentProps } from 'react'

import * as S from './Section.style'

type SectionProps = Omit<ComponentProps<typeof S.Section>, '$variant'> & {
  variant?: 'solid' | 'outline' | 'none' | 'both' | 'dashed'
}

const Section = ({ variant, children, css, ...flexProps }: SectionProps) => {
  return (
    <S.Section $variant={variant} css={css} {...flexProps}>
      {children}
    </S.Section>
  )
}

export default Section
