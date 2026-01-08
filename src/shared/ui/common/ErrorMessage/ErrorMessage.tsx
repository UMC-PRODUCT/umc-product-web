import { css } from '@emotion/react'

import { theme } from '@shared/styles/theme'

import type { TypoToken } from '@/shared/types/typo'
import { resolveTypo } from '@/shared/utils/resolveTypo'

const span = ({ typo }: { typo: TypoToken | undefined }) => {
  if (!typo) {
    return css({
      color: theme.colors.necessary,
      ...theme.typography.B3.Md,
    })
  }
  const textStyle = resolveTypo(theme, typo)
  return css({
    color: theme.colors.necessary,
    ...textStyle,
  })
}

const ErrorMessage = ({ errorMessage, typo }: { errorMessage: string; typo?: TypoToken }) => {
  return <span css={span({ typo })}>{errorMessage}</span>
}

export default ErrorMessage
