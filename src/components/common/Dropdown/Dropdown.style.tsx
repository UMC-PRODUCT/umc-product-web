import { inputShell } from '@/styles/formStyles'
import { theme } from '@/styles/theme'
import styled from '@emotion/styled'
const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`
const Trigger = styled.button<{ $open: boolean }>`
  ${inputShell};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  transform: translateY(${({ $open }) => ($open ? '1px' : '0')});
`
const Placeholder = styled.span`
  color: ${theme.colors.gray[400]};
`
const ArrowBox = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 180ms ease;
  pointer-events: none;
`
const Options = styled.ul<{ $open: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  max-height: 220px;
  overflow-y: auto;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? '0' : '4px')});
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition:
    opacity 150ms ease,
    transform 150ms ease;
  z-index: 20;
`
const OptionItem = styled.li<{ $selected: boolean }>`
  padding: 10px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: ${({ $selected }) =>
    $selected ? theme.colors.white : theme.colors.gray[400]};
  background: ${({ $selected }) =>
    $selected ? theme.colors.gray[700] : 'transparent'};
  transition:
    background 120ms ease,
    color 120ms ease;

  &:hover {
    background: ${theme.colors.gray[700]};
  }
`
export { SelectWrapper, Trigger, Placeholder, ArrowBox, Options, OptionItem }
