import styled from '@emotion/styled'

import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/part'

const StyledTitle = styled.h3`
  margin: 0;
  ${theme.typography.B3.Md};
  color: ${theme.colors.white};
`

const isPartType = (value: string): value is PartType => {
  return value in PART_TYPE_TO_SMALL_PART
}

const CardTitle = ({ title }: { title: PartType | string }) => {
  const resolvedTitle = isPartType(title) ? PART_TYPE_TO_SMALL_PART[title] : title
  return <StyledTitle>{resolvedTitle}</StyledTitle>
}

export default CardTitle
