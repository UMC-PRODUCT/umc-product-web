import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { RegisterForm } from '@/schema/register'
import { registerSchema } from '@/schema/register'
import Logo from '@/assets/brand_logo.svg?react'
import AuthSection from '@/components/auth/AuthSection/AuthSection'
import AuthSelection from '@/components/auth/AuthSelection/AuthSelection'
import { AuthInput } from '@/components/auth/AuthInput/AuthInput'
import Button from '@/components/common/Button/Button'
import Flex from '@/components/common/Flex/Flex'
import { Term } from '@/components/auth/Term/Term'
import { UNI_LIST_MOCK } from '@/mocks/mocks'

export const Route = createFileRoute('/auth/register')({
  component: Register,
})

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`
function Register() {
  const [confirm, setConfirm] = useState(false)
  const [school, setSchool] = useState({ id: '', label: '' })
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  })
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<RegisterForm>({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      school: '',
      name: '',
      nickname: '',
      email: '',
      serviceTerm: false,
      privacyTerm: false,
      marketingTerm: false,
    },
  })

  const onSubmit = (data: RegisterForm) => {
    console.log(data)
  }

  const watchEmail = useWatch({
    control,
    name: 'email',
  })

  useEffect(() => {
    if (confirm) {
      setConfirm(false)
    }
  }, [watchEmail])

  const handleChangeAllTerm = () => {
    const allChecked = terms.service && terms.privacy && terms.marketing
    setTerms({
      service: !allChecked,
      privacy: !allChecked,
      marketing: !allChecked,
    })
  }

  return (
    <AuthSection size="lg">
      <Logo></Logo>
      <form action="submit" onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <AuthSelection
            label="학교"
            placeholder="학교를 선택해 주세요."
            options={UNI_LIST_MOCK}
            error={!!errors.school}
            errorMessage={errors.school?.message}
            onClick={setSchool}
            value={school}
          ></AuthSelection>
          <AuthInput
            type="text"
            placeholder="이름을 입력해주세요."
            label="이름"
            error={!!errors.name}
            errorMessage={errors.name?.message}
            {...register('name')}
          ></AuthInput>
          <AuthInput
            type="text"
            placeholder="2~5글자 한글 닉네임을 입력해 주세요."
            label="닉네임"
            error={!!errors.nickname}
            errorMessage={errors.nickname?.message}
            {...register('nickname')}
          ></AuthInput>
          <AuthInput
            type="email"
            placeholder="이메일 주소를 입력해주세요."
            label="이메일 주소"
            error={!!errors.email}
            errorMessage={errors.email?.message}
            button={{
              buttonMesssage: confirm ? '인증완료' : '인증하기',
              buttonClick: () => setConfirm(!confirm),
              validate: confirm,
            }}
            {...register('email')}
          ></AuthInput>
        </InputWrapper>
      </form>
      <Flex direction="column" alignItems="flex-start" gap="12px">
        <Term
          onClick={handleChangeAllTerm}
          title="전체 동의"
          value={terms.service && terms.privacy && terms.marketing}
        ></Term>
        <Term
          onClick={() => setTerms({ ...terms, service: !terms.service })}
          termTitle="서비스이용약관"
          title="동의"
          necessary={true}
          value={terms.service}
        ></Term>
        <Term
          onClick={() => setTerms({ ...terms, privacy: !terms.privacy })}
          termTitle="개인정보처리방침"
          title="동의"
          necessary={true}
          value={terms.privacy}
        ></Term>
        <Term
          onClick={() => setTerms({ ...terms, marketing: !terms.marketing })}
          termTitle="마케팅정보수신"
          title="동의"
          necessary={false}
          value={terms.marketing}
        ></Term>
      </Flex>
      <Button
        label="회원가입"
        tone="lime"
        onClick={handleSubmit(onSubmit)}
        typo="B3.Sb"
        variant="solid"
        disabled={!isValid}
      ></Button>
    </AuthSection>
  )
}
