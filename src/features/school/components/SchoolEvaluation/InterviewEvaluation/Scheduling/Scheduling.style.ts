import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;
  padding: 20px;
`

export const FilterBar = styled(Section)`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`

export const MainLayout = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

/* 좌측 사이드바 */
export const Sidebar = styled(Section)`
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
`

export const SectionTitle = styled.h3`
  color: #fff;
  width: 100%;
  ${theme.typography.B3.Sb};
  margin: 0;
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
  ${theme.typography.B4.Md};
  border: 1px solid ${theme.colors.gray[700]};
`

/* 우측 컨텐츠 */
export const Content = styled.div`
  flex: 1;
  display: grid;
  gap: 20px;
  grid-template-rows: 1fr 1fr;
  height: 100%;
  overflow-y: auto;
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
