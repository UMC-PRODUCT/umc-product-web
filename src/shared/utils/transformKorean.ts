import type { PartType } from '@/features/auth/domain'
import type { RECRUITING_SCHEDULE_TYPE, UserApplicationBadgeType } from '@/shared/constants/umc'
import type { QuestionType } from '@/shared/types/apply'

import { PART_TYPE_TO_SMALL_PART } from '../constants/part'
import type { PartSmallType } from '../types/part'
import type { EvaluationStatusType } from '../types/umc'

/**
 * 계정 상태 코드를 한글 라벨로 변환함
 * @param input - 계정 상태 코드 문자열
 * @returns 한글 상태 라벨, 매핑이 없으면 원본 문자열
 */
export const transformStateKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    ACTIVE: '활성',
    INACTIVE: '비활성',
    PENDING: '대기',
  }

  return mapping[input] || input
}

/**
 * 역할 코드를 한글 라벨로 변환함
 * @param input - 역할 코드 문자열
 * @returns 한글 역할 라벨, 매핑이 없으면 '일반 유저'
 */
export const transformRoleKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    CHALLENGER: '챌린저',
    SUPER_ADMIN: '프로덕트 팀',
    CENTRAL_PRESIDENT: '총괄',
    CENTRAL_VICE_PRESIDENT: '부총괄',
    CENTRAL_OPERATING_TEAM_MEMBER: '중앙 운영국원',
    CENTRAL_EDUCATION_TEAM_MEMBER: '중앙 교육국원',
    CHAPTER_PRESIDENT: '지부장',
    SCHOOL_PRESIDENT: '학교 회장',
    SCHOOL_VICE_PRESIDENT: '학교 부회장',
    SCHOOL_PART_LEADER: '학교 파트장',
    SCHOOL_ETC_ADMIN: '학교 기타 운영진',
  }

  return mapping[input] || '일반 유저'
}

/**
 * 파트 타입을 축약 한글 파트명으로 변환함
 * @param input - 파트 타입
 * @returns 축약 파트명
 */
export const transformPart = (input: PartType): PartSmallType => {
  const mapping = PART_TYPE_TO_SMALL_PART[input]
  return mapping
}

/**
 * 모집 구분 코드를 한글 라벨로 변환함
 * @param input - 모집 구분 코드
 * @returns 한글 모집 구분 라벨, 매핑이 없으면 원본 문자열
 */
export const transformRecruitingKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    PREVIOUS: '지난 모집',
    NOW: '제출 완료',
  }

  return mapping[input] || input
}

/**
 * 모집 상태 코드를 한글 라벨로 변환함
 * @param input - 모집 상태 코드
 * @returns 한글 모집 상태 라벨, 매핑이 없으면 원본 문자열
 */
export const transformResumeStatusKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    OPEN: '모집 중',
    CLOSED: '모집 없음',
  }

  return mapping[input] || input
}

/**
 * 질문 타입 코드를 한글 라벨로 변환함
 * @param input - 질문 타입 코드
 * @returns 한글 질문 타입 라벨, 매핑이 없으면 원본 문자열
 */
export const transformQuestionTypeKorean = (input: QuestionType | 'PREFERRED_PART'): string => {
  const mapping: { [key: string]: string } = {
    SHORT_TEXT: '단답형',
    LONG_TEXT: '장문형',
    RADIO: '단일 선택',
    CHECKBOX: '복수 선택',
    PORTFOLIO: '파일 업로드',
    SCHEDULE: '면접 시간',
    PART: '희망 파트',
    PREFERRED_PART: '희망 파트',
    DROPDOWN: '드롭다운',
  }

  return mapping[input] || input
}

/**
 * 지원 상태 코드를 한글 라벨로 변환함
 * @param input - 지원 상태 코드
 * @returns 한글 지원 상태 라벨, 매핑이 없으면 원본 문자열
 */
export const transformApplicationStatusKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    DRAFT: '임시 저장',
    NONE: '미제출',
    SUBMITTED: '제출 완료',
    REVIEWING: '서류 심사 중',
    DOCUMENT_PASSED: '서류 합격',
    DOCUMENT_FAILED: '서류 불합격',
    INTERVIEW_SCHEDULED: '면접 일정 안내',
    INTERVIEW_PASSED: '면접 합격',
    INTERVIEW_FAILED: '면접 불합격',
    FINAL_PASSED: '최종 합격',
    FINAL_FAILED: '최종 불합격',
  }

  return mapping[input] || input
}

/**
 * 모집 일정 타입 코드를 한글 라벨로 변환함
 * @param input - 모집 일정 타입 코드
 * @returns 한글 모집 일정 라벨, 매핑이 없으면 원본 문자열
 */
export const transformRecruitingScheduleTypeKorean = (input: RECRUITING_SCHEDULE_TYPE): string => {
  const mapping: { [key: string]: string } = {
    APPLY_WINDOW: '서류 지원 기간',
    DOC_REVIEW_WINDOW: '서류 심사 기간',
    DOC_RESULT_AT: '서류 결과 발표일',
    INTERVIEW_WINDOW: '면접 기간',
    FINAL_REVIEW_WINDOW: '최종 심사 기간',
    FINAL_RESULT_AT: '최종 결과 발표일',
  }

  return mapping[input] || input
}

/**
 * 다음 모집 안내 문구 코드를 한글 문구로 변환함
 * @param input - 다음 모집 안내 코드
 * @returns 한글 안내 문구, 매핑이 없으면 원본 문자열
 */
export const transformNextRecruitmentMonthKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    APPLY_START_ANNOUNCE: '지원 시작 예정일: ',
    APPLY_DEADLINE: '지원 마감 예정일: ',
    DOC_RESULT_ANNOUNCE: '서류 합불 발표 예정일: ',
    FINAL_RESULT_ANNOUNCE: '최종 합불 발표 예정일: ',
    NEXT_RECRUITMENT_EXPECTED: '다음 모집 예정일: ',
    CHALLENDGER_NOTICE_IN_APP: '합격을 축하드립니다. UMC 앱에서 확인하세요!',
  }

  return mapping[input] || input
}

/**
 * 사용자 지원 배지 코드를 한글 라벨로 변환함
 * @param input - 사용자 지원 배지 코드
 * @returns 한글 배지 라벨, 매핑이 없으면 원본 문자열
 */
export const transformUserRecruitmentBadgeToKorean = (input: UserApplicationBadgeType): string => {
  const mapping: { [key: string]: string } = {
    DRAFT: '임시 저장',
    SUBMITTED: '제출 완료',
    PAST: '지난 모집',
  }

  return mapping[input] || input
}

/**
 * 평가 상태 코드를 한글 라벨로 변환함
 * @param input - 평가 상태 코드
 * @returns 한글 평가 상태 라벨, 매핑이 없으면 원본 문자열
 */
export const transformEvaluationStatusTypeKorean = (input: EvaluationStatusType): string => {
  const mapping: { [key: string]: string } = {
    NOT_STARTED: '평가 전',
    IN_PROGRESS: '평가 중',
    COMPLETED: '평가 완료',
  }

  return mapping[input] || input
}
