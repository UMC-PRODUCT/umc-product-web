/**
 * Management 도메인 모델
 * 학교, 리크루팅 관리 관련 타입
 */

import type { PartType } from '@/features/auth/domain'
import type { LinkType } from '@/shared/constants/umc'
import type { Option } from '@/shared/types/form'

import type {
  EVALUATION_DOCUMENT_CONFIG,
  EVALUATION_FINAL_CONFIG,
  MANAGE_SCHOOL_TABS,
  RECRUITING_STATE_CONFIG,
  SCHOOL_STATE_CONFIG,
} from './constants'

/** 학교 상태 타입 */
export type SchoolStateType = keyof typeof SCHOOL_STATE_CONFIG

/** 리크루팅 상태 타입 */
export type RecruitingType = keyof typeof RECRUITING_STATE_CONFIG

/** 서류 평가 단계 타입 */
export type EvaluationDocumentType =
  (typeof EVALUATION_DOCUMENT_CONFIG)[keyof typeof EVALUATION_DOCUMENT_CONFIG]['label']

/** 면접 평가 단계 타입 */
export type EvaluationFinalType =
  (typeof EVALUATION_FINAL_CONFIG)[keyof typeof EVALUATION_FINAL_CONFIG]['label']

/** 대학교 정보 */
export interface University {
  schoolId: string
  schoolName: string
  chapterId: string | null
  createdAt: string
  isActive: boolean
}

export interface UniversitySimple {
  schoolId: string
  schoolName: string
}

/** 대학교 지부 정보 */
export interface UniversityBranch {
  id: number
  universityId: number
  name: string
  state: SchoolStateType
}

/** 리크루팅 정보 */
export interface Recruiting {
  id: number
  universityId: number
  generation: number
  state: RecruitingType
  startDate: string
  endDate: string
  documentEvaluation: EvaluationDocumentType
  finalEvaluation: EvaluationFinalType
}

/** 공지사항 */
export interface Notice {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  authorId: number
}

export type ManageSchoolTab = (typeof MANAGE_SCHOOL_TABS)[number]
export type ManageSchoolTabName = ManageSchoolTab['value']

export type Curriculum = {
  id: string
  part: PartType
  title: string
  workbooks: Array<Workbook>
}

export type Workbook = {
  id: string
  title: string
  weekNo: string
  description: string
  workbookUrl: string
  startDate: string
  endDate: string
  missionType: string
  releasedAt: string
  isReleased: boolean
}

export type LinkTypeOption = Option<LinkType>
export type LinkItem = {
  title: string
  url: string
  type?: LinkTypeOption | null
}

export type GisuType = {
  gisuId: string
  generation: string
  isActive: boolean
}

export type UniversityFullType = University & {
  chapterId: string | null
  chapterName: string | null
  remark: string | null
  kakaoLink: string | null
  instagramLink: string | null
  youtubeLink: string | null
  createdAt: string
  updatedAt: string
}
export type ChapterType = {
  chapterId: string
  chapterName: string
  schools: Array<UniversitySimple>
}

export type ChapterMiniType = {
  id: string
  name: string
}
