import FilterBar from '@/features/school/components/SchoolEvaluation/FilterBar/FilterBar'
import Search from '@/shared/assets/icons/search.svg?react'
import type { Option } from '@/shared/types/form'
import { Dropdown } from '@/shared/ui/common/Dropdown/Dropdown'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

type AccountFiltersProps<TAffiliated, TRole, TStatus> = {
  searchTerm: string
  onChangeSearch: (value: string) => void
  affiliated?: Option<TAffiliated>
  onSelectAffiliated: (option: Option<TAffiliated>) => void
  affiliatedOptions: Array<Option<TAffiliated>>
  role?: Option<TRole>
  onSelectRole: (option: Option<TRole>) => void
  roleOptions: Array<Option<TRole>>
  status?: Option<TStatus>
  onSelectStatus: (option: Option<TStatus>) => void
  statusOptions: Array<Option<TStatus>>
}

export const AccountFilters = <TAffiliated, TRole, TStatus>({
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
}: AccountFiltersProps<TAffiliated, TRole, TStatus>) => {
  return (
    <FilterBar
      leftChild={
        <>
          <TextField
            type="text"
            autoComplete="off"
            placeholder="이름, 이메일, 학교로 검색"
            Icon={Search}
            value={searchTerm}
            onChange={(e) => onChangeSearch(e.target.value)}
            css={{ width: '252px' }}
          />
          <Dropdown
            options={affiliatedOptions}
            placeholder="전체 기수"
            value={affiliated}
            onChange={onSelectAffiliated}
          />
          <Dropdown
            options={affiliatedOptions}
            placeholder="전체 지부"
            value={affiliated}
            onChange={onSelectAffiliated}
          />
          <Dropdown
            options={roleOptions}
            placeholder="전체 학교"
            value={role}
            onChange={onSelectRole}
          />
          <Dropdown
            options={statusOptions}
            placeholder="전체 파트"
            value={status}
            onChange={onSelectStatus}
          />
          총 247명
        </>
      }
    />
  )
}
