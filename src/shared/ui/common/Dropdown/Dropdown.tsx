import type { ReactNode, UIEvent } from 'react'
import { forwardRef } from 'react'
import type { Interpolation, Theme } from '@emotion/react'
import * as SelectPrimitive from '@radix-ui/react-select'

import Arrow from '@shared/assets/icons/arrow.svg?react'

import type { Option } from '@/shared/types/form'

import * as S from './Dropdown.style'

type DropdownProps<T> = {
  placeholder?: string
  options: Array<Option<T>>
  value?: Option<T>
  defaultValue?: Option<T>
  onChange?: (option: Option<T>) => void
  disabled?: boolean
  id?: string
  ariaLabelledby?: string
  css?: Interpolation<Theme>
  className?: string
  optionSuffix?: (option: Option<T>) => ReactNode
  onScrollEnd?: () => void
}

const DropdownComponent = forwardRef<HTMLButtonElement, DropdownProps<any>>((props, ref) => {
  const {
    placeholder,
    options,
    value,
    defaultValue,
    onChange,
    disabled = false,
    id,
    ariaLabelledby,
    className,
    css,
    optionSuffix,
    onScrollEnd,
  } = props
  const isValuePropProvided = Object.prototype.hasOwnProperty.call(props, 'value')
  const controlledValue = value ? String(value.id) : ''
  const handleValueChange = (selectedValue: string) => {
    const selectedOption = options.find((opt) => String(opt.id) === selectedValue)
    if (selectedOption) {
      onChange?.(selectedOption)
    }
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight
    if (distanceToBottom < 32) {
      onScrollEnd?.()
    }
  }

  return (
    <SelectPrimitive.Root
      value={isValuePropProvided ? controlledValue : undefined}
      defaultValue={!isValuePropProvided && defaultValue ? String(defaultValue.id) : undefined}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <S.StyledTrigger
        ref={ref}
        id={id}
        aria-labelledby={ariaLabelledby}
        className={className}
        css={css}
        data-disabled={disabled || undefined}
        disabled={disabled}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <S.StyledIcon>
          <Arrow width={16} height={16} aria-hidden />
        </S.StyledIcon>
      </S.StyledTrigger>

      <SelectPrimitive.Portal>
        <S.StyledContent position="popper" sideOffset={4}>
          <S.StyledViewport onScroll={handleScroll}>
            {options.map((option) => (
              <S.StyledItem key={option.id} value={String(option.id)}>
                <SelectPrimitive.ItemText asChild>
                  <span css={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {option.label}
                    {optionSuffix ? optionSuffix(option) : null}
                  </span>
                </SelectPrimitive.ItemText>
              </S.StyledItem>
            ))}
          </S.StyledViewport>
        </S.StyledContent>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
})

DropdownComponent.displayName = 'Dropdown'

export const Dropdown = DropdownComponent as <T>(
  props: DropdownProps<T> & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement
