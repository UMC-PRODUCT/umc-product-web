import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

function IntroBanner() {
  return (
    <div
      css={{
        width: '50%',
        backgroundColor: theme.colors.white,
        height: '100%',
        [media.down(theme.breakPoints.tablet)]: {
          display: 'none',
        },
      }}
    ></div>
  )
}

export default IntroBanner
