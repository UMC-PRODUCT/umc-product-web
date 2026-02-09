import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 220px;
  max-height: 300px;
  width: 100%;
  overflow-y: auto;
`

export const SubTitle = styled.div`
  ${theme.typography.B4.Sb};
  color: ${theme.colors.white};
`
export const AverageScore = styled.div`
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: 4px;
  display: flex;
  padding: 4px 10px;
  align-items: flex-end;
  gap: 15px;
  .label {
    ${theme.typography.H5.Md};
    color: ${theme.colors.gray[300]};
    align-self: flex-start;
  }
  .score {
    color: ${theme.colors.lime};
    ${theme.typography.B3.Sb}
  }
  .total {
    ${theme.typography.H5.Md}
    color: ${theme.colors.gray[300]}
  }
`
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
export const OtherScore = styled.div`
  ${theme.typography.B4.Sb};
  color: ${theme.colors.lime};
`

export const OtherTotalScore = styled.div`
  ${theme.typography.H5.Md};
  color: ${theme.colors.gray[300]};
`
export const Comment = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  ${theme.typography.B5.Rg};
  color: ${theme.colors.gray[400]};
`
export const Name = styled.span`
  ${theme.typography.B5.Md};
  color: ${theme.colors.white};
`
export const EmptyAnswer = styled.div`
  ${theme.typography.B4.Rg};
  color: ${theme.colors.gray[500]};
  text-align: center;
  margin-top: 40px;
`
