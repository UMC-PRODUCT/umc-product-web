import Search from '@/assets/icons/search.svg?react'
import Button from '@/components/common/Button/Button'
import Dropdown from '@/components/common/Dropdown/Dropdown'
import Flex from '@/components/common/Flex/Flex'
import { TextField } from '@/components/common/LabelTextField/TextField'
import type { Option } from '@/hooks/useSelectorInteractions'
import { AFFILIATED_MOCK, ROLE_MOCK, STATUS_MOCK } from '@/mocks/mocks'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

type AccountFiltersProps = {
  searchTerm: string
  onChangeSearch: (value: string) => void
  affiliated?: Option
  onSelectAffiliated: (option: Option) => void
  affiliatedOpen: boolean
  setAffiliatedOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  role?: Option
  onSelectRole: (option: Option) => void
  roleOpen: boolean
  setRoleOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  status?: Option
  onSelectStatus: (option: Option) => void
  statusOpen: boolean
  setStatusOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

export function AccountFilters({
  searchTerm,
  onChangeSearch,
  affiliated,
  onSelectAffiliated,
  affiliatedOpen,
  setAffiliatedOpen,
  role,
  onSelectRole,
  roleOpen,
  setRoleOpen,
  status,
  onSelectStatus,
  statusOpen,
  setStatusOpen,
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
          options={AFFILIATED_MOCK}
          placeholder="전체 지부"
          value={affiliated}
          onClick={onSelectAffiliated}
          open={affiliatedOpen}
          setOpen={setAffiliatedOpen}
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
          options={ROLE_MOCK}
          placeholder="전체 권한"
          value={role}
          onClick={onSelectRole}
          open={roleOpen}
          setOpen={setRoleOpen}
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
          options={STATUS_MOCK}
          placeholder="전체 상태"
          value={status}
          onClick={onSelectStatus}
          open={statusOpen}
          setOpen={setStatusOpen}
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
