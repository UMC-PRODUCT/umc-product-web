import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import type { EVALUATION_TAB } from '@/features/school/domain'
import SchoolEvaluation from '@/features/school/pages/SchoolEvaluation'

export const Route = createFileRoute('/(app)/school/evaluation/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<(typeof EVALUATION_TAB)[number]['value']>('docs')
  return <SchoolEvaluation activeTab={activeTab} onTabChange={setActiveTab} />
}
