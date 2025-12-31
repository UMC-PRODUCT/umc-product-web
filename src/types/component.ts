import type { ComponentProps, ComponentType } from 'react'

export type SvgIconComponent = ComponentType<
  ComponentProps<'svg'> & {
    title?: string
    titleId?: string
    desc?: string
    descId?: string
  }
>
