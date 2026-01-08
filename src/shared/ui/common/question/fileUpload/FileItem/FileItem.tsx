/** @jsxImportSource @emotion/react */
import Delete from '@/shared/assets/icons/delete.svg?react'
import Document from '@/shared/assets/icons/document.svg?react'
import ErrorIcon from '@/shared/assets/icons/notice.svg?react' // 에러 아이콘 가정
import RetryIcon from '@/shared/assets/icons/retry.svg?react' // 재시도 아이콘 가정
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import { ProgressCircle } from '@/shared/ui/common/ProgressCircle'

import {
  actionIconStyle,
  File,
  fileIconStyle,
  FileInfoWrapper,
  FileItemWrapper,
  retryIconStyle,
} from './FileItem.style'

interface FileItemProps {
  fileName: string
  fileSize: string
  removeFile: () => void
  status: 'loading' | 'success' | 'error'
  progress: number
  onRetry: () => void
  mode: 'view' | 'edit'
}

const FileItem = ({
  fileName,
  fileSize,
  removeFile,
  status,
  progress,
  onRetry,
  mode,
}: FileItemProps) => {
  const isEditable = mode === 'edit'

  return (
    <FileItemWrapper $isError={status === 'error'}>
      <File height="30px" width={'calc(100% - 40px)'}>
        <Flex width={'fit-content'} css={fileIconStyle}>
          {status === 'loading' ? (
            <ProgressCircle progress={progress} />
          ) : status === 'error' ? (
            <ErrorIcon color="white" />
          ) : (
            <Document />
          )}
        </Flex>
        <FileInfoWrapper flexDirection="column" alignItems="flex-start" gap={2}>
          <span className="fileName">{fileName}</span>
          <span className="fileSize">{status === 'error' ? '업로드 실패' : fileSize}</span>
        </FileInfoWrapper>
      </File>

      <Flex gap={12} width={'fit-content'}>
        {status === 'error' && (
          <button
            type="button"
            onClick={isEditable ? onRetry : undefined}
            disabled={!isEditable}
            css={[
              retryIconStyle,
              {
                cursor: isEditable ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
              },
            ]}
          >
            <RetryIcon fill={theme.colors.lime} />
          </button>
        )}

        <button
          type="button"
          onClick={isEditable ? removeFile : undefined}
          disabled={!isEditable}
          css={[
            actionIconStyle,
            {
              cursor: isEditable ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
            },
          ]}
        >
          <Delete color={theme.colors.gray[300]} />
        </button>
      </Flex>
    </FileItemWrapper>
  )
}

export default FileItem
