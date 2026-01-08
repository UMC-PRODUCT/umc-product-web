import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const FileItemWrapper = styled.div<{ isError?: boolean }>`
  background-color: ${theme.colors.gray[600]};
  border: 1px solid ${({ isError }) => (isError ? theme.colors.necessary : theme.colors.gray[600])};
  border-radius: 4px;
  height: 64px;
  width: 100%;
  max-width: 100%;
  align-items: center;
  display: flex;
  color: ${theme.colors.white};
  padding: 0 20px;
  gap: 8px;
  justify-content: space-between;
  ${theme.typography.B4.Rg};

  ${media.down(theme.breakPoints.tablet)} {
    padding: 0 14px;
  }
`

export const FileInfoWrapper = styled(Flex)`
  gap: 2px;
  width: 100%;
  max-width: calc(100% - 40px);
  flex: 1;
  .fileName {
    ${theme.typography.B4.Md}
    color: ${theme.colors.white};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    min-width: 80px;
    ${media.down(theme.breakPoints.tablet)} {
      ${theme.typography.B4.Md}
    }
  }
  .fileSize {
    ${theme.typography.B5.Rg}
    color: ${theme.colors.gray[300]};
    white-space: nowrap;
  }
`

export const File = styled(Flex)`
  flex: 1;
  gap: 12px;
  ${media.down(theme.breakPoints.tablet)} {
    gap: 8px;
  }
`

export const fileIconStyle = css`
  svg {
    width: 28px;
    height: 28px;
  }
  ${media.down(theme.breakPoints.tablet)} {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`

export const actionIconStyle = css`
  svg {
    width: 20px;
    height: 20px;
  }
  ${media.down(theme.breakPoints.tablet)} {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`

export const retryIconStyle = css`
  svg {
    width: 25px;
    height: 25px;
  }
  ${media.down(theme.breakPoints.tablet)} {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`
