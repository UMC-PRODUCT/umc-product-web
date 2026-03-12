import { describe, expect, it } from 'vitest'

import { managementKeys } from '@/shared/queryKeys'

describe('management 쿼리 키 스모크 테스트', () => {
  it('광역 무효화용 management 베이스 키를 생성한다', () => {
    expect(managementKeys.base[0]).toBe('management')
    expect(managementKeys.getAuditLogsBase).toEqual(['management', 'auditLogs'])
    expect(managementKeys.getGisuListBase).toEqual(['management', 'gisuList'])
    expect(managementKeys.getSchoolsPagingBase).toEqual(['management', 'schoolsPaging'])
    expect(managementKeys.getChallengerBase).toEqual(['management', 'challenger'])
  })

  it('감사 로그 조회 키에 필터 파라미터를 포함한다', () => {
    const defaultKey = managementKeys.getAuditLogs({
      page: '0',
      size: '20',
      sort: 'createdAt,desc',
    })
    const filteredKey = managementKeys.getAuditLogs({
      page: '0',
      size: '20',
      sort: 'createdAt,desc',
      domain: 'AUDIT_LOG',
      actorMemberId: '42',
    })

    expect(defaultKey.at(-1)).toEqual({
      page: '0',
      size: '20',
      sort: 'createdAt,desc',
    })
    expect(filteredKey.at(-1)).toEqual({
      page: '0',
      size: '20',
      sort: 'createdAt,desc',
      domain: 'AUDIT_LOG',
      actorMemberId: '42',
    })
    expect(filteredKey).not.toEqual(defaultKey)
  })
})
