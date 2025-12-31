import Necessary from '@/assets/icons/Necessary.svg?react'
import { theme } from '@/styles/theme'
import { LabelStyle } from './Label.style'

type LabelProps = {
  label: string
  necessary?: boolean
  size?: 'md' | 'lg'
}

export default function Label({ label, necessary, size = 'md' }: LabelProps) {
  const fontSize =
    size === 'md' ? theme.typography.C3.Md : theme.typography.B2.Md
  return (
    <label css={LabelStyle({ fontSize })}>
      {label}
      {necessary && <Necessary />}
    </label>
  )
}
