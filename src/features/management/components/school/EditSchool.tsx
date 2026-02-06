import { useState } from 'react'

import Search from '@shared/assets/icons/search.svg?react'

import { Flex } from '@/shared/ui/common/Flex'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import { UNI_LIST_MOCK } from '../../mocks/universities'
import SchoolStateButton from './SchoolStateButton'
import * as S from './shared'

const EditSchool = () => {
  const [page, setPage] = useState(1)

  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>학교 정보 수정</S.TabTitle>
        <S.TabSubtitle>기존 등록된 학교의 정보를 수정할 수 있습니다.</S.TabSubtitle>
      </S.TabHeader>
      <Flex width={300}>
        <TextField
          type="text"
          placeholder="학교명으로 검색"
          autoComplete="none"
          Icon={Search}
          IconPlaced="left"
        />
      </Flex>
      <Table
        headerLabels={['학교명', '비고', '상태']}
        showFooter={true}
        page={{
          currentPage: page,
          totalPages: 10,
          onChangePage: setPage,
        }}
        rows={UNI_LIST_MOCK}
        getRowId={(row) => row.id}
        renderRow={(row) => (
          <>
            <TableStyles.Td>
              <Flex alignItems="center" gap="12px">
                {/* TODO: 추후 학교 로고 이미지로 변경 */}
                <img
                  src="https://avatars.githubusercontent.com/u/111187984?v=4"
                  alt="학교 로고"
                  css={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
                {row.label}
              </Flex>
            </TableStyles.Td>
            <TableStyles.Td>{row.info}</TableStyles.Td>
            <TableStyles.Td>
              <SchoolStateButton isActive={row.status === '활성'} label={row.status} />
            </TableStyles.Td>
          </>
        )}
      />
    </>
  )
}

export default EditSchool
