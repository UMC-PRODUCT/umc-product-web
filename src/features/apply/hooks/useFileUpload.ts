import { useEffect, useState } from 'react'

type FileStatus = 'loading' | 'success' | 'error'

export interface FileInfo {
  id: string
  name: string
  size: number
  status: FileStatus
  progress: number
  fileObject?: File
}

export const useFileUpload = (initialFiles: Array<FileInfo>, value: any, onChange: any) => {
  const [localFiles, setLocalFiles] = useState<Array<FileInfo>>(initialFiles)

  // 부모 상태와 동기화
  useEffect(() => {
    onChange?.({ ...value, files: localFiles })
  }, [localFiles])

  const updateStatus = (id: string, status: FileStatus, progress: number) => {
    setLocalFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status, progress } : f)))
  }

  const uploadFile = (fileId: string, _file: File) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        clearInterval(interval)
        const isError = Math.random() < 0.1
        updateStatus(fileId, isError ? 'error' : 'success', 100)
      } else {
        updateStatus(fileId, 'loading', Math.floor(progress))
      }
    }, 300)
  }

  const handleProcessFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const newItems = Array.from(fileList).map((file) => ({
      id: `file-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      status: 'loading' as const,
      progress: 0,
      fileObject: file,
    }))

    newItems.forEach((item) => uploadFile(item.id, item.fileObject))
    setLocalFiles((prev) => [...prev, ...newItems])
  }

  return { localFiles, setLocalFiles, handleProcessFiles, uploadFile, updateStatus }
}
