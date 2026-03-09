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
const APP_HTML_MARKER = '<!--app-html-->'
const APP_PRERENDERED_FALSE = 'data-prerendered="false"'
const APP_PRERENDERED_TRUE = 'data-prerendered="true"'

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
  if (!rootHtml.includes(APP_HTML_MARKER)) {
    throw new Error('Prerender marker was not found in dist/index.html.')
  }
  if (!rootHtml.includes(APP_PRERENDERED_FALSE)) {
    throw new Error('Prerender root attribute was not found in dist/index.html.')
  }

  const prerenderedHtml = rootHtml
    .replace(APP_HTML_MARKER, appHtml)
    .replace(APP_PRERENDERED_FALSE, APP_PRERENDERED_TRUE)

  await writeFile(rootHtmlPath, prerenderedHtml, 'utf8')
} finally {
  await rm(prerenderDir, { recursive: true, force: true })
}
