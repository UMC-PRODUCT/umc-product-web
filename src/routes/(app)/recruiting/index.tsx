import { createFileRoute } from '@tanstack/react-router'

import { RecruitingPage } from '@features/recruiting/pages/RecruitingPage'

import {
  MOCK_PART_CURRICULUM,
  RAW_EVENTS,
  RECRUITING_NOTICE,
} from '@/features/recruiting/mocks/recruiting'

const RouteComponent = () => {
  const { notice, events, curriculum } = Route.useLoaderData()
  return <RecruitingPage notice={notice} events={events} curriculum={curriculum} />
}

export const Route = createFileRoute('/(app)/recruiting/')({
  loader: () => ({
    notice: RECRUITING_NOTICE,
    events: RAW_EVENTS,
    curriculum: MOCK_PART_CURRICULUM,
  }),
  component: RouteComponent,
})
