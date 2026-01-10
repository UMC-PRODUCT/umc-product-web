type QuestionBase = {
  id: string // 질문 고유 ID
  title: string // 질문 텍스트
  required?: boolean
  description?: string
}

export type Option<T> = { label: T; id: string | number }

export type Question =
  | (QuestionBase & {
      type: 'text'
      placeholder?: string
      maxLength?: number
    })
  | (QuestionBase & {
      type: 'single'
      options: Array<Option<string>> // 라디오
    })
  | (QuestionBase & {
      type: 'multi'
      options: Array<Option<string>> // 체크박스
      minSelected?: number
      maxSelected?: number
    })
  | (QuestionBase & {
      type: 'timeslots'
      days: Array<{ value: string; label: string }>
      hours: Array<number>
      slotMinutes?: 30 | 60
    })
  | (QuestionBase & {
      type: 'file'
      accept?: Array<string> // ['application/pdf', 'image/*']
      maxSizeMB?: number
    })
  | (QuestionBase & {
      type: 'url'
      pattern?: string // 정규식 string
    })
