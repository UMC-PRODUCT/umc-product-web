export interface CurriculumItem {
  week: number
  content: string | null
}

export interface PartData {
  id: string
  label: string
  requiredSkill?: string
  curriculum: Array<CurriculumItem>
}
