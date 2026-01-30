import type { Phase } from '../domain'

export function PhaseBadgeTone({ phase }: { phase: Phase }) {
  switch (phase) {
    case 'BEFORE_APPLY':
      return 'white'
    case 'APPLY_OPEN':
      return 'lime'
    case 'DOC_REVIEWING':
      return 'gray'
    case 'DOC_RESULT_PUBLISHED':
      return 'gray'
    case 'INTERVIEW_WAITING':
      return 'gray'
    case 'FINAL_REVIEWING':
      return 'gray'
    case 'FINAL_RESULT_PUBLISHED':
      return 'gray'
    case 'CLOSED':
      return 'gray'
    default:
      return 'gray'
  }
}
