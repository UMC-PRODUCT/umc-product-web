import type * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { forwardRef } from 'react'

import CheckIcon from '@/assets/icons/check.svg?react'

import * as S from './Checkbox.style'

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>

export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <S.StyledRoot ref={ref} className={className} {...props}>
    <S.StyledIndicator>
      <CheckIcon color="black" />
    </S.StyledIndicator>
  </S.StyledRoot>
))

Checkbox.displayName = 'Checkbox'
