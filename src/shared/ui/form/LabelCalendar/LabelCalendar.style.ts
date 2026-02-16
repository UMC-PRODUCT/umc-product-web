import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const CalendarWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const Trigger = styled.button<{ $open: boolean }>`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  width: 100%;
  background-color: ${theme.colors.black};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 6px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const Value = styled.span<{ $placeholder: boolean }>`
  color: ${({ $placeholder }) => ($placeholder ? theme.colors.gray[400] : theme.colors.white)};
`

export const CalendarPopover = styled.div<{ $open: boolean }>`
  position: absolute;
  left: 0;
  right: auto;
  width: max-content;
  min-width: 100%;
  max-width: min(100vw - 32px, 420px);
  top: calc(100% + 8px);
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  transform: translateY(${({ $open }) => ($open ? '0' : '4px')});
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition:
    opacity 150ms ease,
    transform 150ms ease;
  z-index: 20;
`

export const SelectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`
