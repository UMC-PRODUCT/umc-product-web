import { useQueryClient } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/domain'
import { useAuthMutation } from '@/features/auth/hooks/useAuthMutations'
import { useGetMemberOAuthMe } from '@/features/auth/hooks/useAuthQueries'
import Close from '@/shared/assets/icons/close.svg?react'
import AppleIcon from '@/shared/assets/social/apple.svg?react'
import GoogleIcon from '@/shared/assets/social/google.svg?react'
import KakaoIcon from '@/shared/assets/social/kakao.svg?react'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import Flex from '@/shared/ui/common/Flex/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import * as S from '@/shared/ui/modals/AccountModal/AccountModal.style'

import { Button } from '../../common/Button'

type AccountModalProps = {
  onClose: () => void
}

const AccountModalContent = () => {
  const { data } = useGetMemberOAuthMe()
  const queryClient = useQueryClient()
  const { setItem: setCurrentPage } = useLocalStorage('currentPage')
  const { setItem: setOAuthRedirectFrom } = useLocalStorage('oAuthRedirectFrom')
  const { setItem: setOAuthConnectingProvider } = useLocalStorage('oAuthConnectingProvider')
  const connectedProviders = new Set(data.map((item) => item.provider))
  const providerByType = data.reduce<Record<'KAKAO' | 'GOOGLE' | 'APPLE', string | null>>(
    (acc, item) => {
      acc[item.provider] = item.memberOAuthId
      return acc
    },
    { KAKAO: null, GOOGLE: null, APPLE: null },
  )
  const isConnected = (provider: 'KAKAO' | 'GOOGLE' | 'APPLE') => connectedProviders.has(provider)
  const { useDeleteMemberOAuth } = useAuthMutation()
  const { mutate: deleteOAuthMutate } = useDeleteMemberOAuth()
  const handleConnect = (provider: 'kakao' | 'google' | 'apple') => {
    if (typeof window === 'undefined') return
    setOAuthRedirectFrom('accountModal')
    setOAuthConnectingProvider(provider)
    setCurrentPage(window.location.pathname)
    const baseUrl = `${import.meta.env.VITE_SERVER_API_URL}/auth/oauth2/authorization/${provider}`
    window.location.href = baseUrl
  }

  const handleDisconnect = (memberOAuthId: string) => {
    deleteOAuthMutate(
      { memberOAuthId: Number(memberOAuthId) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: authKeys.getMemberOAuthMe().queryKey,
          })
        },
      },
    )
  }
  const disconnect = (provider: 'KAKAO' | 'GOOGLE' | 'APPLE') => {
    const memberOAuthId = providerByType[provider]
    if (!memberOAuthId) return
    handleDisconnect(memberOAuthId)
  }

  return (
    <S.ContentWrapper
      justifyContent="flex-start"
      width="100%"
      minHeight="50px"
      alignItems="center"
      flexDirection="column"
      gap={'16px'}
    >
      <S.SocialItem>
        <S.Social>
          <S.Logo bgColor={theme.colors.kakao}>
            <KakaoIcon width={30} height={30} />
          </S.Logo>
          카카오
        </S.Social>
        <Button
          typo="B4.Md"
          tone="gray"
          variant={isConnected('KAKAO') ? 'outline' : 'solid'}
          label={isConnected('KAKAO') ? '연결 해제' : '연결하기'}
          onClick={isConnected('KAKAO') ? () => disconnect('KAKAO') : () => handleConnect('kakao')}
        />
      </S.SocialItem>
      <S.Divider />
      <S.SocialItem>
        <S.Social>
          <S.Logo bgColor={theme.colors.white}>
            <GoogleIcon width={30} height={30} />
          </S.Logo>
          Google
        </S.Social>
        <Button
          typo="B4.Md"
          tone="gray"
          variant={isConnected('GOOGLE') ? 'outline' : 'solid'}
          label={isConnected('GOOGLE') ? '연결 해제' : '연결하기'}
          onClick={
            isConnected('GOOGLE') ? () => disconnect('GOOGLE') : () => handleConnect('google')
          }
        />
      </S.SocialItem>
      <S.Divider />
      <S.SocialItem>
        <S.Social>
          <S.Logo bgColor={theme.colors.white}>
            <AppleIcon width={30} height={30} />
          </S.Logo>
          Apple
        </S.Social>
        <Button
          typo="B4.Md"
          tone="gray"
          variant={isConnected('APPLE') ? 'outline' : 'solid'}
          label={isConnected('APPLE') ? '연결 해제' : '연결하기'}
          onClick={isConnected('APPLE') ? () => disconnect('APPLE') : () => handleConnect('apple')}
        />
      </S.SocialItem>
    </S.ContentWrapper>
  )
}

const AccountModal = ({ onClose }: AccountModalProps) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
          onPointerDownOutside={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="480px"
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                css={{ marginBottom: '33px' }}
              >
                <Modal.Title asChild>
                  <S.TitleGroup>
                    <S.Title>계정 연동</S.Title>
                    <S.Subtitle>계정을 연결하거나 연결을 해제할 수 있습니다.</S.Subtitle>
                  </S.TitleGroup>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[400]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <AsyncBoundary
                fallback={<SuspenseFallback label="계정 정보를 불러오는 중입니다." />}
                errorFallback={(error, reset) => (
                  <S.ContentWrapper
                    justifyContent="center"
                    width="100%"
                    minHeight="120px"
                    alignItems="center"
                    flexDirection="column"
                    gap={'16px'}
                  >
                    <ErrorPage
                      title="계정 정보를 불러오는 중 오류가 발생했습니다."
                      description={error.message || '잠시 후 다시 시도해 주세요.'}
                      onRetry={reset}
                    />
                  </S.ContentWrapper>
                )}
              >
                <AccountModalContent />
              </AsyncBoundary>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default AccountModal
