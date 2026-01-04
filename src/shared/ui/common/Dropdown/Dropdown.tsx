import { forwardRef } from 'react'
import type { Interpolation, Theme } from '@emotion/react'
import * as SelectPrimitive from '@radix-ui/react-select'

import Arrow from '@shared/assets/icons/arrow.svg?react'

import * as S from './Dropdown.style'

export type Option = { label: string; id: string | number }

type DropdownProps = {
  placeholder?: string
  options: Array<Option>
  value?: Option
  defaultValue?: Option
  onChange?: (option: Option) => void
  id?: string
  ariaLabelledby?: string
  css?: Interpolation<Theme>
  className?: string
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    { placeholder, options, value, defaultValue, onChange, id, ariaLabelledby, className, css },
    ref,
  ) => {
    const handleValueChange = (selectedValue: string) => {
      const selectedOption = options.find((opt) => String(opt.id) === selectedValue)
      if (selectedOption) {
        onChange?.(selectedOption)
      }
    }

    return (
      <SelectPrimitive.Root
        value={value ? String(value.id) : undefined}
        defaultValue={defaultValue ? String(defaultValue.id) : undefined}
        onValueChange={handleValueChange}
      >
        <S.StyledTrigger
          ref={ref}
          id={id}
          aria-labelledby={ariaLabelledby}
          className={className}
          css={css}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <S.StyledIcon>
            <Arrow width={16} height={16} aria-hidden />
          </S.StyledIcon>
        </S.StyledTrigger>

        <SelectPrimitive.Portal>
          <S.StyledContent position="popper" sideOffset={4}>
            <S.StyledViewport>
              {options.map((option) => (
                <S.StyledItem key={option.id} value={String(option.id)}>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </S.StyledItem>
              ))}
            </S.StyledViewport>
          </S.StyledContent>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  },
)

Dropdown.displayName = 'Dropdown'
