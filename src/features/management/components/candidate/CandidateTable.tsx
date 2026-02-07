import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'

import type { CandidateType } from '../../mocks/candidates'

type CandidateTableProps = {
  items: Array<CandidateType>
  totalPages?: number
  currentPage?: number
  onChangePage?: (page: number) => void
}

export const CandidateTable = ({
  items,
  totalPages,
  currentPage,
  onChangePage,
}: CandidateTableProps) => {
  return (
    <Section variant="solid" padding="12px 16px" height="500px">
      <Table
        showFooter={true}
        page={{
          currentPage: currentPage ?? 1,
          totalPages: totalPages ?? 1,
          onChangePage: onChangePage,
        }}
        headerLabels={['번호', '닉네임/이름', '학교', '파트', '최종 결과']}
        rows={items}
        getRowId={(item) => item.id}
        renderRow={(item) => (
          <>
            <TableStyles.Td>{item.id}</TableStyles.Td>
            <TableStyles.Td>
              {item.nickname}/{item.name}
            </TableStyles.Td>
            <TableStyles.Td>{item.school}</TableStyles.Td>
            <TableStyles.Td>
              {item.part.map((part) => PART_TYPE_TO_SMALL_PART[part]).join(', ')}
            </TableStyles.Td>
            <TableStyles.Td>
              {item.finalResult.status === '합격' && (
                <Button
                  typo="B4.Md"
                  tone="lime"
                  label={`${PART_TYPE_TO_SMALL_PART[item.finalResult.part]} ${item.finalResult.status}`}
                  css={{
                    width: 'fit-content',
                    padding: '4px 18px',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                />
              )}
              {item.finalResult.status === '대기' && (
                <Button
                  typo="B4.Md"
                  tone="darkGray"
                  label={'평가 대기'}
                  css={{
                    width: 'fit-content',
                    padding: '4px 18px',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                />
              )}
              {item.finalResult.status === '불합격' && (
                <Button
                  typo="B4.Md"
                  tone="gray"
                  label={'불합격'}
                  css={{
                    width: 'fit-content',
                    padding: '4px 18px',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </TableStyles.Td>
          </>
        )}
      />
    </Section>
  )
}
