import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const RecruitmentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.gray[400]};
  ${theme.typography.B4.Md}
`
export const Period = styled.span`
  padding: 2.5px 8px;
  background-color: ${theme.colors.gray[600]};
  color: ${theme.colors.white};
  ${theme.typography.B4.Md};
`
export const RecruitmentTitle = styled.h2`
  margin: 0;
  ${theme.typography.B3.Sb};
  color: ${theme.colors.white};
`
export const PartWrapper = styled.div`
  display: flex;
  gap: 11px;
  width: 100%;
  flex-wrap: wrap;
  ${media.down(theme.breakPoints.mobile)} {
    gap: 8px;
  }
`
export const PartBadge = styled.span`
  padding: 4px 12px;
  background-color: ${theme.colors.gray[600]};
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray[500]};
  color: ${theme.colors.white};
  ${theme.typography.B4.Md};
  white-space: nowrap;
  width: fit-content;
`
export const RecruitmentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
`
