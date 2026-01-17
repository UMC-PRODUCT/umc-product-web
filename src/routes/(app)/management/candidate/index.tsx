import { createFileRoute } from '@tanstack/react-router'

import { CandidatePage } from '@/features/management/pages/CandidatePage'

export const Route = createFileRoute('/(app)/management/candidate/')({
  component: CandidatePage,
})
