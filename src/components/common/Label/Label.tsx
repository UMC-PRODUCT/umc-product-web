import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef } from 'react'

import Necessary from '@/assets/icons/Necessary.svg?react'
import { theme } from '@/styles/theme'

import { LabelStyle } from './Label.style'

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
  label: string
  necessary?: boolean
  size?: 'md' | 'lg'
}

export const Label = forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ label, necessary, size = 'md', ...props }, ref) => {
  const fontSize =
    size === 'md' ? theme.typography.C3.Md : theme.typography.B2.Md

  return (
    <LabelPrimitive.Root ref={ref} css={LabelStyle({ fontSize })} {...props}>
      {label}
      {necessary && <Necessary />}
    </LabelPrimitive.Root>
  )
})

Label.displayName = 'Label'

export default Label
