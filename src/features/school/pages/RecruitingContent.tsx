import type { RecruitingProps } from '../hooks/useRecruitingContentLogic'
import { useRecruitingContentLogic } from '../hooks/useRecruitingContentLogic'
import { RecruitingContentView } from './RecruitingContentView'

export const RecruitingContent = (props: RecruitingProps) => {
  const logic = useRecruitingContentLogic(props)
  return <RecruitingContentView {...logic} />
}
