import { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react'
import type { Interpolation, Theme } from '@emotion/react'
import dayjs from 'dayjs'

import CalendarIcon from '@shared/assets/icons/calendar2.svg?react'
import { Field } from '@shared/styles/formStyles'
import ErrorMessage from '@shared/ui/common/ErrorMessage/ErrorMessage'
import Label from '@shared/ui/common/Label/Label'

import { theme } from '@/shared/styles/theme'

import Section from '../../common/Section/Section'
import * as S from './LabelCalendar.style'
import RecruitingFormCalendar from './RecruitingFormCalendar'

type LabelCalendarProps = {
  label?: string
  placeholder?: string
  value?: Date | null
  onChange?: (date: Date) => void
  onBlur?: () => void
  name?: string
  error?: {
    error: boolean
    errorMessage: string
  }
  necessary?: boolean
  id?: string
  className?: string
  css?: Interpolation<Theme>
}

const formatDate = (value: Date) => dayjs(value).format('YYYY.MM.DD')

const LabelCalendar = forwardRef<HTMLButtonElement, LabelCalendarProps>(
  (
    {
      label = '날짜',
      placeholder = '날짜를 선택해주세요.',
      value,
      onChange,
      onBlur,
      name,
      error,
      necessary = true,
      id,
      className,
      css,
    },
    ref,
  ) => {
    const baseId = useId()
    const triggerId = id ?? name ?? `${baseId}-calendar`
    const labelId = `${baseId}-label`
    const wrapperRef = useRef<HTMLDivElement>(null)

    const isValuePropProvided = value !== undefined
    const [internalValue, setInternalValue] = useState<Date | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const selectedValue = isValuePropProvided ? (value ?? null) : internalValue

    useEffect(() => {
      if (!isOpen) return
      const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
        if (!wrapperRef.current) return
        if (wrapperRef.current.contains(event.target as Node)) return
        setIsOpen(false)
        onBlur?.()
      }

      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('touchstart', handleOutsideClick)
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
        document.removeEventListener('touchstart', handleOutsideClick)
      }
    }, [isOpen, onBlur])

    const handleDateChange = useCallback(
      (nextValue: Date) => {
        if (!isValuePropProvided) {
          setInternalValue(nextValue)
        }
        onChange?.(nextValue)
        setIsOpen(false)
        onBlur?.()
      },
      [isValuePropProvided, onBlur, onChange],
    )

    const displayValue = selectedValue ? formatDate(selectedValue) : placeholder

    return (
      <Field css={{ width: '320px' }}>
        <S.SelectHeader>
          <Label id={labelId} htmlFor={triggerId} label={label} necessary={necessary} />
          {error?.error && (
            <ErrorMessage
              typo="B4.Md"
              responsiveTypo={{ tablet: 'C5.Md' }}
              errorMessage={error.errorMessage}
            />
          )}
        </S.SelectHeader>
        <S.CalendarWrapper ref={wrapperRef}>
          <S.Trigger
            ref={ref}
            id={triggerId}
            type="button"
            aria-labelledby={labelId}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            className={className}
            css={css}
            $open={isOpen}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <S.Value $placeholder={!selectedValue}>{displayValue}</S.Value>
            <CalendarIcon color={theme.colors.gray[400]} width={26} height={26} aria-hidden />
          </S.Trigger>
          {isOpen && (
            <S.CalendarPopover $open={isOpen} role="dialog" aria-labelledby={labelId}>
              <Section
                variant="both"
                width={400}
                height={350}
                padding={'18px 20px'}
                css={{ backgroundColor: theme.colors.black }}
              >
                <RecruitingFormCalendar
                  key={triggerId}
                  value={selectedValue}
                  onChange={handleDateChange}
                />
              </Section>
            </S.CalendarPopover>
          )}
        </S.CalendarWrapper>
      </Field>
    )
  },
)

LabelCalendar.displayName = 'LabelCalendar'

export default LabelCalendar
