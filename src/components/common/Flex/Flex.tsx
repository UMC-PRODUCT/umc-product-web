import type { Interpolation, Theme } from '@emotion/react'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

type FlexStyleProps = Pick<
  CSSProperties,
  | 'flexDirection'
  | 'alignItems'
  | 'justifyContent'
  | 'gap'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'maxWidth'
  | 'minHeight'
  | 'maxHeight'
  | 'padding'
  | 'margin'
  | 'flex'
  | 'flexWrap'
  | 'flexGrow'
  | 'flexShrink'
>

type FlexProps = FlexStyleProps & {
  children?: ReactNode
  style?: CSSProperties
  css?: Interpolation<Theme>
} & Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export default function Flex({
  children,
  flexDirection,
  alignItems = 'center',
  justifyContent,
  gap,
  width = '100%',
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  padding,
  margin,
  flex,
  flexWrap,
  flexGrow,
  flexShrink,
  style,
  css: cssProp,
  ...props
}: FlexProps) {
  return (
    <div
      css={cssProp}
      style={{
        display: 'flex',
        flexDirection,
        alignItems,
        justifyContent,
        gap,
        width,
        height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        padding,
        margin,
        flex,
        flexWrap,
        flexGrow,
        flexShrink,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
