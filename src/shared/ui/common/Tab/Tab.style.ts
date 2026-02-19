import styled from '@emotion/styled'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: fit-content;
`

export const ListViewport = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const StyledList = styled(TabsPrimitive.List)`
  width: max-content;
  min-width: 100%;
  display: flex;
  flex-wrap: nowrap;
`

export const StyledTrigger = styled(TabsPrimitive.Trigger)`
  width: 164px;
  flex: 0 0 auto;
  min-width: fit-content;
  border-radius: 20px 20px 0 0;
  padding: 14px 20px;
  cursor: pointer;
  background-color: transparent;
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[700]};
  border-bottom: 0;
  text-align: center;
  ${theme.typography.H4.Sb};
  word-break: keep-all;
  white-space: nowrap;
  scroll-snap-align: center;

  &[data-state='active'] {
    background-color: ${theme.colors.lime};
    color: ${theme.colors.black};
    border-color: ${theme.colors.lime};
  }

  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B5.Sb};
    width: auto;
    min-width: 128px;
    padding: 12px 14px;
  }
`
