import { createFileRoute } from '@tanstack/react-router'

import type { EVALUATION_TAB } from '@/features/school/domain'
import { SchoolEvaluation } from '@/features/school/pages/SchoolEvaluation'

type SearchParams = {
  tab?: (typeof EVALUATION_TAB)[number]['value']
  interviewTab?: 'scheduling' | 'questions' | 'evaluations'
}

export const Route = createFileRoute('/(app)/school/evaluation/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    tab:
      search.tab === 'docs' || search.tab === 'interview' || search.tab === 'final'
        ? search.tab
        : undefined,
    interviewTab:
      search.interviewTab === 'scheduling' ||
      search.interviewTab === 'questions' ||
      search.interviewTab === 'evaluations'
        ? search.interviewTab
        : undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const activeTab: (typeof EVALUATION_TAB)[number]['value'] = search.tab ?? 'docs'

  return (
    <SchoolEvaluation
      activeTab={activeTab}
      onTabChange={(next) =>
        navigate({
          search: (prev) => ({ ...prev, tab: next }),
          replace: true,
        })
      }
    />
  )
}
