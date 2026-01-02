import * as S from './Dropdown.style'
import type { Option } from '@/hooks/useSelectorInteractions'
import type { Interpolation, Theme } from '@emotion/react'
import Arrow from '@/assets/icons/Arrow.svg?react'
import { useSelectorInteractions } from '@/hooks/useSelectorInteractions'

type DropdownProps = {
  placeholder?: string
  options: Array<Option>
  value?: Option
  onClick: (option: Option) => void
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  open: boolean
  id?: string
  ariaLabelledby?: string
  css?: Interpolation<Theme>
}
export default function Dropdown({
  placeholder,
  options,
  value,
  onClick,
  setOpen,
  open,
  id,
  ariaLabelledby,
  css,
}: DropdownProps) {
  const {
    wrapRef,
    triggerRef,
    optionRefs,
    focusedIndex,
    handleOptionSelect,
    handleTriggerKeyDown,
    handleOptionsKeyDown,
  } = useSelectorInteractions({
    options,
    value,
    open,
    setOpen,
    onSelect: onClick,
  })

  return (
    <S.SelectWrapper ref={wrapRef} css={css}>
      <S.Trigger
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        $open={open}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={ariaLabelledby}
        ref={triggerRef}
      >
        {value?.label.trim() !== '' && value ? (
          <span>{value.label}</span>
        ) : (
          <S.Placeholder>{placeholder}</S.Placeholder>
        )}
        <S.ArrowBox $open={open}>
          <Arrow width={16} height={16} aria-hidden />
        </S.ArrowBox>
      </S.Trigger>
      <S.Options
        $open={open}
        role="listbox"
        aria-labelledby={ariaLabelledby}
        aria-hidden={!open}
        onKeyDown={handleOptionsKeyDown}
      >
        {options.map((option, index) => (
          <S.OptionItem
            key={option.id}
            onClick={() => {
              handleOptionSelect(option)
            }}
            $selected={option.id === value?.id}
            role="option"
            aria-selected={option.id === value?.id}
            tabIndex={focusedIndex === index ? 0 : -1}
            ref={(el) => {
              optionRefs.current[index] = el
            }}
          >
            {option.label}
          </S.OptionItem>
        ))}
      </S.Options>
    </S.SelectWrapper>
  )
}
