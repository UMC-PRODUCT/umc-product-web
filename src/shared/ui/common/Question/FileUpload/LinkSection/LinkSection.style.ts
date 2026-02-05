import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const InputWrapper = styled(Flex)`
  gap: 20px;
  border-top: 1px solid ${theme.colors.gray[600]};
  padding: 20px 0 40px 0;
  width: 100%;
  position: relative;
  flex-direction: column;

  input {
    max-width: 654px;
    background-color: ${theme.colors.gray[800]};
    border: 1px solid ${theme.colors.gray[600]};
    border-radius: 20px;
    height: 37px;
    flex: 1;
    color: ${theme.colors.white};
    padding: 0 20px;
    ${theme.typography.B4.Rg};
  }
  .add-button {
    width: 80px;
    height: 35px;
  }

  ${media.down(theme.breakPoints.tablet)} {
    padding: 16px 0 0 0;
  }
`

const inputStyle = {
  flex: 1,
  background: 'none',
  border: 'none',
  borderBottom: `1px solid ${theme.colors.gray[500]}`,
  color: 'white',
  outline: 'none',
  padding: '8px 0',
}

export const linkInputStyle = (isEditable: boolean) => ({
  ...inputStyle,
  cursor: isEditable ? 'text' : 'default',
  '&:focus': isEditable ? { border: `1px solid ${theme.colors.lime}` } : undefined,
})

export const LinkItemWrapper = styled(Flex)`
  ${media.down(theme.breakPoints.tablet)} {
    flex-wrap: wrap;
    justify-content: center;
  }
`
