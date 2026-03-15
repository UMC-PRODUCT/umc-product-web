import type { RefObject } from 'react'

import type { Option } from '@/shared/types/form'
import { Dropdown } from '@/shared/ui/common/Dropdown'

import * as S from './AccountCode.style'

type AccountCodeGisuSelectorProps = {
  dropdownRef: RefObject<HTMLButtonElement | null>
  isHighlighted: boolean
  gisuOptions: Array<Option<string>>
  selectedGisuOption?: Option<string>
  isGisuLoading: boolean
  onSelectGisu: (option: Option<string>) => void
}

const AccountCodeGisuSelector = ({
  dropdownRef,
  isHighlighted,
  gisuOptions,
  selectedGisuOption,
  isGisuLoading,
  onSelectGisu,
}: AccountCodeGisuSelectorProps) => (
  <S.GisuSelector>
    <S.GisuDropdownFrame $isHighlighted={isHighlighted}>
      <Dropdown
        ref={dropdownRef}
        options={gisuOptions}
        placeholder="기수를 선택해 주세요"
        value={selectedGisuOption}
        disabled={isGisuLoading}
        onChange={onSelectGisu}
        css={{ width: '300px' }}
      />
    </S.GisuDropdownFrame>
    <S.GisuGuideText $isHighlighted={isHighlighted} role="status" aria-live="polite">
      {isHighlighted
        ? '기수를 먼저 선택해 주세요.'
        : '기수를 선택하면 아래 기록 항목을 입력할 수 있어요.'}
    </S.GisuGuideText>
  </S.GisuSelector>
)

export default AccountCodeGisuSelector
