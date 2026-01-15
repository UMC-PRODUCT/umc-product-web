import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

const ProgressLine = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${theme.colors.gray[600]};
  border-radius: 5px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 10px;
    background-color: ${theme.colors.lime};
    border-radius: 5px;
    width: ${(props: { width: number }) => props.width}%;
  }
`

const Percentage = ({ total, complete }: { total: number; complete: number }) => {
  const percentage = total > 0 ? (complete / total) * 100 : 0
  const formattedPercentage = Number.isInteger(percentage)
    ? String(percentage)
    : percentage.toFixed(2)
  return (
    <Flex flexDirection="column" gap={14}>
      <ProgressLine width={percentage} />
      <Flex>
        <span css={{ color: theme.colors.white, ...theme.typography.H3.Sb }}>
          {formattedPercentage}%
        </span>
        <span
          css={{ marginLeft: 'auto', color: theme.colors.gray[400], ...theme.typography.B4.Md }}
        >
          완료: {complete} / 전체: {total}
        </span>
      </Flex>
    </Flex>
  )
}

export default Percentage
