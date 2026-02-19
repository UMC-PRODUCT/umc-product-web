import type { CSSObject } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { TypoGroup, TypoToken } from '@/shared/types/typo'

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`

const resolveTypo = (typo?: TypoToken): CSSObject | undefined => {
  if (!typo) return undefined
  const [group, weight] = typo.split('.') as [TypoGroup, 'Sb' | 'Md' | 'Rg']
  const groupStyle = theme.typography[group] as
    | { Sb?: CSSObject; Md?: CSSObject; Rg?: CSSObject }
    | undefined
  return groupStyle?.[weight]
}

export const FieldLabel = styled.label<{ typo?: TypoToken }>`
  color: ${theme.colors.white};
  ${({ typo }) => resolveTypo(typo) ?? (theme.typography.C4.Rg as CSSObject)}
`

type ResponsiveTypo = Partial<Record<'desktop' | 'tablet' | 'mobile', TypoToken>>

export const FieldInput = styled.input<{ typo?: TypoToken; responsiveTypo?: ResponsiveTypo }>`
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  ${({ typo }) => resolveTypo(typo) ?? (theme.typography.C5.Rg as CSSObject)};
  ${({ responsiveTypo }) =>
    responsiveTypo?.desktop
      ? {
          [media.up(theme.breakPoints.desktop)]: resolveTypo(responsiveTypo.desktop),
        }
      : undefined}
  ${({ responsiveTypo }) =>
    responsiveTypo?.tablet
      ? {
          [media.down(theme.breakPoints.tablet)]: resolveTypo(responsiveTypo.tablet),
        }
      : undefined}
  ${({ responsiveTypo }) =>
    responsiveTypo?.mobile
      ? {
          [media.down(theme.breakPoints.mobile)]: resolveTypo(responsiveTypo.mobile),
        }
      : undefined}
  transition:
    border-color 140ms ease,
    box-shadow 140ms ease,
    transform 120ms ease;

  &::placeholder {
    color: ${theme.colors.gray[300]};
  }

  &:focus-visible {
    outline: 1px solid ${theme.colors.lime};
    border-color: ${theme.colors.lime};
    box-shadow: 0 0 0 4px rgba(149, 239, 75, 0.15);
  }
`
