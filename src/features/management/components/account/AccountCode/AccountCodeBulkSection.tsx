import type {
  ChallengerRecordPartType,
  ChallengerRecordRoleType,
} from '@/features/management/domain/model'
import Plus from '@/shared/assets/icons/plus.svg?react'
import Trash from '@/shared/assets/icons/trash.svg?react'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './AccountCode.style'
import type { BulkDraftRow, ChangeBulkRow } from './accountCode.types'
import {
  getChallengerRecordPartLabel,
  MAX_BULK_CODE_ROWS,
  requiresConcretePartSelection,
  requiresPartSelection,
  resolveOption,
} from './accountCode.utils'

type AccountCodeBulkSectionProps = {
  bulkRows: Array<BulkDraftRow>
  isSubmitting: boolean
  isFormDisabled: boolean
  shouldGuardScopedDropdowns: boolean
  chapterOptions: Array<Option<string>>
  partOptions: Array<Option<string>>
  roleOptions: Array<Option<string>>
  getSchoolOptions: (chapterId?: string) => Array<Option<string>>
  onTriggerGisuPrompt: () => void
  onChangeRow: ChangeBulkRow
  onAddRow: () => void
  onRemoveRow: (rowId: string) => void
  onResetRows: () => void
  onSubmitCodes: () => void
}

type GuardedDropdownFieldProps = {
  label: string
  options: Array<Option<string>>
  value?: Option<string>
  placeholder: string
  hint?: string
  disabled: boolean
  isBlocked: boolean
  onBlockedClick: () => void
  onChange: (option: Option<string>) => void
}

const GuardedDropdownField = ({
  label,
  options,
  value,
  placeholder,
  hint,
  disabled,
  isBlocked,
  onBlockedClick,
  onChange,
}: GuardedDropdownFieldProps) => (
  <S.Field>
    <S.FieldLabel>{label}</S.FieldLabel>
    <S.ControlShell $isBlocked={isBlocked} onClick={isBlocked ? onBlockedClick : undefined}>
      <Dropdown
        options={options}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        css={{ width: '100%', maxWidth: '100%' }}
      />
    </S.ControlShell>
    {hint ? <S.FieldHint>{hint}</S.FieldHint> : null}
  </S.Field>
)

const AccountCodeBulkSection = ({
  bulkRows,
  isSubmitting,
  isFormDisabled,
  shouldGuardScopedDropdowns,
  chapterOptions,
  partOptions,
  roleOptions,
  getSchoolOptions,
  onTriggerGisuPrompt,
  onChangeRow,
  onAddRow,
  onRemoveRow,
  onResetRows,
  onSubmitCodes,
}: AccountCodeBulkSectionProps) => (
  <Section variant="solid" padding="20px" gap={20}>
    <S.SectionHeader>
      <S.SectionTitleWrap alignItems="flex-start">
        <S.SectionTitle>코드 생성</S.SectionTitle>
        <S.SectionDescription>
          기본은 1행부터 시작하며, 한 번에 최대 {MAX_BULK_CODE_ROWS}건까지 같은 화면에서 연속 발급할
          수 있습니다.
        </S.SectionDescription>
      </S.SectionTitleWrap>

      <S.Actions width={'fit-content'}>
        <Button
          label="행 추가"
          tone="gray"
          variant="outline"
          Icon={Plus}
          onClick={onAddRow}
          disabled={isSubmitting || bulkRows.length >= MAX_BULK_CODE_ROWS}
          css={{ width: '108px', height: '41px' }}
        />
        <Button
          label="행 비우기"
          tone="gray"
          variant="outline"
          onClick={onResetRows}
          disabled={isSubmitting}
          css={{ width: '108px', height: '41px' }}
        />
        <Button
          label="코드 생성"
          tone="lime"
          onClick={onSubmitCodes}
          isLoading={isSubmitting}
          disabled={isFormDisabled}
          css={{ width: '132px', height: '41px' }}
        />
      </S.Actions>
    </S.SectionHeader>

    <S.RowList>
      {bulkRows.map((row, index) => {
        const schoolOptions = getSchoolOptions(row.chapterId)
        const isPartRequired = requiresPartSelection(row.challengerRoleType)
        const needsConcretePart = requiresConcretePartSelection(row.challengerRoleType)
        const partHint = !isPartRequired
          ? undefined
          : needsConcretePart
            ? '주의: Admin이 아닌 실제 파트를 선택해야 합니다.'
            : ''

        return (
          <S.RowCard key={row.id}>
            <S.RowHeader>
              <S.RowIndex>
                <S.RowBadge>{index + 1}</S.RowBadge>
                <span>{row.memberName.trim() || '새 기록'}</span>
              </S.RowIndex>

              <Flex alignItems="center" gap={10} width={'fit-content'}>
                <S.RowMeta>
                  {row.part
                    ? getChallengerRecordPartLabel(row.part)
                    : row.challengerRoleType && !isPartRequired
                      ? '파트 없음'
                      : '파트 미선택'}
                </S.RowMeta>
                <Button
                  tone="gray"
                  variant="outline"
                  Icon={Trash}
                  aria-label={`${index + 1}번째 행 삭제`}
                  onClick={() => onRemoveRow(row.id)}
                  disabled={isSubmitting}
                  css={{ width: '41px', height: '41px', padding: 0 }}
                />
              </Flex>
            </S.RowHeader>

            <S.FormGrid>
              <S.Field>
                <S.FieldLabel>이름</S.FieldLabel>
                <S.Input
                  value={row.memberName}
                  onChange={(event) => onChangeRow(row.id, 'memberName', event.target.value)}
                  placeholder="이름 입력"
                  disabled={isFormDisabled}
                />
              </S.Field>
              <GuardedDropdownField
                label="지부"
                options={chapterOptions}
                value={resolveOption(chapterOptions, row.chapterId)}
                placeholder="지부 선택"
                disabled={isFormDisabled}
                isBlocked={shouldGuardScopedDropdowns}
                onBlockedClick={onTriggerGisuPrompt}
                onChange={(option) => onChangeRow(row.id, 'chapterId', String(option.id))}
              />
              <GuardedDropdownField
                label="학교"
                options={schoolOptions}
                value={resolveOption(schoolOptions, row.schoolId)}
                placeholder="학교 선택"
                disabled={isFormDisabled}
                isBlocked={shouldGuardScopedDropdowns}
                onBlockedClick={onTriggerGisuPrompt}
                onChange={(option) => onChangeRow(row.id, 'schoolId', String(option.id))}
              />
              <GuardedDropdownField
                label="역할"
                options={roleOptions}
                value={resolveOption(roleOptions, row.challengerRoleType)}
                placeholder="역할 선택"
                disabled={isFormDisabled}
                isBlocked={shouldGuardScopedDropdowns}
                onBlockedClick={onTriggerGisuPrompt}
                onChange={(option) =>
                  onChangeRow(row.id, 'challengerRoleType', option.id as ChallengerRecordRoleType)
                }
              />
              {isPartRequired ? (
                <GuardedDropdownField
                  label="파트"
                  options={partOptions}
                  value={resolveOption(partOptions, row.part)}
                  placeholder="파트 선택"
                  hint={partHint}
                  disabled={isFormDisabled}
                  isBlocked={shouldGuardScopedDropdowns}
                  onBlockedClick={onTriggerGisuPrompt}
                  onChange={(option) =>
                    onChangeRow(row.id, 'part', option.id as ChallengerRecordPartType)
                  }
                />
              ) : null}
            </S.FormGrid>
          </S.RowCard>
        )
      })}
    </S.RowList>
  </Section>
)

export default AccountCodeBulkSection
