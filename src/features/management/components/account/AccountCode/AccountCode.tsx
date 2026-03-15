import { useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { getGisuChapterWithSchools } from '@/features/management/domain/api'
import type { ChallengerRecordCodeResponseDTO } from '@/features/management/domain/model'
import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import {
  fetchChallengerRecordByIdQuery,
  useGetAllGisu,
} from '@/features/management/hooks/useManagementQueries'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'
import * as SharedStyles from '@/shared/styles/shared'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'

import * as S from './AccountCode.style'
import type { BulkDraftRow, DraftFields, FeedbackState } from './accountCode.types'
import {
  buildPayload,
  createBulkDraftRow,
  createInitialBulkRows,
  createPartOptions,
  createRoleOptions,
  getConcretePartRequiredMessage,
  getDraftValidationMessage,
  getErrorMessage,
  hasAnyDraftValue,
  MAX_BULK_CODE_ROWS,
  MAX_DETAIL_FETCH_CONCURRENCY,
  requiresConcretePartSelection,
  shouldSendPart,
} from './accountCode.utils'
import AccountCodeBulkSection from './AccountCodeBulkSection'
import AccountCodeGisuSelector from './AccountCodeGisuSelector'
import AccountCodeResultSection from './AccountCodeResultSection'

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

  const partOptions = useMemo<Array<Option<string>>>(() => createPartOptions(), [])

  const roleOptions = useMemo<Array<Option<string>>>(() => createRoleOptions(), [])

  const getSchoolOptions = (chapterId?: string) =>
    chapterId
      ? (schoolOptionsByChapter.schoolsByChapter.get(chapterId) ?? [])
      : schoolOptionsByChapter.mergedSchoolOptions

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
    const targetRowIndex = bulkRows.findIndex((row) => row.id === rowId)
    const targetRow = targetRowIndex >= 0 ? bulkRows[targetRowIndex] : null

    if (!targetRow) return

    const targetRowRoleType = targetRow.challengerRoleType

    if (
      key === 'part' &&
      value === 'ADMIN' &&
      targetRowRoleType !== undefined &&
      requiresConcretePartSelection(targetRowRoleType)
    ) {
      setFeedback({
        tone: 'error',
        message: `${targetRowIndex + 1}번째 행은 ${getConcretePartRequiredMessage(targetRowRoleType)}`,
      })
      return
    }

    const shouldClearPart =
      key === 'challengerRoleType' && !shouldSendPart(value as DraftFields['challengerRoleType'])
    const shouldResetInvalidAdminPart =
      key === 'challengerRoleType' &&
      value !== undefined &&
      requiresConcretePartSelection(value as DraftFields['challengerRoleType']) &&
      targetRow.part === 'ADMIN'

    if (shouldResetInvalidAdminPart) {
      setFeedback({
        tone: 'error',
        message: `${targetRowIndex + 1}번째 행은 ${getConcretePartRequiredMessage(value as NonNullable<DraftFields['challengerRoleType']>)}`,
      })
    }

    setBulkRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              [key]: value,
              ...(key === 'chapterId' ? { schoolId: undefined } : {}),
              ...(shouldClearPart || shouldResetInvalidAdminPart ? { part: undefined } : {}),
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

    const invalidDraftMessage = normalizedRows
      .map((row, index) => getDraftValidationMessage(row, index))
      .find((message): message is string => message !== null)

    if (invalidDraftMessage) {
      setFeedback({
        tone: 'error',
        message: invalidDraftMessage,
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
        const response = await createSingleCode(buildPayload(selectedGisuId, normalizedRows[0]))
        appendGeneratedCodes([response.result])
        setFeedback({
          tone: 'success',
          message: `${response.result.memberName}의 코드 ${response.result.code}를 발급했습니다.`,
        })
      } else {
        const response = await createBulkCode(
          normalizedRows.map((row) => buildPayload(selectedGisuId, row)),
        )
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
        <AccountCodeGisuSelector
          dropdownRef={gisuDropdownRef}
          isHighlighted={isGisuPromptActive}
          gisuOptions={gisuOptions}
          selectedGisuOption={selectedGisuOption}
          isGisuLoading={isGisuLoading}
          onSelectGisu={handleSelectGisu}
        />
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

        <AccountCodeBulkSection
          bulkRows={bulkRows}
          isSubmitting={isSubmitting}
          isFormDisabled={isFormDisabled}
          shouldGuardScopedDropdowns={shouldGuardScopedDropdowns}
          chapterOptions={chapterOptions}
          partOptions={partOptions}
          roleOptions={roleOptions}
          getSchoolOptions={getSchoolOptions}
          onTriggerGisuPrompt={triggerGisuPrompt}
          onChangeRow={handleChangeBulkRow}
          onAddRow={handleAddBulkRow}
          onRemoveRow={handleRemoveBulkRow}
          onResetRows={handleResetBulkRows}
          onSubmitCodes={handleSubmitCodes}
        />

        <AccountCodeResultSection generatedCodes={generatedCodes} onCopy={handleCopy} />
      </S.Container>
    </SharedStyles.AccountContent>
  )
}

export default AccountCode
