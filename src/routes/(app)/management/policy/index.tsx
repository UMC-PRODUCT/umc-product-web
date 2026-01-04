import { createFileRoute } from '@tanstack/react-router'

import { PolicyPage } from '@features/management/pages/PolicyPage'

export const Route = createFileRoute('/(app)/management/policy/')({
  component: PolicyPage,
})
