import { createFileRoute } from '@tanstack/react-router'

import { SystemPage } from '@/features/management/pages/SystemPage'

export const Route = createFileRoute('/(app)/management/system/')({
  component: SystemPage,
})
