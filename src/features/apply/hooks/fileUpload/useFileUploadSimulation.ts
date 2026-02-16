import type { Dispatch, SetStateAction } from 'react'

import type { FileUploadStatus, UploadedFile } from '../../domain/model'

// 업로드 진행 시뮬레이션 파라미터
const UPLOAD_PROGRESS_INTERVAL_MS = 300
const UPLOAD_PROGRESS_INCREMENT_MAX = 20
const UPLOAD_ERROR_PROBABILITY = 0.1
const MAX_PROGRESS = 100

export function useFileUploadSimulation(
  setUploadedFiles: Dispatch<SetStateAction<Array<UploadedFile>>>,
) {
  const updateFileStatus = (fileId: string, status: FileUploadStatus, progress: number): void => {
    setUploadedFiles((previousFiles) =>
      previousFiles.map((file) => (file.id === fileId ? { ...file, status, progress } : file)),
    )
  }

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

  return {
    simulateUpload,
    updateFileStatus,
  }
}
