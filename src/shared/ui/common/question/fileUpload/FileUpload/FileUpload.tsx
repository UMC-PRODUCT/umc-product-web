import { useRef, useState } from 'react'

import type { FileInfo } from '@/features/apply/hooks/useFileUpload'
import { useFileUpload } from '@/features/apply/hooks/useFileUpload'
import Upload from '@/shared/assets/icons/upload.svg?react'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import FileList from '../FileList/FileList'
import LinkSection from '../LinkSection/LinkSection'
import * as S from './FileUpload.style'

type FileUploadProps = {
  value?: { files: Array<FileInfo>; links: Array<string> }
  onChange?: (value: { files: Array<FileInfo>; links: Array<string> }) => void
  mode: 'view' | 'edit'
}

export const FileUpload = ({
  value = { files: [], links: [] },
  onChange,
  mode,
}: FileUploadProps) => {
  const { files, links } = value
  const isEditable = mode === 'edit'
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const { setLocalFiles, handleProcessFiles, uploadFile, updateStatus } = useFileUpload(
    files,
    value,
    onChange,
  )

  const handleFileInputChange = (files: FileList | null) => {
    handleProcessFiles(files)
  }

  const handleDropzoneClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)
    handleProcessFiles(e.dataTransfer.files)
  }

  const dropzoneHandlers = isEditable
    ? {
        onClick: handleDropzoneClick,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
      }
    : {}

  const handleRetry = (fileId: string, fileObject: File) => {
    updateStatus(fileId, 'loading', 0)
    uploadFile(fileId, fileObject)
  }

  const handleRemoveFile = (fileId: string) => {
    setLocalFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleLinksChange = (nextLinks: Array<string>) => {
    onChange?.({ ...value, links: nextLinks })
  }

  return (
    <Flex gap={12} width="100%">
      <Section variant="both" css={S.sectionStyle} gap={12}>
        <FileList
          files={files}
          mode={mode}
          onRetry={(file) => handleRetry(file.id, file.fileObject)}
          onRemove={handleRemoveFile}
        />

        <Section
          variant="dashed"
          {...dropzoneHandlers}
          css={S.dropzoneStyle(isDraggingOver, isEditable)}
        >
          <S.FileWrapper
            alignItems="center"
            justifyContent="center"
            gap={6}
            flexDirection="column"
            isEditable={isEditable}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={isEditable ? (e) => handleFileInputChange(e.target.files) : undefined}
              multiple
              hidden
              disabled={!isEditable}
            />
            <Flex alignItems="center" gap={8} width={'fit-content'}>
              <Upload />
              <span className="desktop-text">
                클릭 또는 드래그 하여 <span className="bold">파일 추가</span>
              </span>
              <span className="mobile-text">클릭하여 파일 추가</span>
            </Flex>
            <span className="file-notification">파일 용량 10MB 제한</span>
          </S.FileWrapper>
        </Section>
        <LinkSection links={links} mode={mode} onLinksChange={handleLinksChange} />
      </Section>
    </Flex>
  )
}
