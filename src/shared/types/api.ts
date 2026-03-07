export type CommonResponseDTO<T> = {
  success: boolean
  code: string
  message: string
  result: T
}

export type PaginationInfo = {
  page: string
  size: string
  totalPages: string
  totalElements: string
}

export type CommonPagingResponseDTO<T> = {
  content: Array<T>
  totalElements: string
  totalPages: string
  page: string
  size: string
  hasNext: boolean
  hasPrevious: boolean
}

export type CommonSearchParams = {
  page?: string
  size?: string
}
