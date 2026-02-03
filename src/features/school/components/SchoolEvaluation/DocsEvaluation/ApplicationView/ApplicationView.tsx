import type { GetApplicationAnswerResponseDTO } from '@/features/apply/domain/model'
import type { RecruitingForms } from '@/features/school/domain'
import { theme } from '@/shared/styles/theme'
import { MiniTimeTable } from '@/shared/ui/common/question/timeTable/MiniTimeTable'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './ApplicationView.style'

const ApplicationView = ({
  data,
  questions,
}: {
  data: GetApplicationAnswerResponseDTO
  questions: RecruitingForms
}) => {
  const answerMap = new Map(data.answers.map((answer) => [String(answer.questionId), answer]))
  const pageInfo = [
    { page: 1, label: '지원자 정보 및 희망 파트 선택' },
    { page: 2, label: '공통 문항' },
    { page: 3, label: '파트별 문항' },
  ]
  const renderAnswer = (question: any) => {
    const answer = answerMap.get(String(question.questionId))
    if (!answer) return <S.EmptyAnswer>미응답</S.EmptyAnswer>

    const value = answer.value as any
    switch (answer.answeredAsType) {
      case 'SHORT_TEXT':
      case 'LONG_TEXT':
        return <S.AnswerText>{value?.text ?? '—'}</S.AnswerText>
      case 'RADIO': {
        const option = question.options?.find(
          (opt: any) => String(opt.optionId) === String(value?.selectedOptionId),
        )
        return <S.AnswerText>{option?.content ?? '—'}</S.AnswerText>
      }
      case 'CHECKBOX': {
        const ids: Array<string> = value?.selectedOptionIds ?? []
        const labels = ids
          .map((id) => {
            return String(id)
          })
          .filter(Boolean)
        return (
          <S.AnswerGroup>
            {labels.length > 0 ? <S.AnswerText>{labels.join(', ')}</S.AnswerText> : '-'}
          </S.AnswerGroup>
        )
      }
      case 'PREFERRED_PART': {
        const values: Array<string> = value?.preferredParts ?? []
        const labels = values.map((part) => {
          const option = question.preferredPartOptions?.find(
            (opt: any) => String(opt.value) === String(part),
          )
          return option?.label ?? String(part)
        })
        return (
          <S.AnswerGroup>
            {labels.length > 0 ? <S.AnswerText>{labels.join(', ')}</S.AnswerText> : '-'}
          </S.AnswerGroup>
        )
      }
      case 'SCHEDULE': {
        const selected: Array<{ date: string; times: Array<string> }> = value?.selected ?? []
        return (
          <S.AnswerGroup>
            {selected.length > 0 ? (
              selected.map((slot) => (
                <S.ScheduleRow key={slot.date}>
                  <S.ScheduleDate>{slot.date}</S.ScheduleDate>
                  <S.ScheduleTimes>{slot.times.join(', ')}</S.ScheduleTimes>
                </S.ScheduleRow>
              ))
            ) : (
              <span>—</span>
            )}
          </S.AnswerGroup>
        )
      }
      case 'DROPDOWN':
        return <S.AnswerText>{value?.label}</S.AnswerText>
      case 'PORTFOLIO': {
        const files = value?.files ?? []
        const links = value?.links ?? []
        return (
          <S.AnswerGroup>
            {files.length > 0 &&
              files.map((file: any) => (
                <S.Hyperlink key={file.fileId ?? file.fileName}>{file.fileId}</S.Hyperlink>
              ))}
            {links.length > 0 &&
              links.map((link: any) => <S.Hyperlink key={link.url}>{link.url}</S.Hyperlink>)}
            {files.length === 0 && links.length === 0 ? '—' : null}
          </S.AnswerGroup>
        )
      }
      default:
        return <S.AnswerText>{JSON.stringify(value)}</S.AnswerText>
    }
  }

  const buildScheduleValue = (question: any) => {
    const answer = answerMap.get(String(question.questionId))
    if (!answer || answer.answeredAsType !== 'SCHEDULE') return {}
    const selected: Array<{ date: string; times: Array<string> }> = (answer.value as any)?.selected
    return selected.reduce<Record<string, Array<string>>>((acc, slot) => {
      acc[slot.date] = slot.times
      return acc
    }, {})
  }

  return (
    <Section
      variant="both"
      height={'100%'}
      maxHeight={'100%'}
      padding={'10px 16px'}
      gap={'14px'}
      css={{ backgroundColor: `${theme.colors.gray[700]}` }}
    >
      <S.Header>
        <S.Title>닉네임/성이름 님의 지원서</S.Title>
      </S.Header>

      <S.PageList>
        {questions.pages.map((page) => (
          <S.PageCard key={page.page}>
            {(() => {
              let pageQuestionIndex = 0
              const nextIndex = () => {
                pageQuestionIndex += 1
                return pageQuestionIndex
              }

              return (
                <>
                  <S.PageHeader>
                    <S.Page>Page {page.page}</S.Page>
                    <S.PageInfo>{pageInfo[page.page - 1]?.label}</S.PageInfo>
                  </S.PageHeader>

                  <S.QuestionsCard>
                    {page.questions?.map((question) => (
                      <S.Question key={question.questionId}>
                        <S.QuestionTitle>
                          문항 {nextIndex()} - {question.questionText}
                        </S.QuestionTitle>
                        {renderAnswer(question)}
                      </S.Question>
                    ))}

                    {page.scheduleQuestion && (
                      <S.Question key={page.scheduleQuestion.questionId}>
                        <S.QuestionTitle>
                          문항 {nextIndex()} - {page.scheduleQuestion.questionText}
                        </S.QuestionTitle>
                        <S.TimetableWrapper>
                          <MiniTimeTable
                            dateRange={page.scheduleQuestion.schedule.dateRange}
                            timeRange={page.scheduleQuestion.schedule.timeRange}
                            disabledSlots={page.scheduleQuestion.schedule.disabledByDate}
                            value={buildScheduleValue(page.scheduleQuestion)}
                            mode="view"
                          />
                        </S.TimetableWrapper>
                      </S.Question>
                    )}

                    {page.partQuestions?.map((partGroup) => (
                      <S.QuestionsCard key={partGroup.part}>
                        <S.AnswerGroup>
                          <S.Chip>{partGroup.part}</S.Chip>
                        </S.AnswerGroup>
                        {partGroup.questions.map((question, idx) => (
                          <S.Question key={question.questionId}>
                            <S.QuestionTitle>
                              문항 {idx + 1} - {question.questionText}
                            </S.QuestionTitle>
                            {renderAnswer(question)}
                          </S.Question>
                        ))}
                      </S.QuestionsCard>
                    ))}
                  </S.QuestionsCard>
                </>
              )
            })()}
          </S.PageCard>
        ))}
      </S.PageList>
    </Section>
  )
}

export default ApplicationView
