import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import type { PartType } from '@/shared/types/part'

import * as S from './PartBadge.style'

const PartBadge = ({ partName }: { partName: PartType }) => {
  return <S.PartBadge>{PART_TYPE_TO_SMALL_PART[partName]}</S.PartBadge>
}

export default PartBadge
