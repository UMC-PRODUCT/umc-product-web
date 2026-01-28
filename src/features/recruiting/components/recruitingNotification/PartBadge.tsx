import type { RecruitingPart } from '@/shared/types/form'

import * as S from './PartBadge.style'

const PartBadge = ({ partName }: { partName: RecruitingPart }) => {
  return <S.PartBadge>{partName}</S.PartBadge>
}

export default PartBadge
