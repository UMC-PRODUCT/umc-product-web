import styled from '@emotion/styled'

import Hamburger from '@/shared/assets/icons/hamburger.svg?react'
import { theme } from '@/shared/styles/theme'
import type { TypoToken } from '@/shared/types/typo'

const resolveTypography = (token: TypoToken) => {
  const [group, variant] = token.split('.') as [string, string]
  const groupTypo = theme.typography[group as keyof typeof theme.typography]

  if (typeof groupTypo === 'object' && variant in groupTypo) {
    return groupTypo[variant as keyof typeof groupTypo]
  }

  return theme.typography.B5.Md
}
const GrabButton = ({
  dragHandleProps,
  index,
  typo,
}: {
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
  index: number
  typo?: TypoToken
}) => {
  return (
    <QuestionInfo data-drag-handle="true" {...dragHandleProps} typo={typo}>
      <Hamburger />
      문항 {index + 1}
    </QuestionInfo>
  )
}
const QuestionInfo = styled.div<{ typo: TypoToken | undefined }>`
  background-color: ${theme.colors.lime};

  border-radius: 4px;
  color: ${theme.colors.black};
  padding: 5px 10px;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  cursor: grab;
  -webkit-user-drag: element;
  font-size: ${(props) => resolveTypography(props.typo ?? 'B5.Md').fontSize};
  font-weight: ${(props) => resolveTypography(props.typo ?? 'B5.Md').fontWeight};
  line-height: ${(props) => resolveTypography(props.typo ?? 'B5.Md').lineHeight};
`

export default GrabButton
