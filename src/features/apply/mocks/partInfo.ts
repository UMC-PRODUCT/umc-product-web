import type { PartType } from '@features/auth/domain'
import type { RecruitingType } from '@features/management/domain'

import { PART_ABILITY } from '@/shared/constants/umc'

type PartInfo = {
  part: PartType
  state: RecruitingType
  ability: Array<string>
}

export const PART_INFO_MOCK: Array<PartInfo> = [
  {
    part: 'Plan',
    state: 'OPEN',
    ability: PART_ABILITY['Plan'],
  },
  {
    part: 'Design',
    state: 'OPEN',
    ability: PART_ABILITY['Design'],
  },
  {
    part: 'Android',
    state: 'OPEN',
    ability: PART_ABILITY['Android'],
  },
  {
    part: 'iOS',
    state: 'OPEN',
    ability: PART_ABILITY['iOS'],
  },
  {
    part: 'Web',
    state: 'CLOSED',
    ability: PART_ABILITY['Web'],
  },
  {
    part: 'SpringBoot',
    state: 'CLOSED',
    ability: PART_ABILITY['SpringBoot'],
  },
  {
    part: 'Node.js',
    state: 'CLOSED',
    ability: PART_ABILITY['Node.js'],
  },
]
