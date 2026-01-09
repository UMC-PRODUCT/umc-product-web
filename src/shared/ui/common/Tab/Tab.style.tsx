import styled from '@emotion/styled'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'

export const SectionWrapper = styled.div`
  width: 100%;
  max-width: 1170px;
  display: flex;
  flex-direction: column;
`

export const StyledList = styled(TabsPrimitive.List)`
  width: 100%;
  display: flex;
`

export const StyledTrigger = styled(TabsPrimitive.Trigger)`
  flex: 1;
  border-radius: 20px 20px 0 0;
  padding: 14px 20px;
  cursor: pointer;
  background-color: transparent;
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[700]};
  border-bottom: 0;
  text-align: center;
  ${theme.typography.H4.Sb};

  &[data-state='active'] {
    background-color: ${theme.colors.lime};
    color: ${theme.colors.black};
    border-color: ${theme.colors.lime};
  }

  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B5.Sb};
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  border: 1px solid ${theme.colors.gray[700]};
  border-radius: 0 0 10px 10px;
  padding: 40px 46px;

  ${media.down(theme.breakPoints.desktop)} {
    padding: 20px 20px;
  }
  ${media.down(theme.breakPoints.tablet)} {
    padding: 12px 12px;
  }
`
