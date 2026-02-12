import type { ComponentProps, ComponentType } from 'react'

export type SvgIconComponent = ComponentType<
  ComponentProps<'svg'> & {
    title?: string
    titleId?: string
    desc?: string
    descId?: string
  }
>

// Badge 타입
export type BadgeTone = 'lime' | 'gray' | 'white' | 'necessary' | 'darkGray' | 'caution'
export type BadgeVariant = 'solid' | 'outline'

// Button 타입
export type ButtonTone = 'white' | 'lime' | 'kakao' | 'gray' | 'darkGray' | 'necessary' | 'caution'
export type ButtonVariant = 'solid' | 'outline'
