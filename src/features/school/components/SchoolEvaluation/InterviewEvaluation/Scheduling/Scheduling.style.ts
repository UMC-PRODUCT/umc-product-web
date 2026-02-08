import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

export const Wrapper = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  ${media.down(theme.breakPoints.desktop)} {
    height: fit-content;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;
  padding: 20px;
`

export const MainLayout = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  ${media.down(theme.breakPoints.desktop)} {
    display: grid;
    grid-template-columns: 1fr;
    height: fit-content;
  }
`

/* 좌측 사이드바 */
export const Sidebar = styled(Section)`
  width: 360px !important;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
  border-radius: 6px;
  ${media.down(theme.breakPoints.desktop)} {
    width: 100% !important;
  }
`

export const SectionTitle = styled.h3`
  color: #fff;
  width: 100%;
  ${theme.typography.B3.Sb};
  margin: 0;
  white-space: nowrap;
`

export const TimeSlotList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow-y: scroll;
`

export const TimeSlotItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.isActive ? theme.colors.lime : theme.colors.gray[700])};
  background-color: ${theme.colors.black};
  cursor: pointer;
  .time {
    color: #fff;
    ${theme.typography.B3.Md};
  }
`

export const CountBadge = styled.div<{ isCompleted?: boolean }>`
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.lime};
  padding: 6px 12px;
  width: 180px;
  text-align: center;
  border-radius: 6px;
  align-items: center;
  ${theme.typography.B4.Md};
  border: 1px solid ${theme.colors.gray[700]};
`
export const Circle = styled.div`
  margin-left: 6px;
  width: 16px;
  height: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 50%;
  color: ${theme.colors.black};
  background-color: ${theme.colors.lime};
`
/* 우측 컨텐츠 */
export const Content = styled.div`
  flex: 1;
  display: grid;
  gap: 20px;
  grid-template-rows: 1fr 1fr;
  height: 100%;
  overflow-y: auto;
  ${media.down(theme.breakPoints.desktop)} {
    height: fit-content !important;
    grid-template-rows: 1fr;
  }
`

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`

export const SearchInput = styled.input`
  background: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[700]};
  padding: 8px 12px;
  border-radius: 6px;
  color: #fff;
  width: 240px;
`

export const ApplicantList = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${theme.colors.black};
  width: 100%;
  height: 320px !important;
  ${media.down(theme.breakPoints.desktop)} {
    height: fit-content !important;
  }
`

export const DragHandle = styled.div`
  color: ${theme.colors.gray[500]};
  cursor: grab;
`

export const InterviewerSection = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  height: fit-content;
`

export const DropZone = styled(Section)`
  border-radius: 8px;
  display: flex;
  width: 100%;
  align-items: stretch;
  justify-content: flex-start;
  padding: 12px;
  height: fit-content;
  color: ${theme.colors.gray[500]};
  ${theme.typography.B4.Rg};

  &[data-active='true'] {
    border-color: ${theme.colors.lime};
    color: ${theme.colors.lime};
    background-color: ${theme.colors.gray[800]};
  }
`

export const DropPlaceholder = styled.div`
  width: 100%;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed ${theme.colors.gray[700]};
`

export const AssignedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: fit-content;
`

export const Notice = styled.span`
  color: ${theme.colors.gray[400]};
  white-space: nowrap;
  ${theme.typography.B4.Rg};
`

export const SelectionInfo = styled.div`
  color: ${theme.colors.lime};
  background-color: ${theme.colors.gray[700]};
  ${theme.typography.B4.Rg};
  border: 1px solid ${theme.colors.gray[600]};
  padding: 6px 12px;
  border-radius: 6px;
`

export const Divider = styled.div`
  border: none;
  width: 100%;
  height: 1px;
  border-top: 1px solid ${theme.colors.gray[700]};
  margin: 12px 0;
`
