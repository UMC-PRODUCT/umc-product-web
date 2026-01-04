import type { ComponentProps, ComponentType } from 'react'

export type SvgIconComponent = ComponentType<
  ComponentProps<'svg'> & {
    title?: string
    titleId?: string
    desc?: string
    descId?: string
  }
>

// 공통 타입 정의
export type NavItem = {
  label: string
  link: string
}

export type SocialLink = NavItem & {
  icon: 'kakao' | 'instagram' | 'youtube'
}

// Badge 타입
export type BadgeTone = 'lime' | 'gray' | 'white'
export type BadgeVariant = 'solid' | 'outline'

// Button 타입
export type ButtonTone = 'white' | 'lime' | 'kakao' | 'gray' | 'darkGray' | 'necessary' | 'caution'
export type ButtonVariant = 'solid' | 'outline'
