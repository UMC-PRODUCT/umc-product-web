import { useState } from 'react'

import { UNI_LIST_MOCK } from '@/features/auth/mocks/universities'
import { EDIT_ACCOUNT_MOCKS } from '@/features/management/mocks/editAccount'
import type { AccountEditForm } from '@/features/management/schemas/management'
import useAccountLevelOptions from '@/shared/hooks/useAccountLevelOptions'
import type { AccountLevelType, AccountStateType } from '@/shared/types/umc'
import { Button } from '@/shared/ui/common/Button'
import type { Option } from '@/shared/ui/common/Dropdown'
import Section from '@/shared/ui/common/Section/Section'
import LabelDropdown from '@/shared/ui/form/LabelDropdown/LabelDropdown'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'
import { transformStateKorean } from '@/shared/utils/transformKorean'

import AccountActivate from '../../modals/AccountActivate/AccountActivate'
import AccountEditConfirm from '../../modals/AccountEditConfirm/AccountEditConfirm'
import AccountInviteConfirm from '../../modals/AccountInviteConfirm/AccountInviteConfirm'
import AccountSuspended from '../../modals/AccountSuspended/AccountSuspended'
import * as Shared from '../shared'
import * as S from './EditModeView.style'
import useEditAccountForm from './useEditAccountForm'
import useEmailVerification from './useEmailVerification'

export type TResponse = {
  school: Option<string>
  level: Option<AccountLevelType>
  name: string
  nickname: string
  email: string
  createAccountDate: string
  lastModifiedDate: string
  status: Option<AccountStateType>
}

const EditModeView = () => {
  const [accountActivate, setAccountActivate] = useState({ isOpen: false })
  const [editConfirmModal, setEditConfirmModal] = useState(false)
  const [inviteConfirmModal, setInviteConfirmModal] = useState(false)

  const { accountLevelOptions, resolveAccountLevelValue } = useAccountLevelOptions()

  const {
    handleAccountSelect,
    handleSchoolSelect,
    handleSubmit,
    register,
    selectedAccountLevel,
    selectedSchool,
    watch,
    formState: { isValid, errors },
  } = useEditAccountForm(EDIT_ACCOUNT_MOCKS, resolveAccountLevelValue)

  const { emailVerificationButtonLabel, handleSendVerificationEmail, isEmailVerified } =
    useEmailVerification(watch('email'), () => setInviteConfirmModal(true))

  const onSubmit = (data: AccountEditForm) => {
    console.log(data)
    setEditConfirmModal(true)
  }

  const isNowActive = EDIT_ACCOUNT_MOCKS.status.label === 'ACTIVE'
  return (
    <>
      <Shared.TabHeader alignItems="flex-start">
        <Shared.TabTitle>계정 수정</Shared.TabTitle>
        <Shared.TabSubtitle>계정을 수정할 수 있습니다.</Shared.TabSubtitle>
      </Shared.TabHeader>
      <S.Form>
        <Section variant="solid">
          <S.InputRow>
            <LabelDropdown<string>
              options={UNI_LIST_MOCK}
              label="학교명"
              placeholder="학교명을 입력하세요."
              value={selectedSchool}
              error={{
                error: !!errors.schoolName,
                errorMessage: errors.schoolName?.message || '',
              }}
              onChange={handleSchoolSelect}
            />
            <LabelDropdown<string>
              options={accountLevelOptions}
              label="권한 레벨"
              value={selectedAccountLevel}
              onChange={handleAccountSelect}
              placeholder="권한 레벨을 선택하세요."
              error={{
                error: !!errors.level,
                errorMessage: errors.level?.message || '',
              }}
            />
            <LabelTextField
              type="text"
              label="이름"
              autoComplete="name"
              placeholder="이름을 입력하세요."
              error={{
                error: !!errors.name,
                errorMessage: errors.name?.message || '',
              }}
              {...register('name')}
            />
            <LabelTextField
              type="text"
              label="닉네임"
              autoComplete="nickname"
              placeholder="닉네임을 입력하세요."
              error={{
                error: !!errors.nickname,
                errorMessage: errors.nickname?.message || '',
              }}
              {...register('nickname')}
            />
          </S.InputRow>
          <S.EmailSection>
            <S.EmailWrapper>
              <LabelTextField
                type="email"
                label="이메일"
                autoComplete="email"
                placeholder="이메일을 입력하세요."
                error={{
                  error: !!errors.email,
                  errorMessage: errors.email?.message || '',
                }}
                button={{
                  buttonMessage: emailVerificationButtonLabel,
                  buttonClick: handleSendVerificationEmail,
                  validation: isEmailVerified,
                }}
                {...register('email')}
              />
            </S.EmailWrapper>
            {isEmailVerified && (
              <S.Span onClick={handleSendVerificationEmail}>초대 메일 재발송</S.Span>
            )}
          </S.EmailSection>
          <S.MetaRow gap="20px">
            <S.MetaGroup gap={20}>
              <S.MetaFixedField
                autoComplete="off"
                type="text"
                label="계정 생성일"
                necessary={false}
                value={'2024-01-01'}
                readOnly
              />
              <S.MetaFixedField
                autoComplete="off"
                type="text"
                label="최종 수정일"
                necessary={false}
                value={'2024-01-01'}
                readOnly
              />
            </S.MetaGroup>
            <S.MetaStatusGroup alignItems="center" gap={20}>
              <S.MetaStatusField
                autoComplete="off"
                type="text"
                label="상태"
                necessary={false}
                value={transformStateKorean(EDIT_ACCOUNT_MOCKS.status.label)}
                readOnly
              />
              <S.SpanConditional
                isActive={!isNowActive}
                onClick={() => setAccountActivate({ isOpen: true })}
              >
                {isNowActive ? '계정 정지시키기' : '계정 활성화하기'}
              </S.SpanConditional>
            </S.MetaStatusGroup>
          </S.MetaRow>
        </Section>

        <S.SubmitButtonWrapper width="250px" height="41px" gap={20}>
          <Button
            type="submit"
            disabled={!isValid}
            tone="gray"
            label="초기화"
            onClick={() => {}}
            typo="C2.Md"
          />
          <Button
            type="submit"
            disabled={!isValid}
            tone="lime"
            label="수정 완료"
            onClick={handleSubmit(onSubmit)}
            typo="C2.Md"
          />
        </S.SubmitButtonWrapper>
      </S.Form>
      {editConfirmModal && <AccountEditConfirm onClose={() => setEditConfirmModal(false)} />}
      {inviteConfirmModal && <AccountInviteConfirm onClose={() => setInviteConfirmModal(false)} />}
      {accountActivate.isOpen &&
        (isNowActive ? (
          <AccountSuspended
            onClose={() => setAccountActivate({ isOpen: false })}
            onSuspend={() => {}}
            name={EDIT_ACCOUNT_MOCKS.name}
          />
        ) : (
          <AccountActivate
            onClose={() => setAccountActivate({ isOpen: false })}
            onActivate={() => {}}
            name={EDIT_ACCOUNT_MOCKS.name}
          />
        ))}
    </>
  )
}

export default EditModeView
