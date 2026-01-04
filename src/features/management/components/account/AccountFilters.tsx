import Search from '@shared/assets/icons/search.svg?react'
import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import { Button } from '@shared/ui/common/Button/Button'
import type { Option } from '@shared/ui/common/Dropdown/Dropdown'
import { Dropdown } from '@shared/ui/common/Dropdown/Dropdown'
import Flex from '@shared/ui/common/Flex/Flex'
import { TextField } from '@shared/ui/form/LabelTextField/TextField'

type AccountFiltersProps = {
  searchTerm: string
  onChangeSearch: (value: string) => void
  affiliated?: Option
  onSelectAffiliated: (option: Option) => void
  affiliatedOptions: Array<Option>
  role?: Option
  onSelectRole: (option: Option) => void
  roleOptions: Array<Option>
  status?: Option
  onSelectStatus: (option: Option) => void
  statusOptions: Array<Option>
}

export function AccountFilters({
  searchTerm,
  onChangeSearch,
  affiliated,
  onSelectAffiliated,
  affiliatedOptions,
  role,
  onSelectRole,
  roleOptions,
  status,
  onSelectStatus,
  statusOptions,
}: AccountFiltersProps) {
  return (
    <Flex gap="12px" css={{ flexWrap: 'wrap' }}>
      <Flex
        css={{
          maxWidth: '320px',
          [media.down(theme.breakPoints.desktop)]: {
            maxWidth: '100%',
          },
        }}
      >
        <TextField
          type="text"
          autoComplete="off"
          placeholder="이름, 이메일, 학교로 검색"
          Icon={Search}
          value={searchTerm}
          onChange={(e) => onChangeSearch(e.target.value)}
        />
      </Flex>
      <Flex
        css={{
          maxWidth: '212px',
          [media.down(theme.breakPoints.desktop)]: {
            maxWidth: '100%',
          },
        }}
      >
        <Dropdown
          options={affiliatedOptions}
          placeholder="전체 지부"
          value={affiliated}
          onChange={onSelectAffiliated}
        />
      </Flex>
      <Flex
        css={{
          maxWidth: '188px',
          [media.down(theme.breakPoints.desktop)]: {
            maxWidth: '100%',
          },
        }}
      >
        <Dropdown
          options={roleOptions}
          placeholder="전체 권한"
          value={role}
          onChange={onSelectRole}
        />
      </Flex>
      <Flex
        css={{
          maxWidth: '188px',

          [media.down(theme.breakPoints.desktop)]: {
            maxWidth: '100%',
          },
        }}
      >
        <Dropdown
          options={statusOptions}
          placeholder="전체 상태"
          value={status}
          onChange={onSelectStatus}
        />
      </Flex>
      <Flex
        css={{
          maxWidth: '76px',
          height: '40px',
          [media.down(theme.breakPoints.desktop)]: {
            maxWidth: '100%',
          },
        }}
      >
        <Button label="조회" tone="lime" onClick={() => {}} />
      </Flex>
    </Flex>
  )
}
