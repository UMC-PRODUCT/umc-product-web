import { REALTIME_EVALUATION_MOCK } from '@/features/school/mocks/application'
import { Dropdown } from '@/shared/ui/common/Dropdown'

import FilterBar from '../../FilterBar/FilterBar'
import EvaluationCard from '../EvaluationCard/EvaluationCard'
import * as S from './RealTimeEvaluation.style'

const ListView = ({
  onStartEval,
}: {
  onStartEval: (user: { id: string; name: string }) => void
}) => {
  return (
    <S.Container>
      <FilterBar
        leftChild={
          <>
            <Dropdown options={[]} placeholder="날짜" />
            <Dropdown options={[]} placeholder="전체 파트" />
          </>
        }
        rightChild={<S.FilterNotice>* 파트 필터는 1지망 기준입니다.</S.FilterNotice>}
      />

      <S.CardGrid>
        {REALTIME_EVALUATION_MOCK.map((item) => (
          <div key={item.time} css={{ gap: '14px', display: 'flex', flexDirection: 'column' }}>
            <S.TimeTitle>
              {item.time}
              <div className="divider" />
            </S.TimeTitle>
            <S.CardWrapper>
              {item.applicants.map((applicant) => (
                <EvaluationCard
                  key={applicant.id}
                  time={applicant.time}
                  name={applicant.name}
                  nickname={applicant.nickname}
                  score={applicant.score}
                  tags={applicant.tags}
                  status={applicant.status}
                  handleStartEval={() => onStartEval({ id: applicant.id, name: applicant.name })}
                />
              ))}
            </S.CardWrapper>
          </div>
        ))}
      </S.CardGrid>
    </S.Container>
  )
}

export default ListView
