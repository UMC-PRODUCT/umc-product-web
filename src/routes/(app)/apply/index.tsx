import { createFileRoute } from '@tanstack/react-router'

import { ApplyPage } from '@features/apply/pages/ApplyPage'

import { PART_INFO_MOCK } from '@/features/apply/mocks/partInfo'

const RouteComponent = () => {
  const { partInfoList, isAlreadySubmitted } = Route.useLoaderData()
  return <ApplyPage partInfoList={partInfoList} isAlreadySubmitted={isAlreadySubmitted} />
}

export const Route = createFileRoute('/(app)/apply/')({
  loader: () => ({
    partInfoList: PART_INFO_MOCK,
    isAlreadySubmitted: false,
  }),
  component: RouteComponent,
})
