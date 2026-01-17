import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod/v3'

import Recruiting from '@/features/school/pages/Recruiting'

const searchSchema = z.object({
  source: z.enum(['temp']).optional(),
})

export const Route = createFileRoute('/(app)/school/recruiting/$recruitingId/')({
  validateSearch: (search) => searchSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  const { source } = Route.useSearch()
  const shouldLoadTempDraft = source === 'temp'

  return <Recruiting shouldLoadTempDraft={shouldLoadTempDraft} />
}
