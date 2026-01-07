import type { FileInfo } from '@/features/apply/hooks/useFileUpload'
import { formatFileSize } from '@/shared/utils/formatFileSize'

import FileItem from '../FileItem/FileItem'
import * as S from './FileList.style'

type FileListProps = {
  files: Array<FileInfo>
  mode: 'view' | 'edit'
  onRetry: (file: FileInfo) => void
  onRemove: (fileId: string) => void
}

export default function FileList({ files, mode, onRetry, onRemove }: FileListProps) {
  if (files.length === 0) return null

  return (
    <S.Grid>
      {files.map((file) => (
        <FileItem
          key={file.id}
          mode={mode}
          fileName={file.name}
          fileSize={formatFileSize(file.size)}
          status={file.status}
          progress={file.progress}
          onRetry={() => onRetry(file)}
          removeFile={() => onRemove(file.id)}
        />
      ))}
    </S.Grid>
  )
}
