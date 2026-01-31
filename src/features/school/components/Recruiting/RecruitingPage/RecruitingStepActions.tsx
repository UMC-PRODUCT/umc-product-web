import Check from '@/shared/assets/icons/check.svg?react'
import Search from '@/shared/assets/icons/search_bold.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

type RecruitingStepActionsProps = {
  step: number
  canProceedStep: boolean
  onPrev: () => void
  onNext: () => void
  onTempSave: () => void
  onOpenPreview: () => void
  onOpenConfirm: () => void
  isLocked?: boolean
  isSubmitting?: boolean
}

const RecruitingStepActions = ({
  step,
  canProceedStep,
  onPrev,
  onNext,
  onTempSave,
  onOpenPreview,
  onOpenConfirm,
  isLocked = false,
  isSubmitting = false,
}: RecruitingStepActionsProps) => {
  return (
    <Flex
      justifyContent="space-between"
      gap={step === 5 ? 10 : 0}
      css={{
        height: '40px',
        [media.down(theme.breakPoints.mobile)]: {
          flexDirection: 'column',
          gap: '10px',
          height: '100px',
        },
      }}
    >
      <Flex width={'fit-content'} height={39} gap={18}>
        <Button
          tone="gray"
          variant="outline"
          label={step == 1 ? '취소' : '← 이전 단계'}
          css={{ width: step == 1 ? 70 : 120 }}
          onClick={onPrev}
        />
        <Button
          tone="lime"
          variant="outline"
          label="임시 저장"
          css={{ width: 98 }}
          onClick={onTempSave}
        />
      </Flex>
      <Flex width={'fit-content'} height={39}>
        {step < 5 && (
          <Flex width={'fit-content'} height={39}>
            <Button
              tone={canProceedStep ? 'lime' : 'gray'}
              variant="solid"
              label="다음 단계 →"
              css={{ width: 118 }}
              disabled={!canProceedStep || isSubmitting}
              onClick={onNext}
            />
          </Flex>
        )}
        {step === 5 && (
          <Flex width={330} height={39} gap={18}>
            <Button
              tone="gray"
              variant="solid"
              typo="B3.Sb"
              label="지원서 미리보기"
              css={{ width: 163 }}
              onClick={onOpenPreview}
              disabled={isSubmitting}
              iconColor={theme.colors.black}
              Icon={Search}
            />
            <Button
              tone="lime"
              variant="solid"
              label={
                isSubmitting
                  ? isLocked
                    ? '수정 중...'
                    : '생성 중...'
                  : isLocked
                    ? '모집 수정하기'
                    : '모집 생성하기'
              }
              typo="B3.Sb"
              css={{ width: 149 }}
              Icon={Check}
              isLoading={isSubmitting}
              onClick={onOpenConfirm}
              disabled={isSubmitting}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default RecruitingStepActions
