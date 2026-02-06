import styled from '@emotion/styled'
import { useNavigate } from '@tanstack/react-router'

import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { theme } from '@/shared/styles/theme'
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
  onViewResume?: (candidateId: number) => void
}

export const CandidateTable = ({
  items,
  totalPages,
  currentPage,
  onChangePage,
  onViewResume,
}: CandidateTableProps) => {
  const navigate = useNavigate()
  const handleViewResume = (candidateId: number) => {
    if (onViewResume) {
      onViewResume(candidateId)
      return
    }
    navigate({ to: '/' })
  }

  return (
    <Section variant="solid" padding="12px 16px" height="500px">
      <Table
        showFooter={true}
        page={{
          currentPage: currentPage ?? 1,
          totalPages: totalPages ?? 1,
          onChangePage: onChangePage,
        }}
        headerLabels={[
          '번호',
          '닉네임/이름',
          '학교',
          '파트',
          '지원서',
          '서류 평가',
          '면접 평가',
          '최종 결과',
        ]}
        rows={items}
        getRowId={(item) => item.id}
        renderRow={(item) => (
          <>
            <TableStyles.Td>{item.id}</TableStyles.Td>
            <TableStyles.Td>
              {item.nickname} / {item.name}
            </TableStyles.Td>
            <TableStyles.Td>{item.school}</TableStyles.Td>
            <TableStyles.Td>{item.part.join(', ')}</TableStyles.Td>
            <TableStyles.Td>
              <Button
                tone="lime"
                variant="outline"
                label="지원서 보기"
                typo="B4.Md"
                css={{ width: 'fit-content', padding: '4px 18px' }}
                onClick={() => handleViewResume(item.id)}
              />
            </TableStyles.Td>
            <TableStyles.Td>
              {item.documentEvaluation ? (
                <Circle>{item.documentEvaluation}</Circle>
              ) : (
                <Button
                  tone="gray"
                  variant="outline"
                  label="평가 대기"
                  css={{
                    width: '76px',
                    height: '36px',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </TableStyles.Td>
            <TableStyles.Td>
              {item.interviewEvaluation ? (
                <Circle>{item.interviewEvaluation}</Circle>
              ) : (
                <Button
                  tone="gray"
                  variant="outline"
                  label="평가 대기"
                  css={{
                    width: '76px',
                    height: '36px',
                    cursor: 'default',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </TableStyles.Td>
            <TableStyles.Td>
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
            </TableStyles.Td>
          </>
        )}
      />
    </Section>
  )
}

const Circle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(149, 239, 75, 0.2);
  color: ${theme.colors.lime};
  display: flex;
  align-items: center;
  justify-content: center;
`
