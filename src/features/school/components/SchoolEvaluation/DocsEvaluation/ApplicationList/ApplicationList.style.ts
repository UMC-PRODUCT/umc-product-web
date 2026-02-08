import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const FilterWrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
  width: 100%;
  .dropdown {
    max-width: 120px;
  }
`
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
`

export const SubTitle = styled.div`
  ${theme.typography.B4.Sb};
  color: ${theme.colors.white};
`

export const Info = styled.div`
  ${theme.typography.B4.Md};
  color: ${theme.colors.lime};
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid ${theme.colors.gray[700]};
`

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 0.5fr;
  padding: 12px 16px;
  background-color: ${theme.colors.gray[600]};
  border-radius: 4px;
  ${theme.typography.B5.Md};
  color: ${theme.colors.gray[300]};
  text-align: center;

  span:first-of-type {
    text-align: left;
  }
  span:last-of-type {
    text-align: right;
  }
`

export const ScrollArea = styled.div`
  height: 500px; // 이미지 비중에 맞춰 조절
  overflow-y: auto;

  /* 스크롤바 스타일 (이미지의 얇은 회색 바 구현) */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[600]};
    border-radius: 10px;
  }
`

export const ListItem = styled.div<{ isSelected: boolean }>`
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 0.5fr;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${theme.colors.gray[800]};
  cursor: pointer;
  transition: all 0.2s;

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: ${theme.colors.gray[800]};
    border: 1.5px solid ${theme.colors.lime};
    border-radius: 8px;
    margin: 2px 0;
  `}

  &:hover {
    background-color: ${theme.colors.gray[800]};
  }
`
export const NoApplicants = styled.div`
  ${theme.typography.B5.Rg};
  color: ${theme.colors.gray[500]};
  text-align: center;
  padding: 24px 0;
`

export const Name = styled.span`
  ${theme.typography.B5.Md};
  color: ${theme.colors.white};
`

export const Part = styled.span`
  ${theme.typography.B5.Rg};
  color: ${theme.colors.gray[300]};
  text-align: center;
`

export const StatusCircle = styled.div<{ isEvaluated: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid ${theme.colors.gray[500]};
  justify-self: flex-end;
  align-items: center;
  justify-content: center;
  display: flex;

  ${({ isEvaluated }) =>
    isEvaluated &&
    `
    background-color: ${theme.colors.lime};
    border-color: ${theme.colors.lime};
  `}
`
