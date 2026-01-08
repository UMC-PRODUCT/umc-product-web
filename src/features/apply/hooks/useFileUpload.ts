import { useEffect, useState } from 'react'

export type FileUploadStatus = 'loading' | 'success' | 'error'

export interface UploadedFileInfo {
  id: string
  name: string
  size: number
  status: FileUploadStatus
  progress: number
  fileObject: File
}

export interface FileUploadValue {
  files: Array<UploadedFileInfo>
  links?: Array<string>
}

interface UseFileUploadOptions {
  initialFiles: Array<UploadedFileInfo>
  value: FileUploadValue | undefined
  onChange: ((newValue: FileUploadValue) => void) | undefined
}

interface UseFileUploadReturn {
  uploadedFiles: Array<UploadedFileInfo>
  setUploadedFiles: React.Dispatch<React.SetStateAction<Array<UploadedFileInfo>>>
  processFiles: (fileList: FileList | null) => void
  simulateUpload: (fileId: string, file: File) => void
  updateFileStatus: (fileId: string, status: FileUploadStatus, progress: number) => void
}

const UPLOAD_PROGRESS_INTERVAL_MS = 300
const UPLOAD_PROGRESS_INCREMENT_MAX = 20
const UPLOAD_ERROR_PROBABILITY = 0.1
const MAX_PROGRESS = 100

function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

function createFileInfo(file: File): UploadedFileInfo {
  return {
    id: generateFileId(),
    name: file.name,
    size: file.size,
    status: 'loading',
    progress: 0,
    fileObject: file,
  }
}

/**
 * 파일 업로드 상태 관리 훅
 * TODO: API 연동 시 simulateUpload를 실제 업로드 로직으로 대체
 */
export function useFileUpload({
  initialFiles,
  value,
  onChange,
}: UseFileUploadOptions): UseFileUploadReturn {
  const [uploadedFiles, setUploadedFiles] = useState<Array<UploadedFileInfo>>(initialFiles)

  useEffect(() => {
    onChange?.({ ...value, files: uploadedFiles })
  }, [uploadedFiles])

  const updateFileStatus = (fileId: string, status: FileUploadStatus, progress: number): void => {
    setUploadedFiles((previousFiles) =>
      previousFiles.map((file) => (file.id === fileId ? { ...file, status, progress } : file)),
    )
  }

  /**
   * 파일 업로드 시뮬레이션
   * TODO: API 연동 시 실제 업로드 로직으로 대체
   */
  const simulateUpload = (fileId: string, _file: File): void => {
    let currentProgress = 0

    const uploadInterval = setInterval(() => {
      currentProgress += Math.random() * UPLOAD_PROGRESS_INCREMENT_MAX

      if (currentProgress >= MAX_PROGRESS) {
        clearInterval(uploadInterval)
        const isUploadError = Math.random() < UPLOAD_ERROR_PROBABILITY
        const finalStatus: FileUploadStatus = isUploadError ? 'error' : 'success'
        updateFileStatus(fileId, finalStatus, MAX_PROGRESS)
      } else {
        updateFileStatus(fileId, 'loading', Math.floor(currentProgress))
      }
    }, UPLOAD_PROGRESS_INTERVAL_MS)
  }

  const processFiles = (fileList: FileList | null): void => {
    if (!fileList) return

    const newFileInfoList = Array.from(fileList).map(createFileInfo)

    newFileInfoList.forEach((fileInfo) => {
      simulateUpload(fileInfo.id, fileInfo.fileObject)
    })

    setUploadedFiles((previousFiles) => [...previousFiles, ...newFileInfoList])
  }

  return {
    uploadedFiles,
    setUploadedFiles,
    processFiles,
    simulateUpload,
    updateFileStatus,
  }
}
