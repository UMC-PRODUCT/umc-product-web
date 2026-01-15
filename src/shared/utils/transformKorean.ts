import type { QuestionType } from '../types/question'

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
    CLOSED: '모집 마감',
  }

  return mapping[input] || input
}

export const transformQuestionTypeKorean = (input: QuestionType): string => {
  const mapping: { [key: string]: string } = {
    SHORT_TEXT: '단답형',
    LONG_TEXT: '장문형',
    RADIO: '단일 선택',
    CHECKBOX: '복수 선택',
    PORTFOLIO: '파일 업로드',
    SCHEDULE: '면접 시간',
    PART: '희망 파트',
    DROPDOWN: '드롭다운',
  }

  return mapping[input] || input
}
