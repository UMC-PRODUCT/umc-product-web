import { PART } from '@/shared/constants/umc'
import type {
  PartQuestionBank,
  PartQuestionBankPayload,
  RecruitingPart,
  RecruitingQuestion,
} from '@/shared/types/form'

const PART_KEY_MAP: Record<RecruitingPart, string> = {
  PLAN: 'Plan',
  DESIGN: 'Design',
  WEB: 'Web',
  IOS: 'iOS',
  ANDROID: 'Android',
  SPRINGBOOT: 'SpringBoot',
  NODEJS: 'Node.js',
}

const PART_KEY_REVERSE: Record<string, RecruitingPart> = Object.entries(PART_KEY_MAP).reduce(
  (acc, [part, key]) => {
    acc[key] = part as RecruitingPart
    return acc
  },
  {} as Record<string, RecruitingPart>,
)

export const getPartKey = (part: RecruitingPart) => PART_KEY_MAP[part]

export const getPartFromKey = (key: string) => PART_KEY_REVERSE[key]

export const buildPartQuestionBankPayload = (
  bank: PartQuestionBank,
  recruitingPart: Array<RecruitingPart>,
) => {
  return recruitingPart.reduce<PartQuestionBankPayload>((acc, part) => {
    const key = getPartKey(part)
    acc[part] = bank[key] ?? []
    return acc
  }, {})
}

export const getAllQuestionIdsFromPartBank = (bank: PartQuestionBank) =>
  Object.values(bank).flatMap((questions) =>
    Array.isArray(questions)
      ? questions.map((question) => question.questionId)
      : ([] as Array<RecruitingQuestion['questionId']>),
  )

export const getInitialPartQuestionBank = (recruitingPart: Array<RecruitingPart>) =>
  recruitingPart.reduce<PartQuestionBank>((acc, part) => {
    const key = getPartKey(part)
    if (!acc[key]) {
      acc[key] = []
    }
    return acc
  }, {})

export const getPartQuestionBankKeys = () => PART.map((part) => getPartKey(part))
