export const media = {
  down: (bp: string) => `@media (max-width: ${bp})`,
  up: (bp: string) => `@media (min-width: ${bp})`,
}
