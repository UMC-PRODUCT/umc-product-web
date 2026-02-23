import { forwardRef } from 'react'
import type * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import CheckIcon from '@/shared/assets/icons/check.svg?react'

import * as S from './Checkbox.style'

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, 'aria-label': ariaLabel, ...props }, ref) => (
  <S.StyledRoot ref={ref} className={className} aria-label={ariaLabel ?? '체크박스'} {...props}>
    <S.StyledIndicator>
      <CheckIcon color="black" />
    </S.StyledIndicator>
  </S.StyledRoot>
))

Checkbox.displayName = 'Checkbox'
