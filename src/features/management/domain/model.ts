/**
 * Management 도메인 모델
 * 학교, 리크루팅 관리 관련 타입
 */

import type { RoleType } from '@/shared/types'
import type { CommonPagingResponseDTO, CommonSearchParams } from '@/shared/types/api'
import type { ExternalLink } from '@/shared/types/link'
import type {
  EvaluationDocumentType,
  EvaluationFinalType,
  Workbook,
} from '@/shared/types/management'
import type { PartType } from '@/shared/types/part'

import type { MANAGE_SCHOOL_TABS, RECRUITING_STATE_CONFIG, SCHOOL_STATE_CONFIG } from './constants'

/** 학교 상태 타입 */
export type SchoolStateType = keyof typeof SCHOOL_STATE_CONFIG

/** 리크루팅 상태 타입 */
export type RecruitingType = keyof typeof RECRUITING_STATE_CONFIG

export type { ExternalLink, Workbook }
export type { EvaluationDocumentType, EvaluationFinalType }

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
  id: string
  universityId: string
  name: string
  state: SchoolStateType
}

/** 공지사항 */
export interface Notice {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  authorId: string
}

export type ManageSchoolTab = (typeof MANAGE_SCHOOL_TABS)[number]
export type ManageSchoolTabName = ManageSchoolTab['value']

export type Curriculum = {
  id: string
  part: PartType
  title: string
  workbooks: Array<Workbook>
}

export type PutCurriculumWorkbookItem = {
  id?: string | number
  weekNo: string | number
  title: string
  description: string
}

export type PutCurriculumsBody = {
  id?: string | number
  part: PartType
  title: string
  workbooks: Array<PutCurriculumWorkbookItem>
}

export type GisuType = {
  gisuId: string
  gisu: string
  isActive: boolean
  startAt: string
  endAt: string
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

export type GetGisuDetailParams = {
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
  memberId: string
  challengerId: string
  gisuId: string
  gisu: string
  part: PartType
  name: string
  nickname: string
  email: string
  schoolId: string
  schoolName: string
  profileImageLink: string
  roleTypes: Array<RoleType>
}

export type GetChallengerResponseDTO = {
  totalCount: string
  page: CommonPagingResponseDTO<ChallengerSearchItem>
}

export type ChallengerPoint = {
  id: string
  pointType: string
  point: string
  description: string
  createdAt: string
}

export type ChallengerDetailResponseDTO = {
  challengerId: string
  memberId: string
  gisuId: string
  gisu: string
  startAt?: string
  endAt?: string
  part: PartType
  challengerPoints: Array<ChallengerPoint>
  name: string
  nickname: string
  email: string
  schoolId: string
  schoolName: string
  profileImageLink: string | null
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'WITHDRAWN'
}

export type MemberProfileRole = {
  id: string
  challengerId: string
  roleType: RoleType
  organizationType: 'CENTRAL' | 'CHAPTER' | 'SCHOOL'
  organizationId: string | null
  responsiblePart: PartType | null
  gisuId: string
}

export type MemberProfileResponseDTO = {
  id: string
  name: string
  nickname: string
  email: string
  schoolId: string
  schoolName: string
  profileImageLink: string
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'WITHDRAWN'
  roles: Array<MemberProfileRole>
  challengerRecords: Array<ChallengerDetailResponseDTO>
}

export type PostChallengerDeactivateBody = {
  memberId: string
  deactivationType: 'WITHDRAW' | 'EXPEL'
  modifiedBy: string
  reason: string
}

export type PostChallengerRoleBody = {
  challengerId: string
  roleType: RoleType
  organizationId: string | null
  responsiblePart: PartType | null
  gisuId: string
}

export type PostChallengerRoleResponseDTO = {
  challengerRoleId: string
}

export type ChallengerRoleDetailResponseDTO = {
  challengerRoleId: string
  challengerId: string
  roleType: RoleType
  organizationType: 'CENTRAL' | 'CHAPTER' | 'SCHOOL'
  organizationId: string | null
  responsiblePart: PartType | null
  gisuId: string
  gisu: string
}
