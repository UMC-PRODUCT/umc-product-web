import { createFileRoute } from '@tanstack/react-router'

import { RecruitingPage } from '@features/recruiting/pages/RecruitingPage'

export const Route = createFileRoute('/(app)/recruiting/')({
  component: RecruitingPage,
})
