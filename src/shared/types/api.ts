export type CommonResponseDTO<T> = {
  success: boolean
  code: string
  message: string
  result: T
}

export type CommonPagingResponseDTO<T> = CommonResponseDTO<{
  content: Array<T>
  totalElements: string
  totalPages: string
  page: string
  size: string
  hasNext: boolean
  hasPrevious: boolean
}>
