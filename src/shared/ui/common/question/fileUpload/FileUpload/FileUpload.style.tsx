import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

export const FileWrapper = styled(Flex)<{ isEditable: boolean }>`
  width: 100%;
  cursor: ${({ isEditable }) => (isEditable ? 'pointer' : 'default')};
  ${theme.typography.B4.Rg}
  .desktop-text {
    display: inline;
  }
  .mobile-text {
    display: none;
  }
  input {
    display: none;
  }

  .file-notification {
    ${theme.typography.C5.Rg}
  }
  span {
    ${media.down(theme.breakPoints.tablet)} {
      ${theme.typography.C5.Rg}
    }
  }

  &:hover {
    background-color: ${({ isEditable }) => (isEditable ? theme.colors.gray[700] : 'transparent')};
  }
  .bold {
    ${theme.typography.B4.Sb}
    ${media.down(theme.breakPoints.tablet)} {
      ${theme.typography.B4.Rg}
    }
  }

  ${media.down(theme.breakPoints.tablet)} {
    .desktop-text {
      display: none;
    }
    .mobile-text {
      display: inline;
    }
  }
`

export const sectionStyle = {
  backgroundColor: theme.colors.gray[700],
  padding: '20px 26px',
  width: '100%',
}

export const dropzoneStyle = (isDragging: boolean, isEditable: boolean) => ({
  transition: 'all 0.2s ease',
  backgroundColor: isDragging ? theme.colors.gray[600] : 'transparent',
  borderColor: isDragging ? theme.colors.lime : undefined,
  cursor: isEditable ? 'pointer' : 'default',
})
