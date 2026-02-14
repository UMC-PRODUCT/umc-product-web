import { useEffect, useMemo, useState } from 'react'

import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import { useGetCurriculumsQuery } from '@/features/management/hooks/useManagementQueries'
import Edit from '@/shared/assets/icons/edit.svg?react'
import Plus from '@/shared/assets/icons/plus.svg?react'
import { PART_LIST, PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/part'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './Curriculum.style'

type WeekForm = {
  id?: string | number
  weekNo: number
  topic: string
  description: string
}

type CurriculumForm = {
  curriculumId?: string | number
  title: string
  weeks: Array<WeekForm>
}

const INITIAL_WEEKS: Array<WeekForm> = [{ weekNo: 1, topic: '', description: '' }]

const Curriculum = () => {
  const [selectedPart, setSelectedPart] = useState<PartType>('PLAN')
  const { data: curriculumData } = useGetCurriculumsQuery(selectedPart)
  const { usePutCurriculums } = useManagementMutations()
  const { mutate: saveCurriculums, isPending: isSaving } = usePutCurriculums()
  const [formsByPart, setFormsByPart] = useState<Record<PartType, CurriculumForm>>(() =>
    PART_LIST.reduce(
      (acc, part) => ({
        ...acc,
        [part]: { title: '', weeks: [...INITIAL_WEEKS] },
      }),
      {} as Record<PartType, CurriculumForm>,
    ),
  )

  const currentForm = useMemo(() => formsByPart[selectedPart], [formsByPart, selectedPart])

  useEffect(() => {
    const result = curriculumData?.result
    if (!result || result.part !== selectedPart) return

    const mappedWeeks =
      result.workbooks.length > 0
        ? result.workbooks
            .map((workbook, index) => ({
              id: workbook.id,
              weekNo: Number(workbook.weekNo) || index + 1,
              topic: workbook.title,
              description: workbook.description,
            }))
            .sort((a, b) => a.weekNo - b.weekNo)
        : [...INITIAL_WEEKS]

    setFormsByPart((prev) => ({
      ...prev,
      [selectedPart]: {
        curriculumId: result.id,
        title: result.title,
        weeks: mappedWeeks,
      },
    }))
  }, [curriculumData?.result, selectedPart])

  const updateTitle = (value: string) => {
    setFormsByPart((prev) => ({
      ...prev,
      [selectedPart]: { ...prev[selectedPart], title: value },
    }))
  }

  const updateWeekField = (weekNo: number, field: 'topic' | 'description', value: string) => {
    setFormsByPart((prev) => ({
      ...prev,
      [selectedPart]: {
        ...prev[selectedPart],
        weeks: prev[selectedPart].weeks.map((week) =>
          week.weekNo === weekNo ? { ...week, [field]: value } : week,
        ),
      },
    }))
  }

  const addWeek = () => {
    setFormsByPart((prev) => {
      const targetWeeks = prev[selectedPart].weeks
      const nextWeekNo = targetWeeks.length + 1

      return {
        ...prev,
        [selectedPart]: {
          ...prev[selectedPart],
          weeks: [...targetWeeks, { weekNo: nextWeekNo, topic: '', description: '' }],
        },
      }
    })
  }

  const handleSave = () => {
    saveCurriculums({
      id: currentForm.curriculumId,
      part: selectedPart,
      title: currentForm.title,
      workbooks: currentForm.weeks.map((week) => ({
        id: week.id,
        weekNo: week.weekNo,
        title: week.topic,
        description: week.description,
      })),
    })
  }

  return (
    <S.Container>
      <TabTitle>커리큘럼 관리</TabTitle>
      <TabSubtitle>파트별 커리큘럼을 수정할 수 있습니다.</TabSubtitle>
      <S.TopRow>
        <S.PartTabs>
          {PART_LIST.map((part) => (
            <S.PartButton
              key={part}
              type="button"
              $isActive={selectedPart === part}
              onClick={() => setSelectedPart(part)}
            >
              {PART_TYPE_TO_SMALL_PART[part]}
            </S.PartButton>
          ))}
        </S.PartTabs>
        <S.SaveButton type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? '저장 중...' : '저장'}
        </S.SaveButton>
      </S.TopRow>

      <S.Card>
        <S.Label>커리큘럼 제목</S.Label>
        <S.FieldInputWrap>
          <S.Input
            placeholder="커리큘럼 제목을 입력하세요."
            value={currentForm.title}
            onChange={(event) => updateTitle(event.target.value)}
          />
          <S.EditIconWrap>
            <Edit width={24} color={theme.colors.gray[300]} />
          </S.EditIconWrap>
        </S.FieldInputWrap>
      </S.Card>

      <Flex flexDirection="column" width="100%" gap={16}>
        {currentForm.weeks.map((week) => (
          <S.WeekCard key={week.weekNo}>
            <S.WeekNumber>{week.weekNo}</S.WeekNumber>
            <S.WeekBody>
              <S.FieldRow>
                <S.FieldLabel $active>주제</S.FieldLabel>
                <S.FieldInputWrap>
                  <S.FieldInput
                    placeholder="주제를 입력하세요."
                    value={week.topic}
                    onChange={(event) => updateWeekField(week.weekNo, 'topic', event.target.value)}
                  />
                  <S.EditIconWrap>
                    <Edit width={22} color={theme.colors.gray[300]} />
                  </S.EditIconWrap>
                </S.FieldInputWrap>
              </S.FieldRow>
              <S.FieldRow>
                <S.FieldLabel>세부 내용</S.FieldLabel>
                <S.FieldInputWrap>
                  <S.FieldInput
                    placeholder="주제별 내용을 입력하세요."
                    value={week.description}
                    onChange={(event) =>
                      updateWeekField(week.weekNo, 'description', event.target.value)
                    }
                  />
                  <S.EditIconWrap>
                    <Edit width={22} color={theme.colors.gray[300]} />
                  </S.EditIconWrap>
                </S.FieldInputWrap>
              </S.FieldRow>
            </S.WeekBody>
          </S.WeekCard>
        ))}
      </Flex>

      <S.AddWeekButton type="button" onClick={addWeek}>
        <Plus width={20} color={theme.colors.gray[500]} /> 주차 추가하기
      </S.AddWeekButton>
    </S.Container>
  )
}
export default Curriculum
