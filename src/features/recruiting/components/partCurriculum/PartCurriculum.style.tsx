import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

const TabList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  overflow-x: auto;
  width: 100%;
  overflow-x: scroll;
  gap: 24px;
`

const TabItem = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.active ? `${theme.colors.lime}` : `${theme.colors.white}`)};
  font-size: 18px;
  font-weight: bold;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? `2px solid ${theme.colors.lime}` : 'none')};
  white-space: nowrap;
`

const Requirement = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;

  span {
    display: flex;
    gap: 6px;
    align-items: center;
    ${theme.typography.B3.Md}
  }
`

const TimelineGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 100%;
  ${media.down(theme.breakPoints.tablet)} {
    grid-template-columns: 1fr;
    gap: 0;
  }
`

const FirstColumn = styled.div<{ indexLength: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  ${media.down(theme.breakPoints.tablet)} {
  }
  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 20px;
    bottom: 0px;
    width: 2px;
    height: ${(props) => (props.indexLength == 7 ? `315px` : '270px')};
    background: linear-gradient(
      to bottom,
      ${theme.colors.lime} 0%,
      ${theme.colors.lime} 95%,
      #4a6312 99%
    );
    opacity: 0.5;

    ${media.down(theme.breakPoints.tablet)} {
      height: ${(props) => (props.indexLength == 7 ? `316px` : '268px')};
      background: ${theme.colors.lime};
      bottom: 20px;
    }
  }
`
const SecondColumn = styled.div<{ lastIndex: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  ${media.down(theme.breakPoints.tablet)} {
  }
  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 0px;
    bottom: 80px;
    width: 2px;
    height: ${(props) => (props.lastIndex == 3 ? `170px` : '260px')};
    background: linear-gradient(
      to top,
      ${theme.colors.lime} 0%,
      ${theme.colors.lime} 95%,
      #4a6312 99%
    );
    opacity: 0.5;

    ${media.down(theme.breakPoints.tablet)} {
      height: ${(props) => (props.lastIndex == 3 ? `170px` : '260px')};
      background: ${theme.colors.lime};
      bottom: 20px;
    }
  }
`

const WeekRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 0;
`

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${theme.colors.lime};
  z-index: 1;
`

const WeekLabel = styled.span`
  color: ${theme.colors.lime};
  width: 50px;
  min-width: 50px;
  ${theme.typography.B3.Sb}
`

const ContentLabel = styled.span`
  color: ${theme.colors.white};
  padding-left: 18px;
  border-left: 1px solid ${theme.colors.gray[500]};
`

export {
  ContentLabel,
  Dot,
  FirstColumn,
  Requirement,
  SecondColumn,
  TabItem,
  TabList,
  TimelineGrid,
  WeekLabel,
  WeekRow,
}
