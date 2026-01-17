/**
 * 반응형 미디어 쿼리 유틸
 *
 * @example
 * ${media.down('768px')} { ... }
 */
export const media = {
  down: (bp: string) => `@media (max-width: ${bp})`,
  up: (bp: string) => `@media (min-width: ${bp})`,
}
