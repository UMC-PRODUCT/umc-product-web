import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

import ActorProfileModal from '@/features/management/components/modals/ActorProfileModal/ActorProfileModal'
import {
  AUDIT_LOG_DOMAIN_LABELS,
  AUDIT_LOG_DOMAINS,
  AUDIT_LOG_TABLE_HEADER_LABELS,
} from '@/features/management/domain/constants'
import type { AuditLogAction, AuditLogDomain } from '@/features/management/domain/model'
import { useGetAuditLogs } from '@/features/management/hooks/useManagementQueries'
import RetryIcon from '@/shared/assets/icons/retry.svg?react'
import { TabHeader, TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import FeedbackState from '@/shared/ui/common/FeedbackState/FeedbackState'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import LabelCalendar from '@/shared/ui/form/LabelCalendar/LabelCalendar'
import { formatDateTimeDot } from '@/shared/utils/date'

import * as S from './AuditLog.style'

const ALL_OPTION_ID = '0'
const PAGE_SIZE = 5

type AuditLogFilterState = {
  from: string
  to: string
  domain?: AuditLogDomain
  actorMemberId: string
}

const createInitialFilters = (): AuditLogFilterState => ({
  from: dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
  to: dayjs().format('YYYY-MM-DD'),
  domain: undefined,
  actorMemberId: '',
})

const domainOptions: Array<Option<string>> = [
  { label: '-- 전체 도메인 --', id: ALL_OPTION_ID },
  ...AUDIT_LOG_DOMAINS.map((domain) => ({
    label: AUDIT_LOG_DOMAIN_LABELS[domain],
    id: domain,
  })),
]

const resolveDomainLabel = (domain: string) =>
  Object.prototype.hasOwnProperty.call(AUDIT_LOG_DOMAIN_LABELS, domain)
    ? AUDIT_LOG_DOMAIN_LABELS[domain as keyof typeof AUDIT_LOG_DOMAIN_LABELS]
    : domain

const isMemberProfileId = (value: number | string | null | undefined) =>
  value != null && /^\d+$/.test(String(value).trim())

const isMemberTarget = (targetType: string | null | undefined) =>
  targetType?.trim().toLowerCase() === 'member'

const canOpenTargetMemberProfile = ({
  targetType,
  targetId,
  action,
}: {
  targetType: string | null | undefined
  targetId: string | null | undefined
  action: AuditLogAction
}) => isMemberTarget(targetType) && isMemberProfileId(targetId) && action !== 'WITHDRAW'

const resolveActionTone = (action: AuditLogAction) => {
  switch (action) {
    case 'CREATE':
    case 'REGISTER':
    case 'APPROVE':
      return 'lime' as const
    case 'DELETE':
    case 'WITHDRAW':
      return 'necessary' as const
    case 'REJECT':
      return 'caution' as const
    default:
      return 'gray' as const
  }
}

const AuditLog = () => {
  const [page, setPage] = useState(0)
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [draftFilters, setDraftFilters] = useState<AuditLogFilterState>(() =>
    createInitialFilters(),
  )
  const [filters, setFilters] = useState<AuditLogFilterState>(() => createInitialFilters())

  const selectedDomain = useMemo<Option<string> | undefined>(() => {
    if (!draftFilters.domain) return undefined
    return domainOptions.find((option) => String(option.id) === draftFilters.domain)
  }, [draftFilters.domain])

  const hasInvalidRange =
    Boolean(draftFilters.from) &&
    Boolean(draftFilters.to) &&
    dayjs(draftFilters.from).isAfter(dayjs(draftFilters.to), 'day')

  const queryParams = useMemo(
    () => ({
      page: String(page),
      size: String(PAGE_SIZE),
      sort: 'createdAt,desc',
      from: filters.from ? dayjs(filters.from).startOf('day').toISOString() : undefined,
      to: filters.to ? dayjs(filters.to).endOf('day').toISOString() : undefined,
      domain: filters.domain,
      actorMemberId: filters.actorMemberId.trim() || undefined,
    }),
    [filters.actorMemberId, filters.domain, filters.from, filters.to, page],
  )

  const { data, isLoading, isFetching, isError, refetch } = useGetAuditLogs(queryParams)
  const logs = data?.result.content ?? []

  const draftFromDate = draftFilters.from ? dayjs(draftFilters.from).toDate() : null
  const draftToDate = draftFilters.to ? dayjs(draftFilters.to).toDate() : null

  const handleFromDateChange = (date: Date) => {
    const nextFrom = dayjs(date).format('YYYY-MM-DD')

    setDraftFilters((prev) => {
      if (prev.to && dayjs(nextFrom).isAfter(dayjs(prev.to), 'day')) {
        return {
          ...prev,
          from: nextFrom,
          to: nextFrom,
        }
      }

      return {
        ...prev,
        from: nextFrom,
      }
    })
  }

  const handleToDateChange = (date: Date) => {
    setDraftFilters((prev) => ({
      ...prev,
      to: dayjs(date).format('YYYY-MM-DD'),
    }))
  }

  const handleSearch = () => {
    if (hasInvalidRange) return
    setPage(0)
    setFilters({ ...draftFilters })
  }

  const handleReset = () => {
    const nextFilters = createInitialFilters()
    setPage(0)
    setDraftFilters(nextFilters)
    setFilters(nextFilters)
  }

  return (
    <S.Container>
      <TabHeader alignItems="flex-start">
        <TabTitle>감사 로그 조회</TabTitle>
        <TabSubtitle>도메인, 기간, Actor ID 기준으로 감사 로그를 조회할 수 있습니다.</TabSubtitle>
      </TabHeader>

      <Section variant="solid" padding="18px 22px" css={{ gap: 14, height: 'fit-content' }}>
        <Flex flexWrap="wrap" alignItems="flex-end" gap={12}>
          <LabelCalendar
            id="audit-log-from"
            label="조회 시작일"
            placeholder="시작일 선택"
            necessary={false}
            value={draftFromDate}
            onChange={handleFromDateChange}
            allowPastDates
            wrapperCss={{ width: '220px', minWidth: '220px', minHeight: 'unset' }}
            css={{ height: '50px' }}
          />

          <LabelCalendar
            id="audit-log-to"
            label="조회 종료일"
            placeholder="종료일 선택"
            necessary={false}
            value={draftToDate}
            onChange={handleToDateChange}
            minDate={draftFromDate ?? undefined}
            allowPastDates
            wrapperCss={{ width: '220px', minWidth: '220px', minHeight: 'unset' }}
            css={{ height: '50px' }}
          />

          <S.FilterField>
            <S.FilterLabel htmlFor="audit-log-domain">도메인</S.FilterLabel>
            <Dropdown
              id="audit-log-domain"
              options={domainOptions}
              placeholder="전체 도메인"
              value={selectedDomain}
              onChange={(option) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  domain:
                    option.id === ALL_OPTION_ID ? undefined : (String(option.id) as AuditLogDomain),
                }))
              }
              css={{ width: '100%', minWidth: '180px', height: '50px' }}
              portal={false}
            />
          </S.FilterField>

          <S.FilterField>
            <S.FilterLabel htmlFor="audit-log-actor">Actor ID</S.FilterLabel>
            <S.TextInput
              id="audit-log-actor"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Actor ID 입력"
              value={draftFilters.actorMemberId}
              onChange={(event) =>
                setDraftFilters((prev) => ({
                  ...prev,
                  actorMemberId: event.target.value.replace(/\D/g, ''),
                }))
              }
            />
          </S.FilterField>

          <S.ActionGroup>
            <Button
              typo="B3.Sb"
              label="검색"
              tone="lime"
              onClick={handleSearch}
              disabled={hasInvalidRange}
              css={{ minWidth: '88px', width: '88px', height: '40px' }}
            />
            <Button
              typo="B3.Sb"
              label="초기화"
              variant="outline"
              tone="gray"
              onClick={handleReset}
              css={{ minWidth: '88px', width: '88px', height: '40px' }}
            />
          </S.ActionGroup>
        </Flex>
        {hasInvalidRange ? (
          <span css={{ color: theme.colors.necessary, ...theme.typography.C5.Rg }}>
            조회 시작일은 종료일보다 늦을 수 없습니다.
          </span>
        ) : null}
      </Section>

      <Flex justifyContent="space-between" alignItems="flex-end" gap={12} flexWrap="wrap">
        <Flex gap={10} alignItems="center" flexWrap="wrap" width="fit-content">
          <Flex gap={4} width="fit-content">
            <S.SummaryLabel>전체 로그</S.SummaryLabel>
            <S.SummaryValue>{data?.result.totalElements ?? 0}건</S.SummaryValue>
          </Flex>
          <Button
            typo="C4.Rg"
            label="새로고침"
            tone="gray"
            variant="outline"
            Icon={RetryIcon}
            iconSize={16}
            isLoading={isFetching}
            onClick={() => {
              void refetch()
            }}
            css={{ width: '112px', height: '34px', padding: '8px 12px' }}
          />
        </Flex>
        <S.SummaryMeta>
          {`${dayjs(filters.from).format('YYYY.MM.DD')} ~ ${dayjs(filters.to).format('YYYY.MM.DD')}`}
          {filters.domain ? ` · ${resolveDomainLabel(filters.domain)}` : ' · 전체 도메인'}
          {filters.actorMemberId ? ` · Actor ID ${filters.actorMemberId}` : ''}
        </S.SummaryMeta>
      </Flex>

      {isLoading ? (
        <Section variant="solid" padding="28px 24px" css={{ minHeight: '320px', gap: 0 }}>
          <FeedbackState mode="loading" loadingLabel="감사 로그를 불러오는 중입니다." />
        </Section>
      ) : isError ? (
        <Section variant="solid" padding="28px 24px" css={{ minHeight: '320px', gap: 0 }}>
          <FeedbackState
            mode="error"
            title="감사 로그를 불러오지 못했습니다."
            description="필터를 확인한 뒤 다시 시도해 주세요."
            onRetry={() => {
              void refetch()
            }}
          />
        </Section>
      ) : (
        <Table
          headerLabels={[...AUDIT_LOG_TABLE_HEADER_LABELS]}
          showFooter={true}
          label={isFetching ? '최신 로그를 불러오는 중입니다.' : undefined}
          count={{ totalAmounts: Number(data?.result.totalElements ?? 0), label: '로그' }}
          page={{
            currentPage: page + 1,
            totalPages: Math.max(Number(data?.result.totalPages ?? 1), 1),
            onChangePage: (nextPage) => setPage(nextPage - 1),
          }}
        >
          {logs.length > 0 ? (
            logs.map((log) => (
              <tr key={log.id}>
                <TableStyles.Td css={{ color: theme.colors.gray[300] }}>
                  {formatDateTimeDot(log.createdAt)}
                </TableStyles.Td>
                <TableStyles.Td>
                  <Badge tone="darkGray" variant="outline" typo="C5.Md">
                    {resolveDomainLabel(log.domain)}
                  </Badge>
                </TableStyles.Td>
                <TableStyles.Td>
                  <Badge tone={resolveActionTone(log.action)} variant="solid" typo="C5.Md">
                    {log.action}
                  </Badge>
                </TableStyles.Td>
                <TableStyles.Td>
                  {log.actorMemberId == null ? (
                    <span css={{ color: theme.colors.gray[400], ...theme.typography.C2.Sb }}>
                      -
                    </span>
                  ) : (
                    <S.MemberLinkButton
                      type="button"
                      onClick={() => setSelectedMemberId(String(log.actorMemberId))}
                      aria-label={`Actor ID ${log.actorMemberId} 회원 정보 보기`}
                    >
                      {log.actorMemberId}
                    </S.MemberLinkButton>
                  )}
                </TableStyles.Td>
                <TableStyles.Td css={{ whiteSpace: 'normal', minWidth: '90px' }}>
                  <S.TargetInfo>
                    <span>{log.targetType || '-'}</span>
                    {canOpenTargetMemberProfile(log) ? (
                      <S.MemberLinkButton
                        type="button"
                        onClick={() => setSelectedMemberId(log.targetId)}
                        aria-label={`대상 ID ${log.targetId} 회원 정보 보기`}
                      >
                        {log.targetId}
                      </S.MemberLinkButton>
                    ) : (
                      <span>{log.targetId || '-'}</span>
                    )}
                  </S.TargetInfo>
                </TableStyles.Td>
                <TableStyles.Td css={{ whiteSpace: 'normal', minWidth: '250px' }}>
                  <S.DescriptionText>{log.description || '-'}</S.DescriptionText>
                </TableStyles.Td>
                <TableStyles.Td css={{ whiteSpace: 'normal' }}>
                  <S.DescriptionText>{log.details || '-'}</S.DescriptionText>
                </TableStyles.Td>
                <TableStyles.Td css={{ color: theme.colors.gray[300] }}>
                  {log.ipAddress || '-'}
                </TableStyles.Td>
              </tr>
            ))
          ) : (
            <tr>
              <TableStyles.Td
                colSpan={8}
                css={{
                  textAlign: 'center',
                  color: theme.colors.gray[400],
                  padding: '48px 24px',
                }}
              >
                조건에 맞는 감사 로그가 없습니다.
              </TableStyles.Td>
            </tr>
          )}
        </Table>
      )}

      {selectedMemberId ? (
        <ActorProfileModal memberId={selectedMemberId} onClose={() => setSelectedMemberId(null)} />
      ) : null}
    </S.Container>
  )
}

export default AuditLog
