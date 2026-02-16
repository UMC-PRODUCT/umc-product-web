import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { getRecruitments, patchRecruitmentApplicationFormDraft } from '@/features/school/domain/api'
import { schoolKeys } from '@/features/school/domain/queryKeys'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import { buildQuestionsPayload } from '@/features/school/utils/recruiting/recruitingPayload'
import { ensureRequiredItems } from '@/features/school/utils/recruiting/requiredItems'
import Create from '@/shared/assets/icons/create.svg?react'
import Load from '@/shared/assets/icons/load.svg?react'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import ConfirmGetRecruitmentModal from '../../modals/ConfirmGetRecruitmentModal/ConfirmGetRecruitmentModal'
import TempRecruitmentModal from '../../modals/TempRecruitmentModal/TempRecruitmentModal'
import * as S from './RecruitingMake.style'

const RecruitingMake = () => {
  const [openModal, setOpenModal] = useState(false)
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean
    publishedRecruitmentId: string | null
  }>({
    isOpen: false,
    publishedRecruitmentId: null,
  })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { usePostRecruitmentCreate } = useRecruitingMutation()
  const { mutate: postFirstRecruitmentMutate } = usePostRecruitmentCreate()

  const createRecruitingFromScratch = () => {
    postFirstRecruitmentMutate(undefined, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: schoolKeys.getRecruitments({ status: 'ONGOING' }),
        })
        const recruitingId = data.result.recruitmentId
        const requiredItems = ensureRequiredItems([], [], {
          requirePreferred: true,
          requireSchedule: true,
          requirePage2: true,
          requireParts: [],
        })
        patchRecruitmentApplicationFormDraft(String(recruitingId), {
          items: buildQuestionsPayload(requiredItems),
        }).then(() => {
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getRecruitmentApplicationFormDraft(String(recruitingId)),
          })
        })
        navigate({
          to: '/school/recruiting/$recruitingId',
          params: { recruitingId: String(recruitingId) },
          search: {
            source: 'temp',
            step: 1,
          },
        })
      },
    })
  }

  const handleCreateRecruiting = async () => {
    try {
      const [ongoingResponse, scheduledResponse] = await Promise.all([
        getRecruitments({ status: 'ONGOING' }),
        getRecruitments({ status: 'SCHEDULED' }),
      ])
      const recruitments = [
        ...ongoingResponse.result.recruitments,
        ...scheduledResponse.result.recruitments,
      ]
      const targetRecruitment = recruitments.find(
        (item) => item.status === 'PUBLISHED' && item.editable,
      )

      if (targetRecruitment) {
        setConfirmModalState({
          isOpen: true,
          publishedRecruitmentId: String(targetRecruitment.recruitmentId),
        })
        return
      }
    } catch (error) {
      console.error('Failed to fetch published recruitments:', error)
    }

    createRecruitingFromScratch()
  }

  const handleLoadRecruiting = () => {
    setOpenModal(true)
  }
  return (
    <Flex gap={20} flexDirection="column">
      <PageTitle title="모집 작성" />
      <Section variant="outline" padding={16}>
        <S.Grid>
          <S.Card
            variant="solid"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={14}
            onClick={handleCreateRecruiting}
          >
            <Create />
            <Flex alignItems="flex-start" flexDirection="column" width={'fit-content'}>
              <span className="title">새로운 모집 생성하기</span>
              <span className="description">처음부터 새로 작성</span>
            </Flex>
          </S.Card>
          <S.Card
            variant="solid"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            gap={14}
            onClick={handleLoadRecruiting}
          >
            <Load />
            <Flex alignItems="flex-start" flexDirection="column" width={'fit-content'}>
              <span className="title">임시저장 모집 불러오기</span>
              <span className="description">작성 중인 모집 이어서 작성</span>
            </Flex>
          </S.Card>
        </S.Grid>
      </Section>
      {openModal && <TempRecruitmentModal onClose={() => setOpenModal(false)} />}
      {confirmModalState.isOpen && (
        <ConfirmGetRecruitmentModal
          onClose={() => {
            setConfirmModalState({
              isOpen: false,
              publishedRecruitmentId: null,
            })
            createRecruitingFromScratch()
          }}
          onConfirm={() => {
            const recruitmentId = confirmModalState.publishedRecruitmentId
            setConfirmModalState({
              isOpen: false,
              publishedRecruitmentId: null,
            })
            if (recruitmentId) {
              console.log('published recruitment id:', recruitmentId)
            }
          }}
        />
      )}
    </Flex>
  )
}
export default RecruitingMake
