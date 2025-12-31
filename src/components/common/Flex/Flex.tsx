export default function Flex({
  children,
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'center',
  gap = '0',
  style,
  width = '100%',
  padding,
  height,
  maxHeight,
  ...props
}: {
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
  padding?: string
  height?: string
  maxHeight?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
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
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
