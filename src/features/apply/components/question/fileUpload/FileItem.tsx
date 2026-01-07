/** @jsxImportSource @emotion/react */
import Delete from '@/shared/assets/icons/delete.svg?react'
import Document from '@/shared/assets/icons/document.svg?react'
import ErrorIcon from '@/shared/assets/icons/notice.svg?react' // 에러 아이콘 가정
import RetryIcon from '@/shared/assets/icons/retry.svg?react' // 재시도 아이콘 가정
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './shared'

const ProgressCircle = ({ progress }: { progress: number }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ transform: 'rotate(-90deg)' }}>
    <circle cx="12" cy="12" r="10" stroke={theme.colors.gray[600]} fill="none" strokeWidth="2" />
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={theme.colors.white}
      fill="none"
      strokeWidth="2"
      strokeDasharray={2 * Math.PI * 10}
      strokeDashoffset={2 * Math.PI * 10 * (1 - progress / 100)}
      style={{ transition: 'stroke-dashoffset 0.3s' }}
      strokeLinecap="round"
    />
  </svg>
)

export default function FileItem({
  fileName,
  fileSize,
  removeFile,
  status,
  progress,
  onRetry,
}: {
  fileName: string
  fileSize: string
  removeFile: () => void
  status: 'loading' | 'success' | 'error'
  progress: number
  onRetry: () => void
}) {
  return (
    <S.FileItemWrapper isError={status === 'error'}>
      <S.File height="30px" width={'calc(100% - 40px)'}>
        <Flex width={'30px'}>
          {status === 'loading' ? (
            <ProgressCircle progress={progress} />
          ) : status === 'error' ? (
            <ErrorIcon width={28} height={28} color="white" />
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
            css={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
            }}
          >
            <RetryIcon width={25} height={25} fill={theme.colors.lime} />
          </button>
        )}

        <button
          type="button"
          onClick={removeFile}
          css={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
          }}
        >
          <Delete color={theme.colors.gray[300]} width={20} height={20} />
        </button>
      </Flex>
    </S.FileItemWrapper>
  )
}
