import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

function IntroBanner() {
  return (
    <div
      css={{
        width: '100%',
        backgroundColor: theme.colors.white,
        height: '100%',
        [media.down(theme.breakPoints.desktop)]: {
          display: 'none',
        },
      }}
    ></div>
  )
}

export default IntroBanner
