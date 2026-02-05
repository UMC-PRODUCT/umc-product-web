import type { UploadedFile } from '@/shared/types/apply'
import type { QuestionMode } from '@/shared/types/form'
import { formatFileSize } from '@/shared/utils/formatFileSize'

import FileItem from '../FileItem/FileItem'
import * as S from './FileList.style'

type FileListProps = {
  files: Array<UploadedFile>
  mode: QuestionMode
  onRetry: (file: UploadedFile) => void
  onRemove: (fileId: string) => void
}

const FileList = ({ files, mode, onRetry, onRemove }: FileListProps) => {
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

export default FileList
