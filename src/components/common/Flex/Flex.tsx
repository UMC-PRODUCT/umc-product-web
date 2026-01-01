import type { Interpolation, Theme } from '@emotion/react'
import type React from 'react'

type FlexProps = {
  children: React.ReactNode
  direction?: 'row' | 'column'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  gap?: string
  style?: React.CSSProperties
  width?: '100%' | 'fit-content' | 'auto' | string
  minWidth?: string
  maxWidth?: string
  height?: string
  maxHeight?: string
  minHeight?: string
  padding?: string
  css?: Interpolation<Theme>
} & React.HTMLAttributes<HTMLDivElement>

export default function Flex({
  children,
  direction,
  alignItems = 'center',
  justifyContent,
  gap,
  style,
  width = '100%',
  maxWidth,
  padding,
  height,
  maxHeight,
  minHeight,
  minWidth,
  css,
  ...props
}: FlexProps) {
  return (
    <div
      css={css}
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems: alignItems,
        justifyContent: justifyContent,
        gap: gap,
        width: width,
        padding: padding,
        height: height,
        maxHeight: maxHeight,
        minHeight: minHeight,
        minWidth: minWidth,
        maxWidth: maxWidth,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
