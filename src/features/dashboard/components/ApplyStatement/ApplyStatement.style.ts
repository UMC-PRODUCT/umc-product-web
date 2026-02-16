import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'

export const spanStyle = {
  color: theme.colors.gray[300],
  ...theme.typography.C5.Md,
}

export const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  gap: '16px',
  width: '100%',
  [media.down(theme.breakPoints.tablet)]: {
    gridTemplateColumns: '1fr',
  },
}
