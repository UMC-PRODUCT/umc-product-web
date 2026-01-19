import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { RegisterForm } from '../../schemas/register'
import { registerSchema } from '../../schemas/register'

/**
 * 회원가입 폼 기본 설정 훅
 */
export function useRegisterFormSetup() {
  const form = useForm<RegisterForm>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      school: '',
      name: '',
      nickname: '',
      email: '',
      serviceTerm: false,
      privacyTerm: false,
      marketingTerm: false,
      oAuthVerificationToken: '',
    },
  })

  const { register } = form

  // 숨겨진 필드 등록
  useEffect(() => {
    register('school')
    register('serviceTerm')
    register('privacyTerm')
    register('marketingTerm')
  }, [register])

  return form
}
