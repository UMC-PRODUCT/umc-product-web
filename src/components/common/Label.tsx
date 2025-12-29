import Necessary from '@/assets/icons/Necessary.svg?react'
import { theme } from '@/styles/theme'
import { css } from '@emotion/react'

const LabelStyle = ({
  fontSize,
}: {
  fontSize: typeof theme.typography.C3.Md | typeof theme.typography.B2.Md
}) =>
  css({
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.white,
    gap: 4,
    marginBottom: 10,
    ...fontSize,
  })

export default function Label({
  label,
  necessary,
  size = 'md',
}: {
  label: string
  necessary?: boolean
  size?: 'md' | 'lg'
}) {
  const fontSize =
    size === 'md' ? theme.typography.C3.Md : theme.typography.B2.Md
  return (
    <label css={LabelStyle({ fontSize })}>
      {label}
      {necessary && <Necessary></Necessary>}
    </label>
  )
}
