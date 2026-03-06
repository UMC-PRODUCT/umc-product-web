import type { RecruitingProps } from '../hooks/recruiting/useRecruitingContentLogic'
import { useRecruitingContentLogic } from '../hooks/recruiting/useRecruitingContentLogic'
import { RecruitingContentView } from './RecruitingContentView'

export const RecruitingContent = (props: RecruitingProps) => {
  const logic = useRecruitingContentLogic(props)
  return <RecruitingContentView {...logic} />
}
