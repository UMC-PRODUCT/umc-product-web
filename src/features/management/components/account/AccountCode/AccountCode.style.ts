import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-8px);
  }

  40% {
    transform: translateX(6px);
  }

  60% {
    transform: translateX(-4px);
  }

  80% {
    transform: translateX(3px);
  }
`

const highlightOutline = keyframes`
  0% {
    opacity: 0;
    border-color: rgba(249, 87, 85, 0);
    box-shadow: 0 0 0 0 rgba(249, 87, 85, 0);
  }

  30% {
    opacity: 1;
    border-color: rgba(249, 87, 85, 0.95);
    box-shadow:
      0 0 0 1px rgba(249, 87, 85, 0.24),
      0 0 0 8px rgba(249, 87, 85, 0.14);
  }

  100% {
    opacity: 1;
    border-color: rgba(249, 87, 85, 0.28);
    box-shadow:
      0 0 0 1px rgba(249, 87, 85, 0.12),
      0 0 0 0 rgba(249, 87, 85, 0);
  }
`

export const Container = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 16px;
`

export const GisuSelector = styled.div`
  width: min(100%, 300px);
`

export const GisuDropdownFrame = styled.div<{ $isHighlighted: boolean }>`
  position: relative;
  width: 100%;
  border-radius: 8px;
  transition: box-shadow 180ms ease;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 12px;
    border: 2px solid transparent;
    opacity: 0;
    pointer-events: none;
  }

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      animation: ${shake} 420ms ease;

      &::after {
        animation: ${highlightOutline} 1.25s ease;
      }
    `}
`

export const GisuGuideText = styled.p<{ $isHighlighted: boolean }>`
  margin: 8px 4px 0;
  color: ${({ $isHighlighted }) =>
    $isHighlighted ? theme.colors.necessary : theme.colors.gray[400]};
  opacity: ${({ $isHighlighted }) => ($isHighlighted ? 1 : 0.88)};
  transition:
    color 160ms ease,
    opacity 160ms ease;
  ${theme.typography.C5.Md};
`

export const HeroCard = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(212, 255, 0, 0.14);
  background:
    radial-gradient(circle at top right, rgba(212, 255, 0, 0.12), transparent 36%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)),
    ${theme.colors.gray[800]};
`

export const HeroEyebrow = styled.span`
  color: ${theme.colors.lime};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  ${theme.typography.C5.Md};
`

export const HeroTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.white};
  ${theme.typography.H4.Sb};
`

export const HeroDescription = styled.p`
  margin: 0;
  color: ${theme.colors.gray[300]};
  ${theme.typography.B3.Rg};
`

export const ScopeGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 320px) repeat(2, minmax(0, 1fr));
  gap: 12px;

  ${media.down(theme.breakPoints.desktop)} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const ScopeCard = styled(Flex)`
  min-height: 92px;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 16px 18px;
  border-radius: 12px;
  background-color: rgba(18, 18, 18, 0.78);
  border: 1px solid ${theme.colors.gray[700]};
`

export const ScopeLabel = styled.span`
  color: ${theme.colors.gray[400]};
  ${theme.typography.C4.Rg};
`

export const ScopeValue = styled.strong`
  color: ${theme.colors.white};
  ${theme.typography.B2.Md};
`

export const SectionHeader = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  ${media.down(theme.breakPoints.tablet)} {
    flex-direction: column;
  }
`

export const SectionTitleWrap = styled(Flex)`
  flex-direction: column;
  gap: 4px;
`

export const SectionTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.white};
  ${theme.typography.H4.Sb};
`

export const SectionDescription = styled.p`
  margin: 0;
  color: ${theme.colors.gray[400]};
  ${theme.typography.C4.Rg};
`

export const Actions = styled(Flex)`
  gap: 8px;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  width: 100%;

  ${media.down(theme.breakPoints.desktop)} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const RowList = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 12px;
`

export const RowCard = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid ${theme.colors.gray[700]};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0)),
    ${theme.colors.gray[800]};
`

export const RowHeader = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`

export const RowIndex = styled(Flex)`
  gap: 10px;
  align-items: center;
  color: ${theme.colors.white};
  ${theme.typography.B3.Sb};
`

export const RowBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
  border-radius: 999px;
  background-color: rgba(212, 255, 0, 0.16);
  color: ${theme.colors.lime};
  ${theme.typography.B5.Sb};
`

export const RowMeta = styled.span`
  color: ${theme.colors.gray[400]};
  ${theme.typography.C5.Rg};
  white-space: nowrap;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`

export const ControlShell = styled.div<{ $isBlocked: boolean }>`
  position: relative;
  width: 100%;
  min-width: 0;
  border-radius: 8px;

  ${({ $isBlocked }) =>
    $isBlocked &&
    `
      cursor: pointer;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background-color: transparent;
        transition: background-color 140ms ease;
        pointer-events: none;
      }

      &:hover::after {
        background-color: rgba(249, 87, 85, 0.06);
      }

      &:active::after {
        background-color: rgba(249, 87, 85, 0.1);
      }
    `}
`

export const FieldLabel = styled.span`
  color: ${theme.colors.gray[300]};
  ${theme.typography.C5.Md};
`

export const FieldHint = styled.span`
  color: ${theme.colors.gray[500]};
  ${theme.typography.C5.Rg};
`

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.gray[600]};
  background-color: ${theme.colors.black};
  padding: 0 14px;
  color: ${theme.colors.white};
  ${theme.typography.B3.Rg};

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.lime};
    box-shadow: 0 0 0 1px rgba(212, 255, 0, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    color: ${theme.colors.gray[500]};
  }
`

export const StatusBanner = styled.div<{ $tone: 'success' | 'error' }>`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid
    ${({ $tone }) => ($tone === 'success' ? theme.colors.lime : theme.colors.caution)};
  color: ${({ $tone }) => ($tone === 'success' ? theme.colors.lime : theme.colors.caution)};
  ${theme.typography.C3.Md};
`

export const ScopeErrorActions = styled(Flex)`
  width: 100%;

  ${media.down(theme.breakPoints.tablet)} {
    flex-direction: column;
  }
`

export const EmptyState = styled(Flex)`
  width: 100%;
  min-height: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 14px;
  border: 1px dashed ${theme.colors.gray[600]};
  color: ${theme.colors.gray[400]};
  text-align: center;
`

export const EmptyTitle = styled.strong`
  color: ${theme.colors.white};
  ${theme.typography.B3.Sb};
`

export const EmptyDescription = styled.p`
  margin: 0;
  max-width: 420px;
  ${theme.typography.C4.Rg};
`

export const CodeChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  padding: 8px 12px;
  border-radius: 999px;
  background-color: rgba(212, 255, 0, 0.14);
  color: ${theme.colors.lime};
  letter-spacing: 0.08em;
  ${theme.typography.B5.Sb};
`

export const MetaText = styled.span`
  color: ${theme.colors.gray[300]};
  ${theme.typography.C4.Rg};
`

export const MetaSubText = styled.span`
  color: ${theme.colors.gray[500]};
  ${theme.typography.C5.Rg};
`
