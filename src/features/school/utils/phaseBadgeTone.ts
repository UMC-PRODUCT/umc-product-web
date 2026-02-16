import type { Phase } from '../domain'

export function PhaseBadgeTone({ phase }: { phase: Phase }) {
  switch (phase) {
    case 'BEFORE_APPLY':
      return 'white'
    case 'APPLY_OPEN':
      return 'lime'
    case 'DOC_REVIEWING':
      return 'lime'
    case 'DOC_RESULT_PUBLISHED':
      return 'lime'
    case 'INTERVIEW_WAITING':
      return 'lime'
    case 'FINAL_REVIEWING':
      return 'lime'
    case 'FINAL_RESULT_PUBLISHED':
      return 'lime'
    case 'CLOSED':
      return 'gray'
    default:
      return 'gray'
  }
}
