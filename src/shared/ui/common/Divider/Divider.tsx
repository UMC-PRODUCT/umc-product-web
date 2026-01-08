import { divStyle, spanStyle } from './Divider.style'

const Divider = ({ label }: { label: string }) => {
  return (
    <div css={divStyle}>
      <span css={spanStyle}>{label}</span>
    </div>
  )
}

export default Divider
