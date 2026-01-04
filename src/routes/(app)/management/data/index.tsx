import { createFileRoute } from '@tanstack/react-router'

import { DataPage } from '@features/management/pages/DataPage'

export const Route = createFileRoute('/(app)/management/data/')({
  component: DataPage,
})
