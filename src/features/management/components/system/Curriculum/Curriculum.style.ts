import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`

export const TopRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
`

export const PartTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  /* flex-wrap: wrap; */
  overflow-x: scroll;
`

export const PartButton = styled.button<{ $isActive: boolean }>`
  border: 1px solid ${({ $isActive }) => ($isActive ? theme.colors.lime : theme.colors.gray[300])};
  border-radius: 12px;
  padding: 0 24px;
  height: 40px;
  background-color: ${({ $isActive }) => ($isActive ? '#2a3a2a' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? theme.colors.lime : theme.colors.gray[400])};
  ${theme.typography.C3.Md};
  cursor: pointer;
`

export const SaveButton = styled.button`
  min-width: 60px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: ${theme.colors.lime};
  color: ${theme.colors.black};
  ${theme.typography.C3.Md};
  cursor: pointer;
`

export const Card = styled.div`
  width: 100%;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 14px;
  background: linear-gradient(180deg, #2a2a2a 0%, #262626 100%);
  padding: 18px;
  gap: 10px;
  height: 130px;
  display: flex;
  flex-direction: column;
`

export const Label = styled.p`
  margin: 0;
  color: ${theme.colors.white};
  ${theme.typography.H3.Sb};
`

export const Input = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.gray[600]};
  background-color: #191a1b;
  color: ${theme.colors.white};
  padding: 0 24px;
  ${theme.typography.B3.Rg};

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
`

export const WeekCard = styled.div`
  width: 100%;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 14px;
  background: #252525;
  padding: 30px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 20px;
    gap: 16px;
    flex-direction: column;
  }
`

export const WeekNumber = styled.div`
  width: 44px;
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b3b3b;
  color: ${theme.colors.lime};
  ${theme.typography.C3.Md};
  ${media.down(theme.breakPoints.tablet)} {
    width: 30px;
    height: 30px;
    min-width: 30px;
  }
`

export const WeekBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const FieldRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  ${media.down(theme.breakPoints.tablet)} {
    gap: 12px;
  }
`

export const FieldLabel = styled.div<{ $active?: boolean }>`
  width: 89px;
  min-width: 89px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a2a2a;
  padding: 6px 0;
  color: ${({ $active }) => ($active ? theme.colors.lime : theme.colors.gray[400])};
  ${media.down(theme.breakPoints.tablet)} {
    width: 60px;
    min-width: 60px;
    ${theme.typography.B5.Rg};
  }
  ${theme.typography.B3.Rg};
`

export const FieldInputWrap = styled.div`
  position: relative;
  flex: 1;
`

export const FieldInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.gray[600]};
  background-color: #191a1b;
  color: ${theme.colors.white};
  padding: 0 56px 0 24px;
  ${theme.typography.B3.Rg};

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }
  ${media.down(theme.breakPoints.tablet)} {
    height: 32px;
    padding: 0 40px 0 16px;
    ${theme.typography.B5.Rg};
  }
`

export const EditIconWrap = styled.div`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray[300]};
  ${media.down(theme.breakPoints.tablet)} {
    right: 12px;
    svg {
      width: 12px;
      height: 12px;
    }
  }
`

export const AddWeekButton = styled.button`
  width: 100%;
  min-height: 130px;
  border-radius: 14px;
  border: 1px dashed #4a4a4a;
  background: transparent;
  color: ${theme.colors.gray[500]};
  ${theme.typography.B3.Rg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`
