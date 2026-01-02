export const manageSchoolTabs = [
  { value: 'add', label: '신규 학교 추가' },
  { value: 'delete', label: '학교 삭제' },
  { value: 'edit', label: '학교 정보 수정' },
] as const

export const manageAccountTabs = [
  { value: 'add', label: '계정 생성' },
  { value: 'edit', label: '계정 수정 및 삭제' },
  { value: 'level', label: '권한 레벨 변경' },
] as const

export type ManageSchoolTab = (typeof manageSchoolTabs)[number]
export type ManageSchoolTabName = ManageSchoolTab['value']
export const manageSchoolTabValues = manageSchoolTabs.map((tab) => tab.value)

export type ManageAccountTab = (typeof manageAccountTabs)[number]
export type ManageAccountTabName = ManageAccountTab['value']
export const manageAccountTabValues = manageAccountTabs.map((tab) => tab.value)
