import { css } from '@emotion/react'
import { theme } from '@/styles/theme'

const span = () =>
  css({
    width: '100%',
    color: theme.colors.necessary,
    ...theme.typography.C3.Md,
  })

export default function ErrorMessage({
  errorMessage,
}: {
  errorMessage: string
}) {
  return <span css={span()}>{errorMessage}</span>
}
