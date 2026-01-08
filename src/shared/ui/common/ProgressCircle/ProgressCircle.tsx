import { theme } from '@/shared/styles/theme'

type ProgressCircleProps = {
  progress: number
}

const ProgressCircle = ({ progress }: ProgressCircleProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ transform: 'rotate(-90deg)' }}>
    <circle cx="12" cy="12" r="10" stroke={theme.colors.gray[600]} fill="none" strokeWidth="2" />
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={theme.colors.white}
      fill="none"
      strokeWidth="2"
      strokeDasharray={2 * Math.PI * 10}
      strokeDashoffset={2 * Math.PI * 10 * (1 - progress / 100)}
      style={{ transition: 'stroke-dashoffset 0.3s' }}
      strokeLinecap="round"
    />
  </svg>
)

export default ProgressCircle
