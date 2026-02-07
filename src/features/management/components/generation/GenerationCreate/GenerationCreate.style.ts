import styled from '@emotion/styled'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const ButtonWrapper = styled(Flex)`
  display: flex;
  align-items: center;
  gap: 12px;
  input {
    background-color: ${theme.colors.black};
    border: 1px solid ${theme.colors.gray[600]};
    border-radius: 4px;
    padding: 3px 20px;
    height: 50px;
    max-width: 80vw;
    width: 400px;
    ${theme.typography.B3.Rg}
  }
`
