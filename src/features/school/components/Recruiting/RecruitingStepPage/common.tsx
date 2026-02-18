import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const Title = styled.div`
  color: ${theme.colors.white};
  ${theme.typography.H4.Sb}
`
export const SubTitle = styled.div`
  color: ${theme.colors.gray[400]};
  ${theme.typography.B5.Rg}
  word-break: keep-all;
`
export const Button = styled.button<{ isActive: boolean }>`
  ${theme.typography.B3.Sb}
  color: ${(props) => (props.isActive ? theme.colors.lime : theme.colors.gray[400])};
  border: ${(props) =>
    props.isActive ? `1px solid ${theme.colors.lime}` : `1px solid ${theme.colors.gray[600]}`};
  background-color: ${theme.colors.gray[700]};
  border-radius: 6px;
  padding: 16px 28px;
  cursor: pointer;
  ${media.down(theme.breakPoints.tablet)} {
    padding: 12px 20px;
  }
`

export const PageTitle = styled.div`
  ${theme.typography.B4.Sb};
  display: flex;
  color: ${theme.colors.lime};
  gap: 8px;
  align-items: center;
  span {
    ${theme.typography.B5.Md};
    color: ${theme.colors.white};
    padding-left: 8px;
    height: fit-content;
    border-left: 1.5px solid ${theme.colors.gray[500]};
  }
`
export const PartWarpper = styled.div`
  display: flex;
  padding: 3px 10px;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 4px;
  background-color: ${theme.colors.gray[700]};
  color: ${theme.colors.gray[300]};
  ${theme.typography.B5.Md}
`
export const NoticeInfo = styled.div`
  ${theme.typography.C4.Rg}
  color: ${theme.colors.gray[400]};
`
