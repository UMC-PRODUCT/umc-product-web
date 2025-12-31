import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { RegisterForm } from '@/schema/register'
import { registerSchema } from '@/schema/register'

export type TermKey = 'service' | 'privacy' | 'marketing'

type School = {
  id: string
  label: string
}

type TermsState = Record<TermKey, boolean>

const initialTerms: TermsState = {
  service: false,
  privacy: false,
  marketing: false,
}

const termFieldMap: Record<TermKey, keyof RegisterForm> = {
  service: 'serviceTerm',
  privacy: 'privacyTerm',
  marketing: 'marketingTerm',
}

export function useRegisterForm() {
  const [confirm, setConfirm] = useState(false)
  const [school, setSchool] = useState<School>({ id: '', label: '' })
  const [terms, setTerms] = useState<TermsState>(initialTerms)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  useEffect(() => {
    register('school')
    register('serviceTerm')
    register('privacyTerm')
    register('marketingTerm')
  }, [register])

  const onSubmit = (data: RegisterForm) => {
    console.log(data)
  }

  const [nameValue, nicknameValue, emailValue] = watch([
    'name',
    'nickname',
    'email',
  ])

  useEffect(() => {
    if (confirm) {
      setConfirm(false)
    }
  }, [confirm, emailValue])

  const handleSelectSchool = ({ id, label }: School) => {
    setSchool({ id, label })
    setValue('school', label, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const setTermValue = (key: TermKey, next: boolean) => {
    setTerms((prev) => ({ ...prev, [key]: next }))
    setValue(termFieldMap[key], next, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const toggleTerm = (key: TermKey) => {
    setTermValue(key, !terms[key])
  }

  const toggleAllTerms = () => {
    const allChecked = terms.service && terms.privacy && terms.marketing
    const next = !allChecked
    ;(['service', 'privacy', 'marketing'] as Array<TermKey>).forEach((key) =>
      setTermValue(key, next),
    )
  }

  const confirmButton = useMemo(
    () => ({
      state: confirm,
      toggle: () => setConfirm((prev) => !prev),
    }),
    [confirm],
  )

  return {
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
    values: {
      name: nameValue,
      nickname: nicknameValue,
      email: emailValue,
    },
  }
}
