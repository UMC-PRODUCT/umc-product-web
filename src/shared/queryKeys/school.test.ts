import { describe, expect, it } from 'vitest'

import { schoolKeys } from '@/shared/queryKeys'

describe('school 쿼리 키 스모크 테스트', () => {
  it('무효화에 사용할 school 베이스 키를 노출한다', () => {
    expect(schoolKeys.base[0]).toBe('school')
    expect(schoolKeys.evaluation.document.getSelectionsBase).toEqual([
      'school',
      'documents',
      'selections',
    ])
    expect(schoolKeys.evaluation.finalSelection.getBase).toEqual(['school', 'finalSelections'])
  })

  it('모집 ID 기준으로 서류 평가 지원자 쿼리 키를 판별한다', () => {
    const queryKey = schoolKeys.evaluation.document.getApplicants('101', {
      page: '0',
      size: '20',
      part: 'ALL',
    })
    expect(schoolKeys.evaluation.document.isApplicantsQueryForRecruitment(queryKey, '101')).toBe(
      true,
    )
    expect(schoolKeys.evaluation.document.isApplicantsQueryForRecruitment(queryKey, '102')).toBe(
      false,
    )
  })
})
