import { divStyle, spanStyle } from './Divider.style'

export default function Divider({ label }: { label: string }) {
  return (
    <div css={divStyle}>
      <span css={spanStyle}>{label}</span>
    </div>
  )
}
