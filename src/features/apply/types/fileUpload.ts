import type { FileUploadStatus, UploadedFile } from './question'

export interface FileUploadValue {
  files: Array<UploadedFile>
  links?: Array<string>
}

export interface UseFileUploadOptions {
  initialFiles: Array<UploadedFile>
  value: FileUploadValue | undefined
  onChange: ((newValue: FileUploadValue) => void) | undefined
}

export interface UseFileUploadReturn {
  uploadedFiles: Array<UploadedFile>
  setUploadedFiles: React.Dispatch<React.SetStateAction<Array<UploadedFile>>>
  processFiles: (fileList: FileList | null) => void
  simulateUpload: (fileId: string, file: File) => void
  updateFileStatus: (fileId: string, status: FileUploadStatus, progress: number) => void
}
