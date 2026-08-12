const BASE = '/__admin-api'

const etags = new Map()

const parseErrorBody = async (res) => {
  try {
    const body = await res.json()
    return body.error || res.statusText
  } catch {
    return res.statusText
  }
}

export const getData = async (file) => {
  const res = await fetch(`${BASE}/data/${file}`)
  if (!res.ok) throw new Error(await parseErrorBody(res))
  etags.set(file, res.headers.get('ETag'))
  return res.json()
}

export const saveData = async (file, data) => {
  const headers = { 'Content-Type': 'application/json' }
  const etag = etags.get(file)
  if (etag) headers['If-Match'] = etag
  const res = await fetch(`${BASE}/data/${file}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(await parseErrorBody(res))
  etags.set(file, res.headers.get('ETag'))
}

// path is the value stored in JSON, e.g. "articles/welcome.md"
export const getArticle = async (path) => {
  if (!path) return ''
  const res = await fetch(`${BASE}/article?path=${encodeURIComponent(path)}`)
  if (res.status === 404) return ''
  if (!res.ok) throw new Error(await parseErrorBody(res))
  return res.text()
}

export const saveArticle = async (path, content) => {
  const res = await fetch(`${BASE}/article?path=${encodeURIComponent(path)}`, {
    method: 'PUT',
    body: content,
  })
  if (!res.ok) throw new Error(await parseErrorBody(res))
  return res.json()
}

export const uploadImage = async (subfolder, file) => {
  const res = await fetch(`${BASE}/images/${subfolder}?filename=${encodeURIComponent(file.name)}`, {
    method: 'POST',
    body: file,
  })
  if (!res.ok) throw new Error(await parseErrorBody(res))
  const { path } = await res.json()
  return path
}

export const listImages = async (subfolder) => {
  const res = await fetch(`${BASE}/images/${subfolder}`)
  if (!res.ok) throw new Error(await parseErrorBody(res))
  const { files } = await res.json()
  return files
}
