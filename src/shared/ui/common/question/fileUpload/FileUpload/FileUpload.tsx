import { useEffect, useRef, useState } from 'react'

import Upload from '@/shared/assets/icons/upload.svg?react'
import type { QuestionMode } from '@/shared/types/form'
import type { FileUploadAnswer, FileUploadStatus, UploadedFile } from '@/shared/types/question'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import FileList from '../FileList/FileList'
import LinkSection from '../LinkSection/LinkSection'
import * as S from './FileUpload.style'

interface FileUploadProps {
  value?: FileUploadAnswer
  onChange?: (newValue: FileUploadAnswer) => void
  mode: QuestionMode
}

const UPLOAD_PROGRESS_INTERVAL_MS = 300
const UPLOAD_PROGRESS_INCREMENT_MAX = 20
const UPLOAD_ERROR_PROBABILITY = 0.1
const MAX_PROGRESS = 100

function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

function createFileInfo(file: File): UploadedFile {
  return {
    id: generateFileId(),
    name: file.name,
    size: file.size,
    status: 'loading',
    progress: 0,
    file,
  }
}

export const FileUpload = ({
  value = { files: [], links: [] },
  onChange,
  mode,
}: FileUploadProps) => {
  const isEditable = mode === 'edit'
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const filesRef = useRef<Array<UploadedFile>>(value.files)
  const files = value.files
  const currentLinks = value.links

  useEffect(() => {
    filesRef.current = value.files
  }, [value.files])

  const updateFiles = (updater: (previousFiles: Array<UploadedFile>) => Array<UploadedFile>) => {
    if (!onChange) return
    const nextFiles = updater(filesRef.current)
    filesRef.current = nextFiles
    onChange({ files: nextFiles, links: currentLinks })
  }

  const updateFileStatus = (fileId: string, status: FileUploadStatus, progress: number): void => {
    updateFiles((previousFiles) =>
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
      simulateUpload(fileInfo.id, fileInfo.file)
    })

    updateFiles((previousFiles) => [...previousFiles, ...newFileInfoList])
  }

  const handleFileInputChange = (fileList: FileList | null) => {
    processFiles(fileList)
  }

  const handleDropzoneClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDraggingOver(false)
    processFiles(event.dataTransfer.files)
  }

  const dropzoneEventHandlers = isEditable
    ? {
        onClick: handleDropzoneClick,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
      }
    : {}

  const handleRetryUpload = (fileId: string, fileObject?: File) => {
    if (!fileObject) return
    updateFileStatus(fileId, 'loading', 0)
    simulateUpload(fileId, fileObject)
  }

  const handleRemoveFile = (fileId: string) => {
    updateFiles((previousFiles) => previousFiles.filter((file) => file.id !== fileId))
  }

  const handleLinksChange = (updatedLinks: Array<string>) => {
    onChange?.({ files: filesRef.current, links: updatedLinks })
  }

  return (
    <Flex gap={12} width="100%">
      <Section variant="solid" css={S.sectionStyle} gap={12}>
        <FileList
          files={files}
          mode={mode}
          onRetry={(file) => handleRetryUpload(file.id, file.file)}
          onRemove={handleRemoveFile}
        />

        <Section
          variant="dashed"
          {...dropzoneEventHandlers}
          css={S.dropzoneStyle(isDraggingOver, isEditable)}
        >
          <S.FileWrapper
            alignItems="center"
            justifyContent="center"
            gap={6}
            flexDirection="column"
            $isEditable={isEditable}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={
                isEditable ? (event) => handleFileInputChange(event.target.files) : undefined
              }
              multiple
              hidden
              disabled={!isEditable}
            />
            <Flex alignItems="center" gap={8} width="fit-content">
              <Upload />
              <span className="desktop-text">
                클릭 또는 드래그 하여 <span className="bold">파일 추가</span>
              </span>
              <span className="mobile-text">클릭하여 파일 추가</span>
            </Flex>
            <span className="file-notification">파일 용량 10MB 제한</span>
          </S.FileWrapper>
        </Section>

        <LinkSection links={currentLinks} mode={mode} onLinksChange={handleLinksChange} />
      </Section>
    </Flex>
  )
}
