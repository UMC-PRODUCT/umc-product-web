import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const prerenderDir = path.join(projectRoot, '.prerender')
const serverDir = path.join(prerenderDir, 'server')
const rootHtmlPath = path.join(distDir, 'index.html')

const resolveServerEntryPath = async () => {
  const serverFiles = await readdir(serverDir)
  const entryFile = serverFiles.find((file) => /^prerender-root\.(m?js|cjs)$/.test(file))

  if (!entryFile) {
    throw new Error('prerender-root server entry was not found.')
  }

  return path.join(serverDir, entryFile)
}

try {
  const rootHtml = await readFile(rootHtmlPath, 'utf8')
  const serverEntryPath = await resolveServerEntryPath()
  const { renderRootPage } = await import(pathToFileURL(serverEntryPath).href)
  const appHtml = await renderRootPage()

  const prerenderedHtml = rootHtml.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`)

  if (prerenderedHtml === rootHtml) {
    throw new Error('Failed to inject prerendered root markup into dist/index.html.')
  }

  await writeFile(rootHtmlPath, prerenderedHtml, 'utf8')
} finally {
  await rm(prerenderDir, { recursive: true, force: true })
}
