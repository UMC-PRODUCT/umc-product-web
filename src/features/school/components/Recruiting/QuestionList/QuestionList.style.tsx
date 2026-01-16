import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'

export const DragPlaceholder = styled.div<{ $height: number }>`
  height: ${(props) => props.$height}px;
  border: 2px dashed ${theme.colors.lime};
  border-radius: 8px;
  width: 100%;
`
