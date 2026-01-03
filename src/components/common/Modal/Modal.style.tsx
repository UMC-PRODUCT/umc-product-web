import styled from '@emotion/styled'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import { theme } from '@/styles/theme'

export const StyledOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);

  &[data-state='open'] {
    animation: fadeIn 200ms ease-out;
  }

  &[data-state='closed'] {
    animation: fadeOut 150ms ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

export const StyledContent = styled(DialogPrimitive.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  width: fit-content;

  &:focus {
    outline: none;
  }

  &[data-state='open'] {
    animation: contentShow 200ms ease-out;
  }

  &[data-state='closed'] {
    animation: contentHide 150ms ease-in;
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes contentHide {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Body = styled.div`
  flex: 1;
`

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

export const CloseButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.lime};
    outline-offset: 2px;
    border-radius: 4px;
  }
`
