import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const host = process.env.HOST ?? '127.0.0.1'
const port = Number(process.env.PORT ?? 4173)

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
}

const tryReadFile = async (filePath) => {
  try {
    const fileStat = await stat(filePath)

    if (!fileStat.isFile()) {
      return null
    }

    return await readFile(filePath)
  } catch {
    return null
  }
}

const resolveContentType = (filePath) => {
  const extension = path.extname(filePath).toLowerCase()
  return MIME_TYPES[extension] ?? 'application/octet-stream'
}

createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)
  const pathname = decodeURIComponent(requestUrl.pathname)
  const normalizedPath = pathname.replace(/^\/+/, '')
  const assetPath = path.resolve(distDir, normalizedPath)

  if (!assetPath.startsWith(distDir)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  if (pathname === '/') {
    const html = await readFile(path.join(distDir, 'index.html'))
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(html)
    return
  }

  if (pathname === '/server' || pathname.startsWith('/server/')) {
    response.writeHead(404)
    response.end('Not Found')
    return
  }

  const asset = normalizedPath ? await tryReadFile(assetPath) : null
  if (asset) {
    response.writeHead(200, { 'Content-Type': resolveContentType(assetPath) })
    response.end(asset)
    return
  }

  if (path.extname(pathname)) {
    response.writeHead(404)
    response.end('Not Found')
    return
  }

  const spaHtml = await readFile(path.join(distDir, 'spa.html'))
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  response.end(spaHtml)
}).listen(port, host, () => {
  console.log(`Preview server running at http://${host}:${port}`)
})
