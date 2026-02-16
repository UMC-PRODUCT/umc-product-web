import type { Option } from '@/shared/types/form'

export const MAX_PROFILE_SIZE = 5 * 1024 * 1024
export const PROFILE_CATEGORY = 'SCHOOL_LOGO'
export const FALLBACK_CONTENT_TYPE = 'application/octet-stream'
export const ALLOWED_PROFILE_TYPES = new Set(['image/png', 'image/jpeg', 'image/jpg'])

export const LINK_TYPE_OPTIONS: Array<Option<string>> = [
  { id: 'KAKAO', label: '카카오' },
  { id: 'INSTAGRAM', label: '인스타그램' },
  { id: 'YOUTUBE', label: '유튜브' },
]
