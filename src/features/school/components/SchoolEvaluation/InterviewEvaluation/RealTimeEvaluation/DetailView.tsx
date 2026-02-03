import { useState } from 'react'

import Search from '@shared/assets/icons/search.svg?react'

import { INTERVIEW_QUESTIONS } from '@/features/school/mocks/interviewQuestions'
import Plus from '@/shared/assets/icons/plus.svg?react'
import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'

import AdditionalQuestionModal from '../../../modals/AdditionalQuestionModal/AdditionalQuestionModal'
import ApplicationModal from '../../../modals/ApplicationModal/ApplicationModal'
import EvaluationStatus from '../../EvaluationStatus/EvalutationStatus'
import FilterBar from '../../FilterBar/FilterBar'
import MyEvaluation from '../../MyEvaluation/MyEvaluation'
import QuestionItem from './QuestionItem'
import * as S from './RealTimeEvaluation.style'

const DetailView = ({
  selectedUser,
  onBack,
}: {
  selectedUser: {
    id: string
    name: string
  }
  onBack: () => void
}) => {
  const [modalOpen, setModalOpen] = useState<{
    isOpen: boolean
    id: string
    modalName: 'application' | 'additionalQuestion' | null
  }>({
    isOpen: false,
    id: '',
    modalName: null,
  })
  const [questionType, setQuestionType] = useState<
    'common' | 'firstChoice' | 'secondChoice' | 'additional'
  >('common')

  const onStartEdit = () => {
    // 저장 로직 구현
  }

  const handleRemoveQuestion = (id: string) => {
    console.log(id)
    // 취소 로직 구현
  }

  return (
    <S.Container>
      <S.DetailWrapper>
        <FilterBar
          leftChild={
            <S.UserInfo>
              <h1>{selectedUser.name}</h1>
              <Badge tone="lime" variant="outline" typo="B5.Md">
                Web
              </Badge>
              <Badge tone="lime" variant="outline" typo="B5.Md">
                SpringBoot
              </Badge>
            </S.UserInfo>
          }
          rightChild={
            <S.TopActions>
              <Button
                tone="gray"
                variant="solid"
                label="지원서 조회"
                Icon={Search}
                typo="B4.Sb"
                css={{ padding: '5.5px 14px', width: '122px' }}
                onClick={() =>
                  setModalOpen({ isOpen: true, id: selectedUser.id, modalName: 'application' })
                }
              />
              <Button
                tone="lime"
                variant="outline"
                typo="B4.Sb"
                label=" ← 뒤로가기"
                onClick={onBack}
                css={{ padding: '5.5px 14px', width: '122px' }}
              />
            </S.TopActions>
          }
        />

        <S.MainContent>
          {/* 왼쪽: 질문지 섹션 */}
          <S.ContentBox>
            <S.Header>
              <S.SubTitle>면접 질문지</S.SubTitle>
              <S.ToggleGroup>
                <S.ToggleButton
                  $active={questionType === 'common'}
                  onClick={() => setQuestionType('common')}
                >
                  공통
                </S.ToggleButton>
                <S.ToggleButton
                  $active={questionType === 'firstChoice'}
                  onClick={() => setQuestionType('firstChoice')}
                >
                  1지망
                </S.ToggleButton>
                <S.ToggleButton
                  $active={questionType === 'secondChoice'}
                  onClick={() => setQuestionType('secondChoice')}
                >
                  2지망
                </S.ToggleButton>
                <S.ToggleButton
                  $active={questionType === 'additional'}
                  onClick={() => setQuestionType('additional')}
                >
                  추가 질문
                </S.ToggleButton>
              </S.ToggleGroup>
            </S.Header>
            <S.Content>
              {INTERVIEW_QUESTIONS[questionType].map((item, idx) => (
                <QuestionItem
                  key={item.id}
                  index={idx + 1}
                  question={item.question}
                  ownerName={item.nickname + '/' + item.name}
                  onStartEdit={onStartEdit}
                  type={questionType}
                  editable={item.isEditable ?? false}
                  onRemove={() => handleRemoveQuestion(String(idx + 1))}
                />
              ))}
              {questionType === 'additional' && (
                <Section
                  variant="dashed"
                  flexDirection="row"
                  gap={6}
                  justifyContent="center"
                  css={{
                    color: theme.colors.gray[500],
                    cursor: 'pointer',
                    borderColor: '#4e4e4e',
                  }}
                  onClick={() =>
                    setModalOpen({
                      isOpen: true,
                      id: selectedUser.id,
                      modalName: 'additionalQuestion',
                    })
                  }
                >
                  <Plus />
                  문항 추가하기
                </Section>
              )}
            </S.Content>
          </S.ContentBox>

          {/* 오른쪽: 현황 및 입력 섹션 */}
          <S.SideColumn>
            <EvaluationStatus selectedUserId={selectedUser.id} />
            <MyEvaluation selectedUserId={selectedUser.id} />
          </S.SideColumn>
        </S.MainContent>
      </S.DetailWrapper>

      {modalOpen.isOpen && modalOpen.modalName === 'application' && (
        <ApplicationModal
          onClose={() =>
            setModalOpen({
              id: '',
              isOpen: false,
              modalName: null,
            })
          }
        />
      )}
      {modalOpen.isOpen && modalOpen.modalName === 'additionalQuestion' && (
        <AdditionalQuestionModal
          onClose={() =>
            setModalOpen({
              id: '',
              isOpen: false,
              modalName: null,
            })
          }
        />
      )}
    </S.Container>
  )
}

export default DetailView
