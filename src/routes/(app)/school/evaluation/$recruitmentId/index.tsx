import { createFileRoute } from '@tanstack/react-router'

import DocsEvaluationView from '@/features/school/components/SchoolEvaluation/DocsEvaluation/DocsEvaluationView/DocsEvaluationView'
import type { EVALUATION_TAB } from '@/features/school/domain'
import { SchoolEvaluation } from '@/features/school/pages/SchoolEvaluation'

type SearchParams = {
  tab?: (typeof EVALUATION_TAB)[number]['value']
}

export const Route = createFileRoute('/(app)/school/evaluation/$recruitmentId/')({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    tab:
      search.tab === 'docs' || search.tab === 'interview' || search.tab === 'final'
        ? search.tab
        : undefined,
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const params = Route.useParams()
  const search = Route.useSearch()
  const activeTab: (typeof EVALUATION_TAB)[number]['value'] = search.tab ?? 'docs'

  return (
    <SchoolEvaluation
      recruitmentId={params.recruitmentId}
      activeTab={activeTab}
      onTabChange={(next) =>
        navigate({
          to: '/school/evaluation',
          search: (prev) => ({ ...prev, tab: next }),
          replace: true,
        })
      }
      docsContent={<DocsEvaluationView />}
    />
  )
}
