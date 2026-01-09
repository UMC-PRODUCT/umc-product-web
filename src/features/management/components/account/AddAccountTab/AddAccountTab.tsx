import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { AccountRegisterForm } from '@features/management/schemas/management'
import { accountRegisterSchema } from '@features/management/schemas/management'

import { Button } from '@shared/ui/common/Button/Button'
import { LabelTextField } from '@shared/ui/form/LabelTextField/LabelTextField'

import { UNI_LIST_MOCK } from '@/features/auth/mocks/universities'
import useAccountLevelOptions from '@/shared/hooks/useAccountLevelOptions'
import type { Option } from '@/shared/ui/common/Dropdown/Dropdown'
import Section from '@/shared/ui/common/Section/Section'
import LabelDropdown from '@/shared/ui/form/LabelDropdown/LabelDropdown'

import AccountRegisterConfirm from '../../modals/AccountRegisterConfirm/AccountRegisterConfirm'
import * as Shared from '../shared'
import * as S from './AddAccountTab.style'

type ModalState = {
  isOpen: boolean
  link: string
}

const AddAccountTab = () => {
  const [selectedAccount, setSelectedAccount] = useState<Option<string>>()
  const [verifiedEmail, setVerifiedEmail] = useState('')
  const [selectedSchool, setSelectedSchool] = useState<Option<string>>()
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    link: '',
  })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isValid, errors },
  } = useForm<AccountRegisterForm>({
    mode: 'onChange',
    resolver: zodResolver(accountRegisterSchema),
  })

  const watchedEmail = useWatch({ control, name: 'email' })

  const onSubmit = (data: AccountRegisterForm) => {
    console.log(data)
    const response = {
      accountId: 1,
    }
    setModal({
      isOpen: true,
      link: `/management/account/edit/${response.accountId}`,
    })
  }

  const { accountLevelOptions, resolveAccountLevelValue } = useAccountLevelOptions()

  const handleAccountSelect = ({ id, label }: Option<string>) => {
    setSelectedAccount({ id, label })
    const matchedLevel = resolveAccountLevelValue(id)
    if (!matchedLevel) return
    setValue('level', matchedLevel, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  const handleSchoolSelect = ({ id, label }: Option<string>) => {
    setSelectedSchool({ id, label })
    setValue('schoolName', label, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
    setValue('schoolName', '')
    setValue('level', '' as never)
    setValue('name', '')
    setValue('nickname', '')
    setValue('email', '')
    setSelectedSchool(undefined)
    setSelectedAccount(undefined)
    setVerifiedEmail('')
  }

  const handleSendVerificationEmail = () => {
    setVerifiedEmail(watchedEmail)
  }

  const isEmailVerified = verifiedEmail !== '' && verifiedEmail === watchedEmail
  const emailVerificationButtonLabel = isEmailVerified ? '발송완료' : '초대하기'

  return (
    <>
      <Shared.TabHeader alignItems="flex-start">
        <Shared.TabTitle>계정 생성</Shared.TabTitle>
        <Shared.TabSubtitle>새로운 계정을 시스템에 등록합니다.</Shared.TabSubtitle>
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
              value={selectedAccount}
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
            {isEmailVerified && <S.Span>초대 메일 재발송</S.Span>}
          </S.EmailSection>
        </Section>

        <S.SubmitButtonWrapper width="120px" height="41px">
          <Button
            type="submit"
            disabled={!isValid}
            tone="lime"
            label="등록하기"
            onClick={handleSubmit(onSubmit)}
            typo="C2.Md"
          />
        </S.SubmitButtonWrapper>
      </S.Form>

      {modal.isOpen && <AccountRegisterConfirm onClose={closeModal} link={modal.link} />}
    </>
  )
}

export default AddAccountTab
