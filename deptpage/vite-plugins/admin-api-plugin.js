import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { resolveSafe, isSafeSegment, atomicWrite } from './fsGuard.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// deptpage/data holds the JSON files directly; deptpage/articles and
// deptpage/images are symlinks to the repo-root copies GitHub Pages serves.
const DATA_DIR = path.resolve(__dirname, '../data')
const ARTICLES_DIR = path.resolve(__dirname, '../articles')
const IMAGES_DIR = path.resolve(__dirname, '../images')
const DEPTPAGE_DIR = path.resolve(__dirname, '..')
const REPO_ROOT = path.resolve(DEPTPAGE_DIR, '..')

const DATA_FILES = new Set([
  'frontpage.json',
  'news.json',
  'colloquium.json',
  'people.json',
  'courses.json',
  'students.json',
  'research.json',
  'studyaway.json',
  'major.json',
  'nonmajors.json',
])

const IMAGE_SUBFOLDERS = new Set([
  'misc',
  'people',
  'colloquium',
  'students',
  'courseicons',
  'wics',
])

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'])

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024

const readBody = (req, maxBytes = 5 * 1024 * 1024) => new Promise((resolve, reject) => {
  const chunks = []
  let total = 0
  req.on('data', (chunk) => {
    total += chunk.length
    if (total > maxBytes) {
      reject(Object.assign(new Error('request body too large'), { statusCode: 413 }))
      req.destroy()
      return
    }
    chunks.push(chunk)
  })
  req.on('end', () => resolve(Buffer.concat(chunks)))
  req.on('error', reject)
})

const sendJson = (res, statusCode, body) => {
  const text = JSON.stringify(body)
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(text)
}

const sendError = (res, statusCode, message) => sendJson(res, statusCode, { error: message })

const hashOf = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex')

const handleGetData = async (req, res, filename) => {
  if (!DATA_FILES.has(filename)) return sendError(res, 404, `unknown data file: ${filename}`)
  const filePath = path.join(DATA_DIR, filename)
  const raw = await fs.readFile(filePath, 'utf8')
  res.setHeader('ETag', hashOf(Buffer.from(raw)))
  sendJson(res, 200, JSON.parse(raw))
}

const handlePutData = async (req, res, filename) => {
  if (!DATA_FILES.has(filename)) return sendError(res, 404, `unknown data file: ${filename}`)
  const filePath = path.join(DATA_DIR, filename)

  const ifMatch = req.headers['if-match']
  if (ifMatch) {
    let current
    try {
      current = await fs.readFile(filePath, 'utf8')
    } catch {
      current = null
    }
    if (current !== null && hashOf(Buffer.from(current)) !== ifMatch) {
      return sendError(res, 409, 'file changed on disk since it was loaded; reload and retry')
    }
  }

  const body = await readBody(req)
  let data
  try {
    data = JSON.parse(body.toString('utf8'))
  } catch {
    return sendError(res, 400, 'request body is not valid JSON')
  }
  const serialized = `${JSON.stringify(data, null, 4)}\n`
  await atomicWrite(filePath, serialized)
  res.setHeader('ETag', hashOf(Buffer.from(serialized)))
  sendJson(res, 200, { ok: true })
}

const handleGetArticle = async (req, res, articlePath) => {
  let resolved
  try {
    resolved = await resolveSafe(ARTICLES_DIR, articlePath)
  } catch (err) {
    return sendError(res, 400, err.message)
  }
  if (!resolved.endsWith('.md')) return sendError(res, 400, 'article path must end in .md')
  try {
    const content = await fs.readFile(resolved, 'utf8')
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
    res.setHeader('ETag', hashOf(Buffer.from(content)))
    res.statusCode = 200
    res.end(content)
  } catch (err) {
    if (err.code === 'ENOENT') return sendError(res, 404, 'article not found')
    throw err
  }
}

const handlePutArticle = async (req, res, articlePath) => {
  if (!articlePath.endsWith('.md')) return sendError(res, 400, 'article path must end in .md')
  const segments = articlePath.split('/')
  if (!segments.every(isSafeSegment)) return sendError(res, 400, `unsafe article path: ${articlePath}`)
  const resolved = path.resolve(await fs.realpath(ARTICLES_DIR), ...segments)

  const body = await readBody(req, 2 * 1024 * 1024)
  await atomicWrite(resolved, body)
  sendJson(res, 200, { ok: true, path: `articles/${segments.join('/')}` })
}

const uniqueImagePath = async (dir, baseName, ext) => {
  let candidate = `${baseName}${ext}`
  let n = 2
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await fs.access(path.join(dir, candidate))
      candidate = `${baseName}-${n}${ext}`
      n += 1
    } catch {
      return candidate
    }
  }
}

const handleUploadImage = async (req, res, subfolder, filename) => {
  if (!IMAGE_SUBFOLDERS.has(subfolder)) return sendError(res, 404, `unknown image subfolder: ${subfolder}`)
  if (!filename) return sendError(res, 400, 'missing filename query parameter')
  const ext = path.extname(filename).toLowerCase()
  if (!IMAGE_EXTENSIONS.has(ext)) return sendError(res, 400, `unsupported image extension: ${ext}`)
  const baseName = path.basename(filename, path.extname(filename)).replace(/[^A-Za-z0-9._-]/g, '-')
  if (!isSafeSegment(`${baseName}${ext}`)) return sendError(res, 400, 'filename could not be sanitized')

  const dir = path.join(await fs.realpath(IMAGES_DIR), subfolder)
  const body = await readBody(req, MAX_UPLOAD_BYTES)
  const finalName = await uniqueImagePath(dir, baseName, ext)
  await atomicWrite(path.join(dir, finalName), body)
  sendJson(res, 200, { path: `/images/${subfolder}/${finalName}` })
}

const handleListImages = async (req, res, subfolder) => {
  if (!IMAGE_SUBFOLDERS.has(subfolder)) return sendError(res, 404, `unknown image subfolder: ${subfolder}`)
  const dir = path.join(await fs.realpath(IMAGES_DIR), subfolder)
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = entries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => `/images/${subfolder}/${entry.name}`)
    .sort()
  sendJson(res, 200, { files })
}

// Publishing: most content (everything under data/*.json) is statically
// imported into the JS bundle at build time, so writing the files alone
// doesn't change what visitors see. Publish stages+commits the content
// changes locally (no push -- see admin-server docs) then reruns the same
// build the deploy script uses, so a bad edit can't leave the live site
// half-updated: if the build fails, nothing after the commit step touches
// the served files.
let publishInProgress = false

const runCommand = (cmd, args, cwd) => new Promise((resolve, reject) => {
  const child = spawn(cmd, args, { cwd })
  let output = ''
  child.stdout.on('data', (chunk) => { output += chunk })
  child.stderr.on('data', (chunk) => { output += chunk })
  child.on('error', reject)
  child.on('close', (code) => {
    if (code === 0) resolve(output)
    else reject(Object.assign(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`), { output }))
  })
})

const hasStagedChanges = async () => {
  try {
    await runCommand('git', ['diff', '--cached', '--quiet'], REPO_ROOT)
    return false
  } catch {
    return true
  }
}

const handlePublish = async (req, res) => {
  if (publishInProgress) return sendError(res, 409, 'a publish is already in progress')
  publishInProgress = true
  const log = []
  try {
    log.push(await runCommand('git', ['add', 'deptpage/data', 'articles', 'images'], REPO_ROOT))
    if (await hasStagedChanges()) {
      log.push(await runCommand('git', ['commit', '-m', `Admin panel edit ${new Date().toISOString()}`], REPO_ROOT))
    } else {
      log.push('(no content changes to commit)')
    }
    log.push(await runCommand('npm', ['run', 'build:ephs'], DEPTPAGE_DIR))
    sendJson(res, 200, { ok: true, log: log.join('\n---\n') })
  } catch (err) {
    log.push(err.output || err.message)
    sendJson(res, 500, { ok: false, log: log.join('\n---\n'), error: err.message })
  } finally {
    publishInProgress = false
  }
}

export default function adminApiPlugin() {
  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      server.middlewares.use('/__admin-api', async (req, res) => {
        try {
          const url = new URL(req.url, 'http://localhost')
          const segments = url.pathname.split('/').filter(Boolean)

          if (segments[0] === 'data' && segments.length === 2) {
            if (req.method === 'GET') return await handleGetData(req, res, segments[1])
            if (req.method === 'PUT') return await handlePutData(req, res, segments[1])
          }

          if (segments[0] === 'article' && segments.length === 1) {
            const articlePath = url.searchParams.get('path') || ''
            const normalized = articlePath.startsWith('articles/') ? articlePath.slice('articles/'.length) : articlePath
            if (req.method === 'GET') return await handleGetArticle(req, res, normalized)
            if (req.method === 'PUT') return await handlePutArticle(req, res, normalized)
          }

          if (segments[0] === 'images' && segments.length === 2) {
            if (req.method === 'POST') return await handleUploadImage(req, res, segments[1], url.searchParams.get('filename'))
            if (req.method === 'GET') return await handleListImages(req, res, segments[1])
          }

          if (segments[0] === 'publish' && segments.length === 1) {
            if (req.method === 'POST') return await handlePublish(req, res)
          }

          return sendError(res, 404, 'no such admin API route')
        } catch (err) {
          const statusCode = err.statusCode || 500
          console.error('[admin-api]', err)
          return sendError(res, statusCode, err.message || 'internal error')
        }
      })
    },
  }
}
