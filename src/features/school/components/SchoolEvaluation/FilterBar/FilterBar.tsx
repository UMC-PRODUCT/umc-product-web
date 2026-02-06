import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

const FilterBar = ({
  rightChild,
  leftChild,
  gap = '12px',
}: {
  rightChild?: React.ReactNode
  leftChild?: React.ReactNode
  gap?: string | number
}) => {
  return (
    <FilterBarWrapper gap={gap} variant="solid" padding={'12px 22px'}>
      <div className="left">{leftChild}</div>
      <div className="right">{rightChild}</div>
    </FilterBarWrapper>
  )
}
export default FilterBar

const FilterBarWrapper = styled(Section)`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  height: fit-content;
  color: ${theme.colors.gray[400]};
  .left,
  .right {
    display: flex;
    align-items: center;
    gap: ${(props) => props.gap};
    white-space: nowrap;
  }
  overflow-x: scroll;
`
