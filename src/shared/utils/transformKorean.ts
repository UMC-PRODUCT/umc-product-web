import type { QuestionType } from '@features/apply/domain'

import type { UserApplicationBadgeType } from '@/features/dashboard/domain/types'
import type { RECRUITING_SCHEDULE_TYPE } from '@/features/recruiting/domain'

export const transformStateKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    ACTIVE: '활성',
    INACTIVE: '비활성',
    PENDING: '대기',
  }

  return mapping[input] || input
}

export const transformRoleKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    ADMIN: '관리자',
    MANAGER: '매니저',
    USER: '일반 사용자',
    CHALLENGER: '챌린저',
  }

  return mapping[input] || input
}

export const transformRecruitingKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    PREVIOUS: '지난 모집',
    NOW: '제출 완료',
  }

  return mapping[input] || input
}

export const transformResumeStatusKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    OPEN: '모집 중',
    CLOSED: '모집 없음',
  }

  return mapping[input] || input
}

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

// TODO: enum 체크 필요
export const transformNextRecruitmentMonthKorean = (input: string): string => {
  const mapping: { [key: string]: string } = {
    APPLY_DEADLINE: '지원 마감일: ',
    RECRUITMENT_NOTICE: '모집 공고일: ',
  }

  return mapping[input] || input
}

export const transformUserRecruitmentBadgeToKorean = (input: UserApplicationBadgeType): string => {
  const mapping: { [key: string]: string } = {
    DRAFT: '임시 저장',
    SUBMITTED: '제출 완료',
    PREVIOUS: '지난 모집',
  }

  return mapping[input] || input
}
