import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  previewAnnotations: (entries = []) =>
    (entries as Array<string | { bare?: string; absolute?: string }>)
      .map((entry) => {
        if (typeof entry === 'string') return entry

        // Work around Storybook builder-vite preview annotation hash collision.
        if (entry.bare === '@storybook/addon-docs/dist/preview.js') {
          return './.storybook/addon-docs-preview-shim.ts'
        }

        return entry.absolute ?? entry.bare ?? ''
      })
      .filter(Boolean),
}
export default config
