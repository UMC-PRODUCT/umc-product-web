/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Delete from '@/shared/assets/icons/delete.svg?react'
import Document from '@/shared/assets/icons/document.svg?react'
import ErrorIcon from '@/shared/assets/icons/notice.svg?react' // 에러 아이콘 가정
import RetryIcon from '@/shared/assets/icons/retry.svg?react' // 재시도 아이콘 가정
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

import { ProgressCircle } from '../../ProgressCircle'
import * as S from './shared'

interface FileItemProps {
  fileName: string
  fileSize: string
  removeFile: () => void
  status: 'loading' | 'success' | 'error'
  progress: number
  onRetry: () => void
}

export default function FileItem({
  fileName,
  fileSize,
  removeFile,
  status,
  progress,
  onRetry,
}: FileItemProps) {
  return (
    <S.FileItemWrapper isError={status === 'error'}>
      <S.File height="30px" width={'calc(100% - 40px)'}>
        <Flex width={'fit-content'} css={fileIconStyle}>
          {status === 'loading' ? (
            <ProgressCircle progress={progress} />
          ) : status === 'error' ? (
            <ErrorIcon color="white" />
          ) : (
            <Document />
          )}
        </Flex>
        <S.FileInfoWrapper flexDirection="column" alignItems="flex-start" gap={2}>
          <span className="fileName">{fileName}</span>
          <span className="fileSize">{status === 'error' ? '업로드 실패' : fileSize}</span>
        </S.FileInfoWrapper>
      </S.File>

      <Flex gap={12} width={'fit-content'}>
        {status === 'error' && (
          <button
            type="button"
            onClick={onRetry}
            css={[
              retryIconStyle,
              {
                cursor: 'pointer',
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
          onClick={removeFile}
          css={[
            actionIconStyle,
            {
              cursor: 'pointer',
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
    </S.FileItemWrapper>
  )
}

const fileIconStyle = css`
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

const actionIconStyle = css`
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

const retryIconStyle = css`
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
