import type { PostUploadFileRequestDTO } from '../api/file/api'
import { confirmUpload, deleteFile, uploadFile } from '../api/file/api'
import { useCustomMutation } from './customQuery'

export function useFile() {
  function useUploadFile() {
    return useCustomMutation(
      ({ fileName, contentType, fileSize, category }: PostUploadFileRequestDTO) =>
        uploadFile({ fileName, contentType, fileSize, category }),
    )
  }

  function useDeleteFile() {
    return useCustomMutation((fileUrl: string) => deleteFile(fileUrl))
  }

  function useConfirmUpload() {
    return useCustomMutation((fileUrl: string) => confirmUpload(fileUrl))
  }

  return { useUploadFile, useDeleteFile, useConfirmUpload }
}
