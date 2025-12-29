import Input from '@/components/auth/AuthInput'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Logo from '@/assets/brand_logo.svg?react'
import AuthSection from '@/components/auth/AuthSection'
import styled from '@emotion/styled'
import Button from '@/components/common/Button'
import AuthSelection from '@/components/auth/AuthSelection'
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
  return (
    <AuthSection size="lg">
      <Logo></Logo>
      <InputWrapper>
        <AuthSelection
          label="학교"
          placeholder="학교를 선택해 주세요."
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ]}
        ></AuthSelection>
        <Input
          type="text"
          placeholder="이름을 입력해주세요."
          label="이름"
          error={true}
          errorMessage="이름을 입력해주세요."
        ></Input>
        <Input
          type="text"
          placeholder="2~5글자 한글 닉네임을 입력해 주세요."
          label="닉네임"
        ></Input>
        <Input
          type="email"
          placeholder="이메일 주소를 입력해주세요."
          label="이메일 주소"
          button={{
            buttonMesssage: confirm ? '인증완료' : '인증하기',
            buttonClick: () => setConfirm(!confirm),
            validate: confirm,
          }}
        ></Input>
      </InputWrapper>
      <Button
        label="회원가입"
        tone="lime"
        onClick={() => {}}
        typo="B3.Sb"
      ></Button>
    </AuthSection>
  )
}
