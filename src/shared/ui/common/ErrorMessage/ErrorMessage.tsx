import { css } from '@emotion/react'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { TypoToken } from '@/shared/types/typo'
import { resolveTypo } from '@/shared/utils/resolveTypo'

type ResponsiveTypo = Partial<Record<'desktop' | 'tablet' | 'mobile', TypoToken>>

const span = ({
  typo,
  responsiveTypo,
}: {
  typo: TypoToken | undefined
  responsiveTypo?: ResponsiveTypo
}) => {
  const baseStyle = typo ? resolveTypo(theme, typo) : theme.typography.B3.Md

  return css({
    color: theme.colors.necessary,
    ...baseStyle,
    ...(responsiveTypo?.desktop && {
      [media.up(theme.breakPoints.desktop)]: resolveTypo(theme, responsiveTypo.desktop),
    }),
    ...(responsiveTypo?.tablet && {
      [media.down(theme.breakPoints.tablet)]: resolveTypo(theme, responsiveTypo.tablet),
    }),
    ...(responsiveTypo?.mobile && {
      [media.down(theme.breakPoints.mobile)]: resolveTypo(theme, responsiveTypo.mobile),
    }),
  })
}

const ErrorMessage = ({
  errorMessage,
  typo,
  responsiveTypo,
}: {
  errorMessage: string
  typo?: TypoToken
  responsiveTypo?: ResponsiveTypo
}) => {
  return <span css={span({ typo, responsiveTypo })}>{errorMessage}</span>
}

export default ErrorMessage
