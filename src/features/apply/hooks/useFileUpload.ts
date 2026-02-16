import type { UseFileUploadOptions, UseFileUploadReturn } from '../domain/model'
import { useFileProcessing, useFileUploadSimulation, useUploadedFileState } from './fileUpload'

/**
 * 파일 업로드 상태 관리 훅 (Composed)
 *
 * 분해된 훅들을 조합하여 사용:
 * - useUploadedFileState: 파일 상태 관리 및 외부 동기화
 * - useFileUploadSimulation: 업로드 시뮬레이션
 * - useFileProcessing: 파일 처리 및 변환
 */
export function useFileUpload({
  initialFiles,
  value,
  onChange,
}: UseFileUploadOptions): UseFileUploadReturn {
  // 1. 파일 상태 관리
  const { uploadedFiles, setUploadedFiles } = useUploadedFileState({
    initialFiles,
    value,
    onChange,
  })

  // 2. 업로드 시뮬레이션
  const { simulateUpload, updateFileStatus } = useFileUploadSimulation(setUploadedFiles)

  // 3. 파일 처리
  const { processFiles } = useFileProcessing(setUploadedFiles, simulateUpload)

  return {
    uploadedFiles,
    setUploadedFiles,
    processFiles,
    simulateUpload,
    updateFileStatus,
  }
}
