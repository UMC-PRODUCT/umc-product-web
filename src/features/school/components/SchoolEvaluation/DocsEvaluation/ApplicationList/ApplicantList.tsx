import CheckIcon from '@shared/assets/icons/check.svg?react'
import Search from '@shared/assets/icons/search.svg?react'

import { theme } from '@/shared/styles/theme'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import Section from '@/shared/ui/common/Section/Section'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import * as S from './ApplicationList.style'
// 임시 데이터 (실제 데이터로 교체 필요)
const DUMMY_APPLICANTS = Array.from({ length: 11 }, (_, i) => ({
  id: `${i}`,
  name: '닉넴/성이름',
  part: 'SpringBoot, Web',
  isEvaluated: true,
}))

const ApplicantList = ({
  selectedUserId,
  setSelectedUserId,
}: {
  selectedUserId: string | null
  setSelectedUserId: (selectedUserId: string | null) => void
}) => {
  return (
    <Section variant="solid" padding={'16px'} gap={'12px'}>
      <S.Header>
        <S.SubTitle>지원자 목록</S.SubTitle>
        <S.Info>22명 중 0명 완료</S.Info>
      </S.Header>

      <S.FilterWrapper>
        <TextField
          Icon={Search}
          placeholder="닉네임, 이름으로 검색"
          type="text"
          autoComplete="none"
          width={170}
          css={{ maxHeight: '40px', padding: '9px 12px', ...theme.typography.B4.Rg }}
        />
        <Dropdown
          placeholder="전체 파트"
          options={[
            {
              label: '전체 파트',
              id: 0,
            },
            { label: 'SpringBoot', id: 1 },
            { label: 'Node.js', id: 2 },
          ]}
          className="dropdown"
          css={{ maxHeight: '40px', ...theme.typography.B4.Rg }}
        />
      </S.FilterWrapper>

      <S.ListContainer>
        <S.TableHeader>
          <span>닉네임/이름</span>
          <span>파트</span>
          <span>평가</span>
        </S.TableHeader>

        <S.ScrollArea>
          {DUMMY_APPLICANTS.map((applicant) => (
            <S.ListItem
              key={applicant.id}
              isSelected={selectedUserId === applicant.id}
              onClick={() => setSelectedUserId(applicant.id)}
            >
              <S.Name>{applicant.name}</S.Name>
              <S.Part>{applicant.part}</S.Part>
              <S.StatusCircle isEvaluated={applicant.isEvaluated}>
                {applicant.isEvaluated && <CheckIcon width={10} height={10} />}
              </S.StatusCircle>
            </S.ListItem>
          ))}
        </S.ScrollArea>
      </S.ListContainer>
    </Section>
  )
}

export default ApplicantList
