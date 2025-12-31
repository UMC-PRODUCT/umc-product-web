import { createFileRoute } from '@tanstack/react-router'
import styled from '@emotion/styled'
import { useRegisterForm } from '../../hooks/useRegisterForm'
import Logo from '@/assets/brand_logo.svg?react'
import AuthSection from '@/components/auth/AuthSection/AuthSection'
import AuthSelection from '@/components/auth/AuthSelection/AuthSelection'
import { AuthInput } from '@/components/auth/AuthInput/AuthInput'
import Button from '@/components/common/Button/Button'
import { TermsSection } from '@/components/auth/Term/TermsSection'
import { UNI_LIST_MOCK } from '@/mocks/mocks'
import useModalStore from '@/store/useModalStore'
import { MODAL_TYPES } from '@/components/common/Modal/ModalProvider'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

export const Route = createFileRoute('/auth/register')({
  component: Register,
})

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
`

const ResponsiveLogo = styled(Logo)`
  width: 264px;
  height: auto;
  ${media.down(theme.breakPoints.mobile)} {
    width: 200px;
  }
`
function Register() {
  const { openModal } = useModalStore()
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
    openModal(MODAL_TYPES.EmailSendModal)
  }

  return (
    <AuthSection size="lg">
      <ResponsiveLogo />
      <form onSubmit={handleSubmit(onSubmit)} css={{ maxWidth: '100%' }}>
        <InputWrapper>
          <AuthSelection
            label="학교"
            placeholder="학교를 선택해 주세요."
            options={UNI_LIST_MOCK}
            error={{
              error: !!errors.school,
              errorMessage: errors.school?.message || '',
            }}
            onClick={handleSelectSchool}
            value={school}
          />
          <AuthInput
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
          <AuthInput
            autoComplete="nickname"
            type="text"
            placeholder="2~5글자 한글 닉네임을 입력해 주세요."
            label="닉네임"
            error={{
              error: !!errors.nickname,
              errorMessage: errors.nickname?.message || '',
            }}
            value={values.nickname}
            {...register('nickname')}
          />
          <AuthInput
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
            type="submit"
            onClick={handleSubmit(onSubmit)}
            label="회원가입"
            tone="lime"
            typo="B3.Sb"
            variant="solid"
            disabled={!isValid}
          />
        </InputWrapper>
      </form>
    </AuthSection>
  )
}
