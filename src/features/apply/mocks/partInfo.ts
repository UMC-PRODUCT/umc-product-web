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
    part: 'PLAN',
    state: 'OPEN',
    ability: PART_ABILITY['PLAN'],
  },
  {
    part: 'DESIGN',
    state: 'OPEN',
    ability: PART_ABILITY['DESIGN'],
  },
  {
    part: 'ANDROID',
    state: 'OPEN',
    ability: PART_ABILITY['ANDROID'],
  },
  {
    part: 'IOS',
    state: 'OPEN',
    ability: PART_ABILITY['IOS'],
  },
  {
    part: 'WEB',
    state: 'CLOSED',
    ability: PART_ABILITY['WEB'],
  },
  {
    part: 'SPRINGBOOT',
    state: 'CLOSED',
    ability: PART_ABILITY['SPRINGBOOT'],
  },
  {
    part: 'NODEJS',
    state: 'CLOSED',
    ability: PART_ABILITY['NODEJS'],
  },
]
