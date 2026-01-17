import { useEffect, useState } from 'react'

import type { UploadedFile, UseFileUploadOptions } from '../../domain/model'

/**
 * 업로드된 파일 상태를 관리하는 훅
 * - 파일 목록 상태
 * - 외부 value와 동기화
 */
export function useUploadedFileState({ initialFiles, value, onChange }: UseFileUploadOptions) {
  const [uploadedFiles, setUploadedFiles] = useState<Array<UploadedFile>>(initialFiles)

  // 내부 상태가 바뀌면 외부 value로 동기화
  useEffect(() => {
    onChange?.({ ...value, files: uploadedFiles })
  }, [uploadedFiles])

  return {
    uploadedFiles,
    setUploadedFiles,
  }
}
