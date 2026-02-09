import axios from 'axios'

import { axiosInstance } from '@/api/axiosInstance'
import type { CommonResponseDTO } from '@/shared/types/api'

export type PostUploadFileRequestDTO = {
  fileName: string
  contentType: string
  fileSize: number
  category: string
}

export type PostUploadFileResponseDTO = {
  fileId: string
  uploadUrl: string
  uploadMethod: string
  headers: {
    'Content-Type': string
  }
  expiresAt: string
}

export const uploadFile = async ({
  fileName,
  contentType,
  fileSize,
  category,
}: PostUploadFileRequestDTO): Promise<CommonResponseDTO<PostUploadFileResponseDTO>> => {
  const { data } = await axiosInstance.post(`/storage/prepare-upload`, {
    fileName,
    contentType,
    fileSize,
    category,
  })
  return data
}

export const confirmUpload = async (fileId: string): Promise<void> => {
  const { data } = await axiosInstance.post(`/storage/${fileId}/confirm`)
  return data
}

export const deleteFile = async (fileId: string): Promise<void> => {
  const { data } = await axiosInstance.delete(`/storage/${fileId}`)
  return data
}

export const realUploadFile = async (
  uploadUrl: string,
  file: File,
  contentType: string,
  onProgress?: (progress: number) => void,
): Promise<void> => {
  console.log('PUT Content-Type =', contentType, 'file.type =', file.type)
  try {
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': contentType,
      },
      onUploadProgress: (event) => {
        if (!event.total) return
        const nextProgress = Math.min(Math.round((event.loaded / event.total) * 100), 100)
        onProgress?.(nextProgress)
      },
    })
  } catch (e: any) {
    console.log('status', e?.response?.status)
    console.log('data', e?.response?.data) // <-- 여기에 S3 XML 에러코드 뜸
    console.log('headers', e?.response?.headers)
    throw e
  }
}
