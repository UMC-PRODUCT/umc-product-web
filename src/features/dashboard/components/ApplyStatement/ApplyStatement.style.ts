import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const spanStyle = {
  color: theme.colors.gray[300],
  ...theme.typography.B4.Md,
}

export const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  gap: '28px',
  width: '100%',
  [media.down(theme.breakPoints.tablet)]: {
    gridTemplateColumns: '1fr',
  },
}
