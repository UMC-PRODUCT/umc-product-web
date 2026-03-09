import { useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { getGisuChapterWithSchools } from '@/features/management/domain/api'
import type {
  ChallengerRecordCodeResponseDTO,
  ChallengerRecordRoleType,
  PostChallengerRecordCodeBody,
} from '@/features/management/domain/model'
import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import {
  fetchChallengerRecordByIdQuery,
  useGetAllGisu,
} from '@/features/management/hooks/useManagementQueries'
import Plus from '@/shared/assets/icons/plus.svg?react'
import Trash from '@/shared/assets/icons/trash.svg?react'
import { PART_LIST, PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'
import * as SharedStyles from '@/shared/styles/shared'
import type { Option } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { transformRoleKorean } from '@/shared/utils/transformKorean'

import * as S from './AccountCode.style'

type DraftFields = {
  chapterId?: string
  schoolId?: string
  part?: PartType
  memberName: string
  challengerRoleType?: ChallengerRecordRoleType
}

type BulkDraftRow = DraftFields & {
  id: string
}

type FeedbackState = {
  tone: 'success' | 'error'
  message: string
} | null

const RESULT_TABLE_HEADER_LABELS = ['코드', '이름', '학교 / 지부', '기수 / 파트', '역할', '']
const MAX_BULK_CODE_ROWS = 20
const MAX_DETAIL_FETCH_CONCURRENCY = 4

const CHALLENGER_RECORD_ROLE_OPTIONS: Array<ChallengerRecordRoleType> = [
  'CHALLENGER',
  'SUPER_ADMIN',
  'CENTRAL_PRESIDENT',
  'CENTRAL_VICE_PRESIDENT',
  'CENTRAL_OPERATING_TEAM_MEMBER',
  'CENTRAL_EDUCATION_TEAM_MEMBER',
  'CHAPTER_PRESIDENT',
  'SCHOOL_PRESIDENT',
  'SCHOOL_VICE_PRESIDENT',
  'SCHOOL_PART_LEADER',
  'SCHOOL_ETC_ADMIN',
]

let bulkRowSequence = 0

const createEmptyDraft = (): DraftFields => ({
  memberName: '',
})

const createBulkDraftRow = (): BulkDraftRow => ({
  id: `challenger-record-row-${bulkRowSequence++}`,
  ...createEmptyDraft(),
})

const createInitialBulkRows = () => [createBulkDraftRow()]

const hasAnyDraftValue = (draft: DraftFields) =>
  Boolean(
    draft.chapterId ||
    draft.schoolId ||
    draft.part ||
    draft.challengerRoleType ||
    draft.memberName.trim(),
  )

const isDraftComplete = (draft: DraftFields) =>
  Boolean(
    draft.chapterId &&
    draft.schoolId &&
    draft.part &&
    draft.challengerRoleType &&
    draft.memberName.trim(),
  )

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? fallback
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

const AccountCode = () => {
  const queryClient = useQueryClient()
  const [selectedGisuId, setSelectedGisuId] = useState<string>()
  const [bulkRows, setBulkRows] = useState<Array<BulkDraftRow>>(createInitialBulkRows)
  const [generatedCodes, setGeneratedCodes] = useState<Array<ChallengerRecordCodeResponseDTO>>([])
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const [isGisuPromptActive, setIsGisuPromptActive] = useState(false)
  const gisuDropdownRef = useRef<HTMLButtonElement>(null)
  const gisuPromptTimeoutRef = useRef<number | null>(null)

  const { data: allGisuData, isLoading: isGisuLoading } = useGetAllGisu()
  const { usePostChallengerRecordCode, usePostBulkChallengerRecordCode } = useManagementMutations()
  const { mutateAsync: createSingleCode, isPending: isCreatingSingleCode } =
    usePostChallengerRecordCode()
  const { mutateAsync: createBulkCode, isPending: isCreatingBulkCode } =
    usePostBulkChallengerRecordCode()

  const {
    data: gisuScopeData,
    isLoading: isScopeLoading,
    isError: isScopeError,
    error: scopeError,
    refetch: refetchScope,
  } = useCustomQuery(
    managementKeys.getGisuChapterWithSchools(selectedGisuId ?? ''),
    () => getGisuChapterWithSchools({ gisuId: selectedGisuId ?? '' }),
    { enabled: Boolean(selectedGisuId) },
  )

  const gisuOptions = useMemo<Array<Option<string>>>(
    () =>
      (allGisuData?.result.gisuList ?? []).map((gisu) => ({
        id: gisu.gisuId,
        label: `${gisu.gisu}기`,
      })),
    [allGisuData?.result.gisuList],
  )

  const selectedGisuOption = useMemo(
    () => gisuOptions.find((option) => String(option.id) === selectedGisuId),
    [gisuOptions, selectedGisuId],
  )

  const chapterOptions = useMemo<Array<Option<string>>>(
    () =>
      (gisuScopeData?.result.chapters ?? []).map((chapter) => ({
        id: chapter.chapterId,
        label: chapter.chapterName,
      })),
    [gisuScopeData?.result.chapters],
  )

  const schoolOptionsByChapter = useMemo(() => {
    const schoolsByChapter = new Map<string, Array<Option<string>>>()
    const mergedSchools = new Map<string, Option<string>>()

    ;(gisuScopeData?.result.chapters ?? []).forEach((chapter) => {
      const options = chapter.schools.map((school) => {
        const option = { id: school.schoolId, label: school.schoolName }
        mergedSchools.set(school.schoolId, option)
        return option
      })

      schoolsByChapter.set(chapter.chapterId, options)
    })

    return {
      schoolsByChapter,
      mergedSchoolOptions: Array.from(mergedSchools.values()),
    }
  }, [gisuScopeData?.result.chapters])

  const partOptions = useMemo<Array<Option<string>>>(
    () =>
      PART_LIST.map((part) => ({
        id: part,
        label: PART_TYPE_TO_SMALL_PART[part],
      })),
    [],
  )

  const roleOptions = useMemo<Array<Option<string>>>(
    () =>
      CHALLENGER_RECORD_ROLE_OPTIONS.map((roleType) => ({
        id: roleType,
        label: transformRoleKorean(roleType),
      })),
    [],
  )

  const getSchoolOptions = (chapterId?: string) =>
    chapterId
      ? (schoolOptionsByChapter.schoolsByChapter.get(chapterId) ?? [])
      : schoolOptionsByChapter.mergedSchoolOptions

  const resolveOption = (options: Array<Option<string>>, targetId?: string) =>
    targetId ? options.find((option) => String(option.id) === targetId) : undefined

  const buildPayload = (draft: DraftFields): PostChallengerRecordCodeBody => {
    const payload: PostChallengerRecordCodeBody = {
      gisuId: selectedGisuId ?? '',
      chapterId: draft.chapterId ?? '',
      schoolId: draft.schoolId ?? '',
      part: draft.part as PartType,
      memberName: draft.memberName.trim(),
    }

    if (draft.challengerRoleType && draft.challengerRoleType !== 'CHALLENGER') {
      payload.challengerRoleType = draft.challengerRoleType
    }

    return payload
  }

  const resetDrafts = () => {
    setBulkRows(createInitialBulkRows())
  }

  const fetchGeneratedCodeDetails = async (ids: Array<string | number>) => {
    const details = new Array<ChallengerRecordCodeResponseDTO | undefined>(ids.length)
    const failedIds: Array<string | number> = []
    let currentIndex = 0

    const workerCount = Math.min(MAX_DETAIL_FETCH_CONCURRENCY, ids.length)

    await Promise.all(
      Array.from({ length: workerCount }, async () => {
        while (currentIndex < ids.length) {
          const nextIndex = currentIndex
          currentIndex += 1

          try {
            const detail = await fetchChallengerRecordByIdQuery(queryClient, ids[nextIndex])
            details[nextIndex] = detail.result
          } catch {
            failedIds.push(ids[nextIndex])
          }
        }
      }),
    )

    return {
      details: details.filter(
        (detail): detail is ChallengerRecordCodeResponseDTO => detail !== undefined,
      ),
      failedIds,
    }
  }

  const clearGisuPromptTimer = () => {
    if (gisuPromptTimeoutRef.current !== null) {
      window.clearTimeout(gisuPromptTimeoutRef.current)
      gisuPromptTimeoutRef.current = null
    }
  }

  const triggerGisuPrompt = () => {
    if (isGisuLoading) return

    clearGisuPromptTimer()
    setIsGisuPromptActive(false)

    window.requestAnimationFrame(() => {
      setIsGisuPromptActive(true)
      gisuDropdownRef.current?.focus()
      gisuDropdownRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      gisuPromptTimeoutRef.current = window.setTimeout(() => {
        setIsGisuPromptActive(false)
        gisuPromptTimeoutRef.current = null
      }, 1400)
    })
  }

  const appendGeneratedCodes = (codes: Array<ChallengerRecordCodeResponseDTO>) => {
    setGeneratedCodes((prev) => [...codes, ...prev])
  }

  const handleSelectGisu = (option: Option<string>) => {
    clearGisuPromptTimer()
    setIsGisuPromptActive(false)
    setSelectedGisuId(String(option.id))
    setGeneratedCodes([])
    setFeedback(null)
    resetDrafts()
  }

  const handleChangeBulkRow = <TKey extends keyof DraftFields>(
    rowId: string,
    key: TKey,
    value: DraftFields[TKey],
  ) => {
    setBulkRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              [key]: value,
              ...(key === 'chapterId' ? { schoolId: undefined } : {}),
            }
          : row,
      ),
    )
  }

  const handleAddBulkRow = () => {
    if (bulkRows.length >= MAX_BULK_CODE_ROWS) {
      setFeedback({
        tone: 'error',
        message: `한 번에 최대 ${MAX_BULK_CODE_ROWS}건까지 발급할 수 있습니다.`,
      })
      return
    }

    setBulkRows((prev) => [...prev, createBulkDraftRow()])
  }

  const handleRemoveBulkRow = (rowId: string) => {
    setBulkRows((prev) => {
      if (prev.length === 1) {
        return [createBulkDraftRow()]
      }

      return prev.filter((row) => row.id !== rowId)
    })
  }

  const handleResetBulkRows = () => {
    setBulkRows(createInitialBulkRows())
    setFeedback(null)
  }

  const handleCopy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setFeedback({ tone: 'success', message })
    } catch {
      setFeedback({ tone: 'error', message: '코드 복사에 실패했습니다. 다시 시도해 주세요.' })
    }
  }

  const handleSubmitCodes = async () => {
    if (!selectedGisuId) {
      setFeedback({ tone: 'error', message: '기수를 먼저 선택해 주세요.' })
      return
    }

    const normalizedRows = bulkRows
      .map((row) => ({
        ...row,
        memberName: row.memberName.trim(),
      }))
      .filter(hasAnyDraftValue)

    if (normalizedRows.length === 0) {
      setFeedback({ tone: 'error', message: '생성할 행을 하나 이상 입력해 주세요.' })
      return
    }

    const invalidRowIndex = normalizedRows.findIndex((row) => !isDraftComplete(row))
    if (invalidRowIndex >= 0) {
      setFeedback({
        tone: 'error',
        message: `${invalidRowIndex + 1}번째 행의 항목을 모두 입력해 주세요.`,
      })
      return
    }

    if (normalizedRows.length > MAX_BULK_CODE_ROWS) {
      setFeedback({
        tone: 'error',
        message: `한 번에 최대 ${MAX_BULK_CODE_ROWS}건까지 발급할 수 있습니다.`,
      })
      return
    }

    try {
      if (normalizedRows.length === 1) {
        const response = await createSingleCode(buildPayload(normalizedRows[0]))
        appendGeneratedCodes([response.result])
        setFeedback({
          tone: 'success',
          message: `${response.result.memberName}의 코드 ${response.result.code}를 발급했습니다.`,
        })
      } else {
        const response = await createBulkCode(normalizedRows.map(buildPayload))
        const { details, failedIds } = await fetchGeneratedCodeDetails(response.result)

        if (details.length > 0) {
          appendGeneratedCodes(details)
        }

        if (failedIds.length > 0) {
          setFeedback({
            tone: 'error',
            message:
              details.length > 0
                ? `${response.result.length}건을 발급했고, ${failedIds.length}건의 상세 조회에 실패했습니다. 잠시 후 다시 확인해 주세요.`
                : '코드는 발급되었지만 상세 조회에 실패했습니다. 잠시 후 다시 시도해 주세요.',
          })
        } else {
          setFeedback({
            tone: 'success',
            message: `${response.result.length}건의 챌린저 기록 코드를 발급했습니다.`,
          })
        }
      }

      setBulkRows(createInitialBulkRows())
    } catch (error) {
      setFeedback({
        tone: 'error',
        message: getErrorMessage(error, '코드 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.'),
      })
    }
  }

  const copyAllCodesText = generatedCodes
    .map((code) => `${code.memberName},${code.code}`)
    .join('\n')

  const isSubmitting = isCreatingSingleCode || isCreatingBulkCode
  const isFormDisabled = !selectedGisuId || isScopeLoading || isScopeError
  const shouldGuardScopedDropdowns = !selectedGisuId && !isGisuLoading
  const scopeErrorMessage =
    selectedGisuId && isScopeError
      ? getErrorMessage(scopeError, '기수 범위 정보를 불러오지 못했습니다. 다시 시도해 주세요.')
      : null

  useEffect(
    () => () => {
      if (gisuPromptTimeoutRef.current !== null) {
        window.clearTimeout(gisuPromptTimeoutRef.current)
      }
    },
    [],
  )

  return (
    <SharedStyles.AccountContent alignItems="stretch">
      <SharedStyles.TabTitle>과거 챌린저 기록 코드 발급</SharedStyles.TabTitle>
      <SharedStyles.TabSubtitle>챌린저의 코드를 일괄 발급할 수 있습니다.</SharedStyles.TabSubtitle>
      <S.Container alignItems="flex-start">
        <S.GisuSelector>
          <S.GisuDropdownFrame $isHighlighted={isGisuPromptActive}>
            <Dropdown
              ref={gisuDropdownRef}
              options={gisuOptions}
              placeholder="기수를 선택해 주세요"
              value={selectedGisuOption}
              disabled={isGisuLoading}
              onChange={handleSelectGisu}
              css={{ width: '300px' }}
            />
          </S.GisuDropdownFrame>
          <S.GisuGuideText $isHighlighted={isGisuPromptActive} role="status" aria-live="polite">
            {isGisuPromptActive
              ? '기수를 먼저 선택해 주세요.'
              : '기수를 선택하면 아래 기록 항목을 입력할 수 있어요.'}
          </S.GisuGuideText>
        </S.GisuSelector>
        {scopeErrorMessage && (
          <S.ScopeErrorActions alignItems="stretch" gap={10}>
            <S.StatusBanner $tone="error">{scopeErrorMessage}</S.StatusBanner>
            <Button
              label="다시 불러오기"
              tone="gray"
              variant="outline"
              onClick={() => void refetchScope()}
              css={{ width: '136px', height: '41px' }}
            />
          </S.ScopeErrorActions>
        )}
        {feedback && <S.StatusBanner $tone={feedback.tone}>{feedback.message}</S.StatusBanner>}

        <Section variant="solid" padding="20px" gap={20}>
          <S.SectionHeader>
            <S.SectionTitleWrap alignItems="flex-start">
              <S.SectionTitle>코드 생성</S.SectionTitle>
              <S.SectionDescription>
                기본은 1행부터 시작하며, 한 번에 최대 {MAX_BULK_CODE_ROWS}건까지 같은 화면에서 연속
                발급할 수 있습니다.
              </S.SectionDescription>
            </S.SectionTitleWrap>

            <S.Actions width={'fit-content'}>
              <Button
                label="행 추가"
                tone="gray"
                variant="outline"
                Icon={Plus}
                onClick={handleAddBulkRow}
                disabled={isSubmitting || bulkRows.length >= MAX_BULK_CODE_ROWS}
                css={{ width: '108px', height: '41px' }}
              />
              <Button
                label="행 비우기"
                tone="gray"
                variant="outline"
                onClick={handleResetBulkRows}
                disabled={isSubmitting}
                css={{ width: '108px', height: '41px' }}
              />
              <Button
                label="코드 생성"
                tone="lime"
                onClick={handleSubmitCodes}
                isLoading={isSubmitting}
                disabled={isFormDisabled}
                css={{ width: '132px', height: '41px' }}
              />
            </S.Actions>
          </S.SectionHeader>

          <S.RowList>
            {bulkRows.map((row, index) => {
              const schoolOptions = getSchoolOptions(row.chapterId)

              return (
                <S.RowCard key={row.id}>
                  <S.RowHeader>
                    <S.RowIndex>
                      <S.RowBadge>{index + 1}</S.RowBadge>
                      <span>{row.memberName.trim() || '새 기록'}</span>
                    </S.RowIndex>

                    <Flex alignItems="center" gap={10} width={'fit-content'}>
                      <S.RowMeta>
                        {row.part ? PART_TYPE_TO_SMALL_PART[row.part] : '파트 미선택'}
                      </S.RowMeta>
                      <Button
                        tone="gray"
                        variant="outline"
                        Icon={Trash}
                        aria-label={`${index + 1}번째 행 삭제`}
                        onClick={() => handleRemoveBulkRow(row.id)}
                        disabled={isSubmitting}
                        css={{ width: '41px', height: '41px', padding: 0 }}
                      />
                    </Flex>
                  </S.RowHeader>

                  <S.FormGrid>
                    <S.Field>
                      <S.FieldLabel>지부</S.FieldLabel>
                      <S.ControlShell
                        $isBlocked={shouldGuardScopedDropdowns}
                        onClick={shouldGuardScopedDropdowns ? triggerGisuPrompt : undefined}
                      >
                        <Dropdown
                          options={chapterOptions}
                          placeholder="지부 선택"
                          value={resolveOption(chapterOptions, row.chapterId)}
                          disabled={isFormDisabled}
                          onChange={(option) =>
                            handleChangeBulkRow(row.id, 'chapterId', String(option.id))
                          }
                          css={{ width: '100%', maxWidth: '100%' }}
                        />
                      </S.ControlShell>
                    </S.Field>

                    <S.Field>
                      <S.FieldLabel>학교</S.FieldLabel>
                      <S.ControlShell
                        $isBlocked={shouldGuardScopedDropdowns}
                        onClick={shouldGuardScopedDropdowns ? triggerGisuPrompt : undefined}
                      >
                        <Dropdown
                          options={schoolOptions}
                          placeholder="학교 선택"
                          value={resolveOption(schoolOptions, row.schoolId)}
                          disabled={isFormDisabled}
                          onChange={(option) =>
                            handleChangeBulkRow(row.id, 'schoolId', String(option.id))
                          }
                          css={{ width: '100%', maxWidth: '100%' }}
                        />
                      </S.ControlShell>
                    </S.Field>

                    <S.Field>
                      <S.FieldLabel>파트</S.FieldLabel>
                      <S.ControlShell
                        $isBlocked={shouldGuardScopedDropdowns}
                        onClick={shouldGuardScopedDropdowns ? triggerGisuPrompt : undefined}
                      >
                        <Dropdown
                          options={partOptions}
                          placeholder="파트 선택"
                          value={resolveOption(partOptions, row.part)}
                          disabled={isFormDisabled}
                          onChange={(option) =>
                            handleChangeBulkRow(row.id, 'part', option.id as PartType)
                          }
                          css={{ width: '100%', maxWidth: '100%' }}
                        />
                      </S.ControlShell>
                    </S.Field>

                    <S.Field>
                      <S.FieldLabel>역할</S.FieldLabel>
                      <S.ControlShell
                        $isBlocked={shouldGuardScopedDropdowns}
                        onClick={shouldGuardScopedDropdowns ? triggerGisuPrompt : undefined}
                      >
                        <Dropdown
                          options={roleOptions}
                          placeholder="역할 선택"
                          value={resolveOption(roleOptions, row.challengerRoleType)}
                          disabled={isFormDisabled}
                          onChange={(option) =>
                            handleChangeBulkRow(
                              row.id,
                              'challengerRoleType',
                              option.id as ChallengerRecordRoleType,
                            )
                          }
                          css={{ width: '100%', maxWidth: '100%' }}
                        />
                      </S.ControlShell>
                    </S.Field>

                    <S.Field>
                      <S.FieldLabel>이름</S.FieldLabel>
                      <S.Input
                        value={row.memberName}
                        onChange={(event) =>
                          handleChangeBulkRow(row.id, 'memberName', event.target.value)
                        }
                        placeholder="이름 입력"
                        disabled={isFormDisabled}
                      />
                    </S.Field>
                  </S.FormGrid>
                </S.RowCard>
              )
            })}
          </S.RowList>
        </Section>

        <Section variant="solid" padding="20px" gap={20}>
          <S.SectionHeader>
            <S.SectionTitleWrap alignItems="flex-start">
              <S.SectionTitle>발급 결과</S.SectionTitle>
              <S.SectionDescription>
                현재 세션에서 생성한 코드를 확인하고 바로 복사할 수 있습니다.
              </S.SectionDescription>
            </S.SectionTitleWrap>

            {generatedCodes.length > 0 && (
              <S.Actions width={'fit-content'}>
                <Button
                  label="전체 복사"
                  tone="gray"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      copyAllCodesText,
                      `${generatedCodes.length}건의 코드를 복사했습니다.`,
                    )
                  }
                  css={{ width: '108px', height: '41px' }}
                />
              </S.Actions>
            )}
          </S.SectionHeader>

          {generatedCodes.length === 0 ? (
            <S.EmptyState>
              <S.EmptyTitle>아직 발급된 코드가 없습니다.</S.EmptyTitle>
              <S.EmptyDescription>
                코드를 생성하면 여기에서 발급 결과를 바로 확인할 수 있습니다.
              </S.EmptyDescription>
            </S.EmptyState>
          ) : (
            <Table
              headerLabels={RESULT_TABLE_HEADER_LABELS}
              rows={generatedCodes}
              getRowId={(item) => item.code}
              count={{ totalAmounts: generatedCodes.length, label: '코드' }}
              renderRow={(item) => (
                <>
                  <TableStyles.Td>
                    <S.CodeChip>{item.code}</S.CodeChip>
                  </TableStyles.Td>
                  <TableStyles.Td>{item.memberName}</TableStyles.Td>
                  <TableStyles.Td css={{ whiteSpace: 'normal' }}>
                    <Flex flexDirection="column" gap={2} alignItems="flex-start">
                      <S.MetaText>{item.schoolName}</S.MetaText>
                      <S.MetaSubText>{item.chapterName}</S.MetaSubText>
                    </Flex>
                  </TableStyles.Td>
                  <TableStyles.Td css={{ whiteSpace: 'normal' }}>
                    <Flex flexDirection="column" gap={2} alignItems="flex-start">
                      <S.MetaText>{item.gisu}기</S.MetaText>
                      <S.MetaSubText>{PART_TYPE_TO_SMALL_PART[item.part]}</S.MetaSubText>
                    </Flex>
                  </TableStyles.Td>
                  <TableStyles.Td>
                    {item.challengerRoleType
                      ? transformRoleKorean(item.challengerRoleType)
                      : '챌린저'}
                  </TableStyles.Td>
                  <TableStyles.Td>
                    <Button
                      label="복사"
                      tone="gray"
                      variant="outline"
                      onClick={() =>
                        handleCopy(item.code, `${item.memberName}의 코드를 복사했습니다.`)
                      }
                      css={{ width: '72px', height: '32px', padding: '8px 12px' }}
                    />
                  </TableStyles.Td>
                </>
              )}
            />
          )}
        </Section>
      </S.Container>
    </SharedStyles.AccountContent>
  )
}

export default AccountCode
