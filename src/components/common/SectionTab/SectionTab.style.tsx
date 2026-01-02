import styled from '@emotion/styled'

import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

type TabButtonProps = {
  $active: boolean
}

export const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const TabList = styled.div`
  width: 100%;
  display: flex;
`

export const TabButton = styled.div<TabButtonProps>`
  flex: 1;
  border-radius: 20px 20px 0 0;
  padding: 14px 20px;
  cursor: pointer;
  background-color: ${({ $active }) =>
    $active ? theme.colors.lime : 'transparent'};
  color: ${({ $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  border: ${({ $active }) =>
    $active
      ? `1px solid ${theme.colors.lime}`
      : `1px solid ${theme.colors.gray[700]}`};
  border-bottom: 0;
  text-align: center;
  ${theme.typography.H4.Sb};
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
`
