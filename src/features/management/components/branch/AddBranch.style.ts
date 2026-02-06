import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'
// 스타일 컴포넌트 (스크린샷 디자인 참고)
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
`

export const AddCard = styled.div`
  height: 280px;
  border: 2px dashed #333;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.colors.gray[400]};
`

export const PlusIcon = styled.span`
  font-size: 32px;
  margin-bottom: 8px;
`

export const AddText = styled.span`
  font-size: 16px;
`

export const BranchCard = styled(Section)`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`

export const BranchName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.white};
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray[300]};
  font-size: 18px;
  cursor: pointer;
`

export const SchoolTagContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: auto;
`

export const SchoolTag = styled.span`
  background-color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[600]};
  color: ${theme.colors.gray[400]};
  padding: 6px 4px;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
`

export const SchoolCountText = styled.span`
  font-size: 14px;
  color: ${theme.colors.gray[500]};
  margin-top: 12px;
  align-self: flex-start;
  width: 100%;
`
