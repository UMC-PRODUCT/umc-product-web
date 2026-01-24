export type CommonResponseDTO<T> = {
  success: boolean
  code: string
  message: string
  result: T
}
