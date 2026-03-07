export type PartType = 'PLAN' | 'DESIGN' | 'WEB' | 'IOS' | 'ANDROID' | 'SPRINGBOOT' | 'NODEJS'

export type PartSmallType = 'Plan' | 'Design' | 'Web' | 'iOS' | 'Android' | 'SpringBoot' | 'Node.js'

export type PartListType = ReadonlyArray<PartType>

export type PartFilterType = PartType | 'ALL'

export type CommonPartType = PartType | 'COMMON'
