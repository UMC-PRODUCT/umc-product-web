import { useEffect, useRef, useState } from 'react'

import { realUploadFile } from '@/shared/api/file/api'
import Upload from '@/shared/assets/icons/upload.svg?react'
import { useFile } from '@/shared/hooks/useFile'
import type { FileUploadAnswer, FileUploadStatus, UploadedFile } from '@/shared/types/apply'
import type { QuestionMode } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import FileList from './FileList/FileList'
import LinkSection from './LinkSection/LinkSection'
import * as S from './FileUpload.style'

interface FileUploadProps {
  value?: FileUploadAnswer
  onChange?: (newValue: FileUploadAnswer) => void
  mode: QuestionMode
}

const MAX_PROGRESS = 100
const DEFAULT_CATEGORY = 'PORTFOLIO'
const DEFAULT_CONTENT_TYPE = 'application/octet-stream'

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
  const { useUploadFile, useDeleteFile, useConfirmUpload } = useFile()
  const uploadFileMutation = useUploadFile()
  const deleteFileMutation = useDeleteFile()
  const confirmUploadMutation = useConfirmUpload()
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

  const uploadSingleFile = async (fileInfo: UploadedFile) => {
    const contentType = fileInfo.file.type || DEFAULT_CONTENT_TYPE
    updateFileStatus(fileInfo.id, 'loading', 0)
    try {
      const prepare = await uploadFileMutation.mutateAsync({
        fileName: fileInfo.name,
        contentType,
        fileSize: fileInfo.size,
        category: DEFAULT_CATEGORY,
      })

      await realUploadFile(prepare.result.uploadUrl, fileInfo.file, contentType, (progress) => {
        updateFileStatus(fileInfo.id, 'loading', progress)
      })

      await confirmUploadMutation.mutateAsync(prepare.result.fileId)
      updateFiles((previousFiles) =>
        previousFiles.map((file) =>
          file.id === fileInfo.id
            ? { ...file, id: prepare.result.fileId, status: 'success', progress: MAX_PROGRESS }
            : file,
        ),
      )
    } catch (error) {
      updateFileStatus(fileInfo.id, 'error', 0)
    }
  }

  const processFiles = (fileList: FileList | null): void => {
    if (!fileList) return

    const newFileInfoList = Array.from(fileList).map(createFileInfo)

    updateFiles((previousFiles) => [...previousFiles, ...newFileInfoList])

    newFileInfoList.forEach((fileInfo) => {
      void uploadSingleFile(fileInfo)
    })
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
    const currentFile = filesRef.current.find((file) => file.id === fileId)
    if (!currentFile) return
    updateFileStatus(fileId, 'loading', 0)
    void uploadSingleFile({ ...currentFile, file: fileObject })
  }

  const handleRemoveFile = (fileId: string) => {
    const targetFile = filesRef.current.find((file) => file.id === fileId)
    updateFiles((previousFiles) => previousFiles.filter((file) => file.id !== fileId))
    if (targetFile?.status === 'success') {
      void deleteFileMutation.mutateAsync(fileId)
    }
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
