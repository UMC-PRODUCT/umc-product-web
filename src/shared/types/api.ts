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

export type SpringSortResponseDTO = {
  empty: boolean
  unsorted: boolean
  sorted: boolean
}

export type SpringPageableResponseDTO = {
  offset: number
  sort: SpringSortResponseDTO
  unpaged: boolean
  pageNumber: number
  paged: boolean
  pageSize: number
}

export type SpringPageResponseDTO<T> = {
  totalPages: number
  totalElements: number
  size: number
  content: Array<T>
  number: number
  sort: SpringSortResponseDTO
  numberOfElements: number
  pageable: SpringPageableResponseDTO
  first: boolean
  last: boolean
  empty: boolean
}

export type CommonSearchParams = {
  page?: string
  size?: string
}

export type AuditLogSearchParams = CommonSearchParams & {
  domain?: string
  actorMemberId?: string
  from?: string
  to?: string
  sort?: string
}
