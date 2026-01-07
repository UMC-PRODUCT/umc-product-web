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
export const FileWrapper = styled(Flex)`
  width: 100%;
  cursor: pointer;
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
    background-color: ${theme.colors.gray[700]};
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

export const CancelIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;

  svg {
    min-width: 8px;
    min-height: 8px;
  }
`
export const Item = styled.div`
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 20px;
  height: 37px;
  max-width: 654px;
  align-items: center;
  display: flex;
  color: ${theme.colors.white};
  padding: 0 20px;
  flex: 1;
  min-width: 0;
  > span {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-wrap: nowrap;
  ${theme.typography.B4.Rg};
  ${media.down(theme.breakPoints.tablet)} {
    ${theme.typography.B5.Rg};
  }
`
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
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  ${media.down(theme.breakPoints.tablet)} {
    display: flex;
    flex-direction: column;
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

export const sectionStyle = {
  backgroundColor: theme.colors.gray[700],
  padding: '20px 26px',
  width: '100%',
}

export const dropzoneStyle = (isDragging: boolean) => ({
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: isDragging ? theme.colors.gray[600] : 'transparent',
  borderColor: isDragging ? theme.colors.lime : undefined,
})

export const inputStyle = {
  flex: 1,
  background: 'none',
  border: 'none',
  borderBottom: `1px solid ${theme.colors.gray[500]}`,
  color: 'white',
  outline: 'none',
  padding: '8px 0',
  '&:focus': { border: `1px solid ${theme.colors.lime}` },
}

export const LinkItemWrapper = styled(Flex)`
  ${media.down(theme.breakPoints.tablet)} {
    flex-wrap: wrap;
    justify-content: center;
  }
`
