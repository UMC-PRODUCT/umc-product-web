import type { CSSObject } from '@emotion/react'
import styled from '@emotion/styled'

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

export const FieldInput = styled.input<{ typo?: TypoToken }>`
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  ${({ typo }) => resolveTypo(typo) ?? (theme.typography.C5.Rg as CSSObject)};
  transition:
    border-color 140ms ease,
    box-shadow 140ms ease,
    transform 120ms ease;

  &::placeholder {
    color: ${theme.colors.gray[300]};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.lime};
    border-color: ${theme.colors.lime};
    box-shadow: 0 0 0 4px rgba(149, 239, 75, 0.15);
  }
`
