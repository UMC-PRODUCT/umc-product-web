import styled from '@emotion/styled'

import Section from '@/shared/ui/common/Section/Section'

const FilterBar = ({
  rightChild,
  leftChild,
}: {
  rightChild?: React.ReactNode
  leftChild?: React.ReactNode
}) => {
  return (
    <FilterBarWrapper variant="solid" padding={'12px 22px'}>
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
  .left,
  .right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`
