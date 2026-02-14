import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'

import type { CandidateType } from '../../domain/model'

type CandidateTableProps = {
  items: Array<CandidateType> | undefined
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
    <Section variant="solid" padding="12px 16px">
      <Table
        showFooter={true}
        page={{
          currentPage: currentPage ?? 1,
          totalPages: totalPages ?? 1,
          onChangePage: onChangePage,
        }}
        headerLabels={['번호', '닉네임/이름', '학교', '파트', '최종 결과']}
        rows={items}
        getRowId={(item) => item.applicationId}
        renderRow={(item) => (
          <>
            <TableStyles.Td>{item.applicationId}</TableStyles.Td>
            <TableStyles.Td>
              {item.applicant.nickname}/{item.applicant.name}
            </TableStyles.Td>
            <TableStyles.Td>{item.school.name}</TableStyles.Td>
            <TableStyles.Td>{item.appliedParts.map((part) => part.part.label)}</TableStyles.Td>
            <TableStyles.Td>
              {item.finalResult.status === 'PASS' && (
                <Button
                  typo="B4.Md"
                  tone="lime"
                  label={`${item.finalResult.selectedPart.label} 합격`}
                  css={{
                    width: 'fit-content',
                    padding: '4px 18px',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                />
              )}
              {item.finalResult.status === 'WAITING' && (
                <Button
                  typo="B4.Md"
                  tone="darkGray"
                  label={'평가 대기'}
                  css={{
                    width: 'fit-content',
                    padding: '4px 18px',
                    cursor: 'default',
                    pointerEvents: 'none',
                    color: '#999999',
                    backgroundColor: '#2a2a2a',
                  }}
                />
              )}
              {item.finalResult.status === 'FAIL' && (
                <Button
                  typo="B4.Md"
                  tone="darkGray"
                  label={'불합격'}
                  css={{
                    width: 'fit-content',
                    padding: '4px 18px',
                    cursor: 'default',
                    pointerEvents: 'none',
                    color: '#999999',
                    backgroundColor: '#3a3a3a',
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
