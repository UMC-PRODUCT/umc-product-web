// @ts-check

/** @type {import('lint-staged').Configuration} */
export default {
  '*.{ts,tsx}': (files) => {
    const filtered = files.filter((f) => !f.endsWith('.gen.ts') && !f.endsWith('.d.ts'))
    if (filtered.length === 0) return []
    return [`eslint --fix ${filtered.join(' ')}`, `prettier --write ${filtered.join(' ')}`]
  },
  '*.{js,jsx,cjs,mjs}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,html,yml,yaml}': ['prettier --write'],
}
