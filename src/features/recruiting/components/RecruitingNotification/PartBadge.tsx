import type { PartType } from '@/features/auth/domain'

import * as S from './PartBadge.style'

const PartBadge = ({ partName }: { partName: PartType }) => {
  return <S.PartBadge>{partName}</S.PartBadge>
}

export default PartBadge
