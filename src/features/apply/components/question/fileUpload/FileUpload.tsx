/** @jsxImportSource @emotion/react */
import { useRef, useState } from 'react'

import type { FileInfo } from '@/features/apply/hooks/useFileUpload'
import { useFileUpload } from '@/features/apply/hooks/useFileUpload'
import Upload from '@/shared/assets/icons/upload.svg?react'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { formatFileSize } from '@/shared/utils/formatFileSize'

import FileItem from './FileItem'
import LinkItem from './LinkItem'
import * as S from './shared'

type FileUploadProps = {
  value?: { files: Array<any>; links: Array<string> }
  onChange?: (value: { files: Array<any>; links: Array<string> }) => void
}

export const FileUpload = ({ value = { files: [], links: [] }, onChange }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [linkInput, setLinkInput] = useState('')
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  // 커스텀 훅 사용
  const { setLocalFiles, handleProcessFiles, uploadFile, updateStatus } = useFileUpload(
    value.files,
    value,
    onChange,
  )

  // 링크 관련 핸들러
  const handleAddLink = () => {
    if (!linkInput.trim()) return
    onChange?.({ ...value, links: [...value.links, linkInput.trim()] })
    setLinkInput('')
  }

  return (
    <Flex gap={12} width="100%">
      <Section variant="both" css={S.sectionStyle} gap={12}>
        {value.files.length > 0 && (
          <S.Grid>
            {value.files.map((file: FileInfo) => (
              <FileItem
                key={file.id}
                fileName={file.name}
                fileSize={formatFileSize(file.size)}
                status={file.status}
                progress={file.progress}
                onRetry={() => {
                  updateStatus(file.id, 'loading', 0)
                  if (file.fileObject) uploadFile(file.id, file.fileObject)
                }}
                removeFile={() => setLocalFiles((prev) => prev.filter((f) => f.id !== file.id))}
              />
            ))}
          </S.Grid>
        )}

        <Section
          variant="dashed"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDraggingOver(true)
          }}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setIsDraggingOver(false)
            handleProcessFiles(e.dataTransfer.files)
          }}
          css={S.dropzoneStyle(isDraggingOver)}
        >
          <S.FileWrapper justifyContent="center" gap={6}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleProcessFiles(e.target.files)}
              multiple
              hidden
            />
            <Upload />
            <span>
              클릭 또는 드래그 하여 <span className="bold">파일 추가</span>
            </span>
          </S.FileWrapper>
        </Section>
        <S.InputWrapper>
          {value.links.map((link, i) => (
            <LinkItem
              key={i}
              value={link}
              onRemove={() =>
                onChange?.({ ...value, links: value.links.filter((_, idx) => idx !== i) })
              }
            />
          ))}
          <Flex flexDirection="row" width="100%" gap={21} alignItems="center">
            <input
              placeholder="링크 붙여 넣기"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
              css={S.inputStyle}
            />
            <Button
              className="add-button"
              typo="B4.Md"
              tone="gray"
              label="항목 추가"
              onClick={handleAddLink}
              css={{ borderRadius: '20px' }}
            />
          </Flex>
        </S.InputWrapper>
      </Section>
    </Flex>
  )
}
