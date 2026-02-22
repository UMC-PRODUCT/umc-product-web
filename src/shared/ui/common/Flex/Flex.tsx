import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { Interpolation, Theme } from '@emotion/react'

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

const Flex = ({
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
}: FlexProps) => {
  const domProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !key.startsWith('$')),
  ) as Omit<HTMLAttributes<HTMLDivElement>, 'style'>

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
      {...domProps}
    >
      {children}
    </div>
  )
}

export default Flex
