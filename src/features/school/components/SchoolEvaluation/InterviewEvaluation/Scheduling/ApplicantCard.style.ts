import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

export const ApplicantCard = styled(Section)<{ mode?: 'default' | 'assigned' }>`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.colors.black};
  padding: 12px 20px;
  border-radius: 8px;
  height: fit-content;
  gap: 16px;
  min-height: 50px;
  cursor: ${(props) => (props.mode === 'default' ? 'grab' : 'default')};
  .info {
    display: flex;
    gap: 48px;
  }

  .name {
    color: ${theme.colors.white};
    flex-shrink: 0;
  }
  .tags {
    display: flex;
    gap: 8px;
    width: 160px;
  }
  .score {
    color: ${theme.colors.white};
    ${theme.typography.B4.Rg};
    white-space: nowrap;
  }
  .time {
    color: ${theme.colors.gray[400]};
    ${theme.typography.B5.Md};
  }
`

export const Tag = styled.span`
  background: ${theme.colors.gray[700]};
  color: ${theme.colors.gray[300]};
  padding: 4px 8px;
  border-radius: 4px;
  ${theme.typography.B5.Rg};
  width: fit-content;
  height: fit-content;
  padding: 3px 8px;
  background-color: ${theme.colors.gray[600]};
  border: 1px solid ${theme.colors.gray[500]};
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
`
