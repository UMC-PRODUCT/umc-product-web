import type { RecruitingProps } from '../hooks/useRecruitingContentLogic'
import { useRecruitingContentLogic } from '../hooks/useRecruitingContentLogic'
import RecruitingContentView from './RecruitingContentView'

const RecruitingContent = (props: RecruitingProps) => {
  const logic = useRecruitingContentLogic(props)
  return <RecruitingContentView {...logic} />
}

export default RecruitingContent
