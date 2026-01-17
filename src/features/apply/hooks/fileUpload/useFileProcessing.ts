import type { Dispatch, SetStateAction } from 'react'

import type { UploadedFile } from '../../domain/model'

// 임시 업로드 파일 식별자 생성
function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// 업로드 파일 초기 상태 생성
function createFileInfo(file: File): UploadedFile {
  return {
    id: generateFileId(),
    name: file.name,
    size: file.size,
    status: 'loading',
    progress: 0,
    file: file,
  }
}

/**
 * 파일 처리를 담당하는 훅
 * - FileList를 UploadedFile 배열로 변환
 * - 파일 추가 및 업로드 시작
 */
export function useFileProcessing(
  setUploadedFiles: Dispatch<SetStateAction<Array<UploadedFile>>>,
  simulateUpload: (fileId: string, file: File) => void,
) {
  const processFiles = (fileList: FileList | null): void => {
    if (!fileList) return

    const newFileInfoList = Array.from(fileList).map(createFileInfo)

    newFileInfoList.forEach((fileInfo) => {
      simulateUpload(fileInfo.id, fileInfo.file)
    })

    setUploadedFiles((previousFiles) => [...previousFiles, ...newFileInfoList])
  }

  return { processFiles }
}
