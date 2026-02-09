import type {
  DocumentEvaluationQuestion,
  GetDocumentEvaluationApplicationResponseDTO,
} from '@/features/apply/domain/model'
import { theme } from '@/shared/styles/theme'
import Loading from '@/shared/ui/common/Loading/Loading'
import { MiniTimeTable } from '@/shared/ui/common/Question/TimeTable/MiniTimeTable'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './ApplicationView.style'

const ApplicationView = ({
  data,
  isModal = false,
  isLoading = false,
}: {
  data: GetDocumentEvaluationApplicationResponseDTO | undefined
  isModal?: boolean
  isLoading?: boolean
}) => {
  const pageInfo = [
    { page: 1, label: '지원자 정보 및 희망 파트 선택' },
    { page: 2, label: '공통 문항' },
    { page: 3, label: '파트별 문항' },
  ]
  const toMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
  }
  const toTimeString = (minutes: number) => {
    const safeMinutes = Math.max(0, Math.min(1439, minutes))
    const h = Math.floor(safeMinutes / 60)
    const m = safeMinutes % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  }
  const buildScheduleView = (selected: Array<{ date: string; times: Array<string> }>) => {
    if (selected.length === 0) return null
    const dates = selected
      .map((slot) => slot.date)
      .filter(Boolean)
      .sort()
    if (dates.length === 0) return null

    const times = selected.flatMap((slot) => slot.times).filter(Boolean)
    if (times.length === 0) return null

    const minTime = Math.min(...times.map(toMinutes))
    const maxTime = Math.max(...times.map(toMinutes))
    const endTime = maxTime + 30

    return {
      dateRange: { start: dates[0], end: dates[dates.length - 1] },
      timeRange: { start: toTimeString(minTime), end: toTimeString(endTime) },
      value: selected.reduce<Record<string, Array<string>>>((acc, slot) => {
        acc[slot.date] = slot.times
        return acc
      }, {}),
    }
  }
  const renderAnswer = (question: DocumentEvaluationQuestion) => {
    const answer = question.answer
    if (!answer) return <S.EmptyAnswer>미응답</S.EmptyAnswer>

    const value = answer.rawValue as Record<string, any>
    switch (answer.answeredAsType) {
      case 'SHORT_TEXT':
      case 'LONG_TEXT':
        return <S.AnswerText>{value.text ?? answer.displayText ?? '—'}</S.AnswerText>
      case 'RADIO': {
        const option = question.options.find(
          (opt) => String(opt.optionId) === String(value.selectedOptionId),
        )
        return <S.AnswerText>{option?.content ?? answer.displayText ?? '—'}</S.AnswerText>
      }
      case 'CHECKBOX': {
        const ids: Array<string> = value.selectedOptionIds ?? []
        const labels = ids.map((id) => {
          const option = question.options.find((opt) => String(opt.optionId) === String(id))
          return option?.content ?? String(id)
        })
        if (value.otherText) labels.push(`기타: ${value.otherText}`)
        return (
          <S.AnswerGroup>
            {labels.length > 0 ? (
              <S.AnswerText>{labels.join(', ')}</S.AnswerText>
            ) : (
              <S.AnswerText>{answer.displayText ?? '-'}</S.AnswerText>
            )}
          </S.AnswerGroup>
        )
      }
      case 'PREFERRED_PART': {
        const values: Array<string> = value.preferredParts ?? []
        const labels = values.map((part) => String(part))
        return (
          <S.AnswerGroup>
            {labels.length > 0 ? <S.AnswerText>{labels.join(', ')}</S.AnswerText> : '-'}
          </S.AnswerGroup>
        )
      }
      case 'SCHEDULE': {
        const selected: Array<{ date: string; times: Array<string> }> = value.selected ?? []
        const scheduleView = buildScheduleView(selected)
        return (
          <S.AnswerGroup>
            {scheduleView ? (
              <S.TimetableWrapper>
                <MiniTimeTable
                  dateRange={scheduleView.dateRange}
                  timeRange={scheduleView.timeRange}
                  disabledSlots={[]}
                  value={scheduleView.value}
                  mode="view"
                />
              </S.TimetableWrapper>
            ) : (
              <span>—</span>
            )}
          </S.AnswerGroup>
        )
      }
      case 'DROPDOWN':
        return <S.AnswerText>{value.label ?? answer.displayText ?? '—'}</S.AnswerText>
      case 'PORTFOLIO': {
        const files = value.files ?? []
        const links = value.links ?? []
        return (
          <S.AnswerGroup>
            {files.length > 0 &&
              files.map((file: any) => {
                const url = file.url ?? file.link ?? file.fileUrl
                const label = file.fileName ?? file.name ?? file.fileId ?? file.id
                return (
                  <S.Hyperlink
                    key={file.fileId ?? file.fileName ?? file.id}
                    href={typeof url === 'string' ? url : undefined}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </S.Hyperlink>
                )
              })}
            {links.length > 0 &&
              links.map((link: any) => {
                const href = typeof link === 'string' ? link : link.url
                const label = typeof link === 'string' ? link : link.url
                return (
                  <S.Hyperlink key={label} href={href} target="_blank" rel="noreferrer">
                    {label}
                  </S.Hyperlink>
                )
              })}
            {files.length === 0 && links.length === 0 ? '—' : null}
          </S.AnswerGroup>
        )
      }
      default:
        return <S.AnswerText>{answer.displayText ?? JSON.stringify(value)}</S.AnswerText>
    }
  }

  return (
    <Section
      variant="both"
      height={'100%'}
      maxHeight={'100%'}
      padding={'10px 16px'}
      gap={'14px'}
      css={{ backgroundColor: `${theme.colors.gray[700]}`, flex: 1 }}
    >
      <S.Container>
        {isLoading && (
          <S.LoadingOverlay>
            <Loading size={24} label="불러오는 중" labelPlacement="bottom" />
          </S.LoadingOverlay>
        )}
        {!isModal && (
          <S.Header>
            <S.Title>
              {data?.applicant
                ? `${data.applicant.nickname}/${data.applicant.name} 님의 지원서`
                : ''}
            </S.Title>
          </S.Header>
        )}

        <S.PageList>
          {data?.formPages.map((page) => (
            <S.PageCard key={page.pageNo}>
              {(() => {
                let pageQuestionIndex = 0
                const nextIndex = () => {
                  pageQuestionIndex += 1
                  return pageQuestionIndex
                }
                const pageNo = Number(page.pageNo)

                return (
                  <>
                    <S.PageHeader>
                      <S.Page>Page {page.pageNo}</S.Page>
                      <S.PageInfo>{pageInfo[pageNo - 1]?.label}</S.PageInfo>
                    </S.PageHeader>

                    <S.QuestionsCard>
                      {page.questions.map((question) => (
                        <S.Question key={question.questionId}>
                          <S.QuestionTitle>
                            문항 {nextIndex()} - {question.questionText}
                          </S.QuestionTitle>
                          {renderAnswer(question)}
                        </S.Question>
                      ))}

                      {page.partQuestions.map((partGroup) => (
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
      </S.Container>
    </Section>
  )
}

export default ApplicationView
