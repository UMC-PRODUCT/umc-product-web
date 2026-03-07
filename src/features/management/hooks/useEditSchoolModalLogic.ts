import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'

import { getSchoolDetails } from '@/features/management/domain/api'
import { managementKeys } from '@/features/management/domain/queryKeys'
import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import { realUploadFile } from '@/shared/api/file/api'
import type { LinkType } from '@/shared/constants/umc'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { useFile } from '@/shared/hooks/useFile'
import type { Option } from '@/shared/types/form'
import type { ExternalLink } from '@/shared/types/link'

import {
  ALLOWED_PROFILE_TYPES,
  FALLBACK_CONTENT_TYPE,
  MAX_PROFILE_SIZE,
  PROFILE_CATEGORY,
} from '../domain/schoolConstants'

type EditSchoolForm = {
  schoolName: string
  remark: string
  linkTitle: string
  linkUrl: string
}

const normalizeLink = (link: ExternalLink) => ({
  title: link.title.trim(),
  type: link.type,
  url: link.url.trim(),
})

const areLinksEqual = (left: Array<ExternalLink>, right: Array<ExternalLink>) => {
  if (left.length !== right.length) return false
  return left.every((link, index) => {
    const normalizedLeft = normalizeLink(link)
    const normalizedRight = normalizeLink(right[index])
    return (
      normalizedLeft.type === normalizedRight.type &&
      normalizedLeft.title === normalizedRight.title &&
      normalizedLeft.url === normalizedRight.url
    )
  })
}

export const useEditSchoolModalLogic = (schoolId: string, onClose: () => void) => {
  const [isOpen, setIsOpen] = useState(true)
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewUrlRef = useRef<string | null>(null)
  const initialDataRef = useRef<{ schoolName: string; remark: string; links: Array<ExternalLink> }>(
    {
      schoolName: '',
      remark: '',
      links: [],
    },
  )
  const { useUploadFile, useConfirmUpload } = useFile()
  const uploadFileMutation = useUploadFile()
  const confirmUploadMutation = useConfirmUpload()
  const { data: schoolDetails, isLoading } = useCustomQuery(
    managementKeys.getSchoolDetails(schoolId),
    () => getSchoolDetails({ schoolId }),
  )
  const { usePatchSchool, useDeleteSchool } = useManagementMutations()
  const { mutate: patchSchool, isPending: isPatchLoading } = usePatchSchool()
  const { mutate: deleteSchoolMutate, isPending: isDeleteLoading } = useDeleteSchool()
  const [openAddLink, setOpenAddLink] = useState(false)
  const [links, setLinks] = useState<Array<ExternalLink>>([])
  const [linkType, setLinkType] = useState<Option<string> | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [profileFileId, setProfileFileId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { register, reset, setValue, getValues, watch } = useForm<EditSchoolForm>({
    defaultValues: { schoolName: '', remark: '', linkTitle: '', linkUrl: '' },
  })

  const linkTitleValue = watch('linkTitle')
  const linkUrlValue = watch('linkUrl')
  const linkTitleField = register('linkTitle')
  const linkUrlField = register('linkUrl')

  useEffect(() => {
    if (!schoolDetails?.result) return
    const nextName = schoolDetails.result.schoolName
    const nextRemark = schoolDetails.result.remark ?? ''
    reset({ schoolName: nextName, remark: nextRemark, linkTitle: '', linkUrl: '' })

    const resolvedLinks = Array.isArray(schoolDetails.result.links)
      ? schoolDetails.result.links
      : []
    setLinks(resolvedLinks)
    initialDataRef.current = { schoolName: nextName, remark: nextRemark, links: resolvedLinks }
  }, [schoolDetails, reset])

  useEffect(
    () => () => {
      if (!previewUrlRef.current) return
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    },
    [],
  )

  const handleFileInputChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    if (!ALLOWED_PROFILE_TYPES.has(file.type)) return
    if (file.size > MAX_PROFILE_SIZE) return

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    const previewUrl = URL.createObjectURL(file)
    previewUrlRef.current = previewUrl
    setProfilePreview(previewUrl)
    setIsUploading(true)

    try {
      const prepare = await uploadFileMutation.mutateAsync({
        fileName: file.name,
        contentType: file.type || FALLBACK_CONTENT_TYPE,
        fileSize: file.size,
        category: PROFILE_CATEGORY,
      })
      await realUploadFile(prepare.result.uploadUrl, file, file.type || FALLBACK_CONTENT_TYPE)
      await confirmUploadMutation.mutateAsync(prepare.result.fileId)
      setProfileFileId(prepare.result.fileId)
    } catch {
      setProfileFileId(null)
      setProfilePreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileWrapperClick = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleStartAddLink = () => {
    setEditingIndex(null)
    setLinkType(null)
    setValue('linkTitle', '')
    setValue('linkUrl', '')
    setOpenAddLink(true)
  }

  const handleStartEditLink = (index: number) => {
    const target = links[index]
    setOpenAddLink(false)
    setEditingIndex(index)
    setValue('linkTitle', target.title)
    setValue('linkUrl', target.url)
  }

  const handleSubmitLink = () => {
    const { linkTitle, linkUrl } = getValues()
    const trimmedTitle = linkTitle.trim()
    const trimmedUrl = linkUrl.trim()
    if (!trimmedTitle || !trimmedUrl) return

    if (editingIndex !== null) {
      setLinks((prev) =>
        prev.map((link, index) =>
          index === editingIndex ? { ...link, title: trimmedTitle, url: trimmedUrl } : link,
        ),
      )
    } else {
      if (!linkType) return
      setLinks((prev) => [
        ...prev,
        { title: trimmedTitle, url: trimmedUrl, type: linkType.id as LinkType },
      ])
    }

    setValue('linkTitle', '')
    setValue('linkUrl', '')
    setLinkType(null)
    setEditingIndex(null)
    setOpenAddLink(false)
  }

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index))
    if (editingIndex === index) {
      setEditingIndex(null)
      setValue('linkTitle', '')
      setValue('linkUrl', '')
      setLinkType(null)
    } else if (editingIndex !== null && index < editingIndex) {
      setEditingIndex(editingIndex - 1)
    }
  }

  const handleCancelLinkEditor = () => {
    setEditingIndex(null)
    setValue('linkTitle', '')
    setValue('linkUrl', '')
    setLinkType(null)
    setOpenAddLink(false)
  }

  const handleSave = () => {
    const { schoolName, remark } = getValues()
    const trimmedName = schoolName.trim()
    const trimmedRemark = remark.trim()
    const nameChanged = trimmedName !== initialDataRef.current.schoolName
    const remarkChanged = trimmedRemark !== initialDataRef.current.remark
    const linksChanged = !areLinksEqual(links, initialDataRef.current.links)
    const imageChanged = Boolean(profileFileId)

    if (!nameChanged && !remarkChanged && !linksChanged && !imageChanged) {
      onClose()
      return
    }

    const body: {
      schoolName?: string
      remark?: string
      links?: Array<ExternalLink> | null
      logoImageId?: string
    } = {}
    if (nameChanged) body.schoolName = trimmedName
    if (remarkChanged) body.remark = trimmedRemark || undefined
    body.links = linksChanged ? links.map(normalizeLink) : null
    if (imageChanged) body.logoImageId = profileFileId ?? undefined

    patchSchool(
      { schoolId, body: { ...body } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: managementKeys.getSchoolsPagingBase })
          queryClient.invalidateQueries({ queryKey: managementKeys.getAllSchools })
          queryClient.invalidateQueries({ queryKey: managementKeys.getSchoolDetails(schoolId) })
          onClose()
        },
      },
    )
  }

  const handleDeleteSchool = () => {
    deleteSchoolMutate([schoolId], { onSuccess: () => onClose() })
  }

  return {
    isOpen,
    setIsOpen,
    schoolDetails,
    isLoading,
    fileInputRef,
    profilePreview,
    isUploading,
    links,
    editingIndex,
    openAddLink,
    linkType,
    setLinkType,
    linkTitleValue,
    linkUrlValue,
    linkTitleField,
    linkUrlField,
    register,
    isDeleteLoading,
    isPatchLoading,
    handleFileInputChange,
    handleFileWrapperClick,
    handleStartAddLink,
    handleStartEditLink,
    handleSubmitLink,
    handleRemoveLink,
    handleCancelLinkEditor,
    handleDeleteSchool,
    handleSave,
  }
}
