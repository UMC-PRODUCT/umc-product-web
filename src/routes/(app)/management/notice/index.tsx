import { createFileRoute } from '@tanstack/react-router'

import { NoticePage } from '@features/management/pages/NoticePage'

export const Route = createFileRoute('/(app)/management/notice/')({
  component: NoticePage,
})
