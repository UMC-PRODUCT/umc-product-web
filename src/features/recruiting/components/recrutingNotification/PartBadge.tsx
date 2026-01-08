import type { Part } from '@/shared/types/umc/part'

import * as S from './PartBadge.style'

const PartBadge = ({ partName }: { partName: Part }) => {
  return <S.PartBadge>{partName}</S.PartBadge>
}

export default PartBadge
