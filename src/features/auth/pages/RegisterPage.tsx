import { useState } from 'react'
import styled from '@emotion/styled'

import AuthSection from '@features/auth/components/AuthSection/AuthSection'
import EmailSendModal from '@features/auth/components/modals/EmailSendModal/EmailSendModal'
import { TermsSection } from '@features/auth/components/Term/TermsSection'
import { useRegisterForm } from '@features/auth/hooks/useRegisterForm'

import Logo from '@shared/assets/brand_logo.svg?react'
import { UNI_LIST_MOCK } from '@shared/mocks/universities'
import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import { Button } from '@shared/ui/common/Button/Button'
import LabelDropdown from '@shared/ui/form/LabelDropdown/LabelDropdown'
import { LabelTextField } from '@shared/ui/form/LabelTextField/LabelTextField'

export function RegisterPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    confirmButton,
    school,
    handleSelectSchool,
    terms,
    toggleTerm,
    toggleAllTerms,
    onSubmit,
    values,
  } = useRegisterForm()

  const sendEmail = () => {
    confirmButton.toggle()
    setIsEmailModalOpen(true)
  }

  return (
    <>
      <AuthSection size="lg">
        <ResponsiveLogo />
        <form onSubmit={handleSubmit(onSubmit)} css={{ width: '100%' }}>
          <InputWrapper>
            <LabelDropdown
              label="학교"
              placeholder="학교를 선택해 주세요."
              options={UNI_LIST_MOCK}
              error={{
                error: !!errors.school,
                errorMessage: errors.school?.message || '',
              }}
              onChange={handleSelectSchool}
              value={school}
            />
            <LabelTextField
              autoComplete="name"
              type="text"
              label="이름"
              placeholder="이름을 입력해주세요."
              error={{
                error: !!errors.name,
                errorMessage: errors.name?.message || '',
              }}
              value={values.name}
              {...register('name')}
            />
            <LabelTextField
              autoComplete="nickname"
              type="text"
              placeholder="1~5글자 한글 닉네임을 입력해 주세요."
              label="닉네임"
              error={{
                error: !!errors.nickname,
                errorMessage: errors.nickname?.message || '',
              }}
              value={values.nickname}
              {...register('nickname')}
            />
            <LabelTextField
              autoComplete="email"
              type="email"
              placeholder="이메일 주소를 입력해주세요."
              label="이메일 주소"
              error={{
                error: !!errors.email,
                errorMessage: errors.email?.message || '',
              }}
              button={{
                buttonMessage: confirmButton.state ? '인증완료' : '인증하기',
                buttonClick: sendEmail,
                validation: confirmButton.state,
              }}
              value={values.email}
              {...register('email')}
            />
            <TermsSection
              terms={terms}
              onToggleAll={toggleAllTerms}
              onToggle={toggleTerm}
              errors={{
                serviceTerm: errors.serviceTerm?.message,
                privacyTerm: errors.privacyTerm?.message,
                marketingTerm: errors.marketingTerm?.message,
              }}
            />
            <Button
              className="submit-button"
              type="submit"
              label="회원가입"
              tone="lime"
              typo="B3.Sb"
              variant="solid"
              disabled={!isValid}
            />
          </InputWrapper>
        </form>
      </AuthSection>

      {isEmailModalOpen && <EmailSendModal onClose={() => setIsEmailModalOpen(false)} />}
    </>
  )
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  .submit-button {
    height: 45px;
  }
`

const ResponsiveLogo = styled(Logo)`
  width: 264px;
  height: auto;
  ${media.down(theme.breakPoints.mobile)} {
    width: 200px;
  }
`
