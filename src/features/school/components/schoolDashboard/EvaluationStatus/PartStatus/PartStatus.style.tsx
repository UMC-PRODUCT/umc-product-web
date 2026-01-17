import styled from '@emotion/styled'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

type ColorValue = 'lime' | 'necessary' | 'gray[400]' | 'white'

const getColorValue = (colorKey: ColorValue): string => {
  if (colorKey === 'gray[400]') {
    return theme.colors.gray[400]
  }
  return theme.colors[colorKey]
}

export const PartFlex = styled.div<{ document: ColorValue; interview: ColorValue }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${theme.typography.B4.Md};
  white-space: nowrap;
  .part {
    color: ${theme.colors.white};
    width: 72px;
  }
  .document {
    color: ${(props) => getColorValue(props.document)};
    width: 80px;
  }
  .interview {
    color: ${(props) => getColorValue(props.interview)};
    width: 80px;
  }
`
export const Blur = styled.div`
  position: absolute;
  left: 0;
  right: 12px;
  bottom: 2px;
  height: 80px;
  pointer-events: none;
  padding: 15px;
  background: linear-gradient(
    to bottom,
    rgba(22, 22, 22, 0) 0%,
    rgba(22, 22, 22, 0.013) 8.1%,
    rgba(22, 22, 22, 0.049) 15.5%,
    rgba(22, 22, 22, 0.104) 22.5%,
    rgba(22, 22, 22, 0.175) 29%,
    rgba(22, 22, 22, 0.259) 35.3%,
    rgba(22, 22, 22, 0.352) 41.2%,
    rgba(22, 22, 22, 0.45) 47.1%,
    rgba(22, 22, 22, 0.55) 52.9%,
    rgba(22, 22, 22, 0.648) 58.8%,
    rgba(22, 22, 22, 0.741) 64.7%,
    rgba(22, 22, 22, 0.825) 71%,
    rgba(22, 22, 22, 0.896) 77.5%,
    rgba(22, 22, 22, 0.951) 84.5%,
    rgba(22, 22, 22, 0.987) 91.9%,
    #161616 100%
  );
  background-clip: content-box;
  background-color: transparent;

  ${media.down(theme.breakPoints.tablet)} {
    padding: 0 15px;
  }
`

export const Container = styled.div`
  gap: 17px;
  display: flex;
  flex-direction: column;
  max-height: 200px;
  width: 100%;
  overflow-y: auto;
`
