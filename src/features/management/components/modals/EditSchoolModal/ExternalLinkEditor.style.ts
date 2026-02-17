import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`

export const FieldLabel = styled.label`
  ${theme.typography.C4.Rg};
  color: ${theme.colors.white};
`

export const FieldInput = styled.input`
  height: 30px;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  ${theme.typography.C4.Rg};
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

export const DropdownField = styled.div`
  position: relative;
  width: 130px;
  height: 30px;
  margin-top: auto;
  ${theme.typography.C5.Md};
`

export const DropdownButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  ${theme.typography.C5.Md};
  cursor: pointer;

  &:focus-visible {
    outline: 1px solid ${theme.colors.lime};
    border-color: ${theme.colors.lime};
    box-shadow: 0 0 0 4px rgba(149, 239, 75, 0.15);
  }
`

export const DropdownArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 160ms ease;

  &[data-open] {
    transform: rotate(180deg);
  }
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  background-color: ${theme.colors.black};
  border: none;
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
  z-index: 10;
`

export const DropdownItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: ${theme.colors.white};
  padding: 6px 8px;
  border-radius: 6px;
  text-align: left;
  cursor: pointer;
  ${theme.typography.C5.Md};

  &[data-selected] {
    background: ${theme.colors.gray[700]};
  }

  &:hover {
    background: ${theme.colors.gray[700]};
  }
`
