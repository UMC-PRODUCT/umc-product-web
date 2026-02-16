import { useRef, useState } from 'react'

import { realUploadFile } from '@/shared/api/file/api'
import { useFile } from '@/shared/hooks/useFile'

import {
  ALLOWED_PROFILE_TYPES,
  FALLBACK_CONTENT_TYPE,
  MAX_PROFILE_SIZE,
  PROFILE_CATEGORY,
} from '../domain/schoolConstants'

export const useSchoolProfileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewUrlRef = useRef<string | null>(null)
  const { useUploadFile, useConfirmUpload, useDeleteFile } = useFile()
  const uploadFileMutation = useUploadFile()
  const confirmUploadMutation = useConfirmUpload()
  const deleteFileMutation = useDeleteFile()
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [profileFileId, setProfileFileId] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileInputChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    if (!ALLOWED_PROFILE_TYPES.has(file.type)) return
    if (file.size > MAX_PROFILE_SIZE) return

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }
    const previewUrl = URL.createObjectURL(file)
    previewUrlRef.current = previewUrl
    setProfilePreview(previewUrl)
    setUploadProgress(0)
    setIsUploading(true)

    try {
      const prepare = await uploadFileMutation.mutateAsync({
        fileName: file.name,
        contentType: file.type || FALLBACK_CONTENT_TYPE,
        fileSize: file.size,
        category: PROFILE_CATEGORY,
      })

      await realUploadFile(
        prepare.result.uploadUrl,
        file,
        file.type || FALLBACK_CONTENT_TYPE,
        (p) => setUploadProgress(p),
      )
      await confirmUploadMutation.mutateAsync(prepare.result.fileId)
      setProfileFileId(prepare.result.fileId)
    } catch (error) {
      setProfileFileId(null)
      setUploadProgress(null)
      setProfilePreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileWrapperClick = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleRemoveProfile = async () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
    setProfilePreview(null)
    setUploadProgress(null)
    if (profileFileId) {
      await deleteFileMutation.mutateAsync(profileFileId)
      setProfileFileId(null)
    }
  }

  return {
    fileInputRef,
    profilePreview,
    uploadProgress,
    isUploading,
    profileFileId,
    handleFileInputChange,
    handleFileWrapperClick,
    handleRemoveProfile,
  }
}
