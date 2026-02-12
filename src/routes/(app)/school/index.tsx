import { createFileRoute } from '@tanstack/react-router'

import { NotFoundPage } from '@/shared/ui/feedback'

export const Route = createFileRoute('/(app)/school/')({
  component: () => <NotFoundPage />,
})
