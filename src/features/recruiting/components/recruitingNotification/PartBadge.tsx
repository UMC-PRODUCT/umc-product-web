import type { PartType } from '@/shared/types/umc'

import * as S from './PartBadge.style'

const PartBadge = ({ partName }: { partName: PartType }) => {
  return <S.PartBadge>{partName}</S.PartBadge>
}

export default PartBadge
