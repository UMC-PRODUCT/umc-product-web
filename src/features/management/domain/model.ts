/**
 * Management 도메인 모델
 * 학교, 리크루팅 관리 관련 타입
 */

import type { PartType } from '@/features/auth/domain'
import type { LinkType } from '@/shared/constants/umc'
import type { RoleType } from '@/shared/types'
import type { CommonPagingResponseDTO, CommonSearchParams } from '@/shared/types/api'

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
  chapterName: string | null
  logoImageUrl: string | null
  remark: string | null
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

export type GisuType = {
  gisuId: string
  generation: string
  isActive: boolean
}

export type UniversityFullType = University & {
  chapterId: string | null
  chapterName: string | null
  remark: string | null
  links: Array<ExternalLink>
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

export interface Branch {
  id: string
  name: string
  schools: Array<UniversitySimple>
}

export type ExternalLink = {
  title: string
  type: LinkType
  url: string
}

export type GetRecruitmentsApplication = {
  filters: {
    chapterId?: string
    schoolId?: string
    part?: PartType | 'ALL'
    keyword?: string
  }
  applications: CommonPagingResponseDTO<CandidateType>
}

export type CandidateType = {
  applicationId: string
  applicant: {
    nickname: string
    name: string
  }
  school: {
    schoolId: string
    name: string
  }
  appliedParts: Array<{
    priority: string
    part: {
      key: PartType | 'COMMON'
      label: string
    }
  }>
  finalResult: {
    status: string
    selectedPart: {
      key: PartType | 'COMMON'
      label: string
    }
  }
}

export type GetCurriculumsParams = {
  part: PartType
}

export type GetSchoolsPagingParams = CommonSearchParams & {
  sort?: 'asc' | 'desc'
  chapterId?: string
  keyword?: string
}

export type ChaptersResponseDTO = {
  chapters: Array<ChapterMiniType>
}

export type SchoolsResponseDTO = {
  schools: Array<UniversitySimple>
}

export type GetUnassignedSchoolsParams = {
  gisuId: string
}

export type AllGisuResponseDTO = {
  gisuList: Array<GisuType>
}

export type GetSchoolDetailsParams = {
  schoolId: string
}

export type GetGisuChapterWithSchoolsParams = {
  gisuId: string
}

export type GisuChapterWithSchoolsResponseDTO = {
  chapters: Array<ChapterType>
}

export type PostSchoolBody = {
  schoolName: string
  remark?: string
  logoImageId?: string
  links: Array<ExternalLink>
}

export type PostGisuBody = {
  number: string
  startAt: string
  endAt: string
}

export type PostChapterBody = {
  gisuId: string
  name: string
  schoolIds?: Array<string>
}

export type PatchSchoolBody = {
  schoolName?: string
  remark?: string
  logoImageId?: string
  links?: Array<ExternalLink> | null
}

export type PatchSchoolUnassignBody = {
  gisuId: string
}

export type PatchSchoolAssignBody = {
  chapterId: string
}

export type GetRecruitementsApplicationsParams = CommonSearchParams & {
  chapterId?: string
  schoolId?: string
  part?: PartType | 'ALL'
  keyword?: string
}

export type GetChallengerParams = CommonSearchParams & {
  sort?: Array<string>
  keyword?: string
  schoolId?: string
  chapterId?: string
  part?: PartType
  gisuId?: string
}

export type ChallengerSearchItem = {
  memberId: number
  challengerId: number
  gisuId: number
  gisu: number
  part: PartType
  name: string
  nickname: string
  email: string
  schoolId: number
  schoolName: string
  profileImageLink: string
  roleTypes: Array<RoleType>
}

export type GetChallengerResponseDTO = {
  totalCount: number
  page: CommonPagingResponseDTO<ChallengerSearchItem>
}

export type ChallengerPoint = {
  id: number
  pointType: string
  point: number
  description: string
  createdAt: string
}

export type ChallengerDetailResponseDTO = {
  challengerId: number
  memberId: number
  gisu: number
  part: PartType
  challengerPoints: Array<ChallengerPoint>
  name: string
  nickname: string
  email: string
  schoolId: number
  schoolName: string
  profileImageLink: string
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'WITHDRAWN'
}

export type PostChallengerDeactivateBody = {
  memberId: number
  deactivationType: 'WITHDRAW' | 'EXPEL'
  modifiedBy: number
  reason: string
}

export type PostChallengerRoleBody = {
  challengerId: number
  roleType: RoleType
  organizationId: number | null
  responsiblePart: PartType | null
  gisuId: number
}

export type PostChallengerRoleResponseDTO = {
  challengerRoleId: number
}

export type ChallengerRoleDetailResponseDTO = {
  challengerRoleId: number
  challengerId: number
  roleType: RoleType
  organizationType: 'CENTRAL' | 'CHAPTER' | 'SCHOOL'
  organizationId: number | null
  responsiblePart: PartType | null
  gisuId: number
  gisu: number
}
