import { useState, useEffect } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import { getData, saveData } from '../adminApi'
import TextField from '../components/fields/TextField'
import ContentBlockListField from '../components/fields/ContentBlockListField'
import CollectionListPage from '../components/CollectionListPage'
import { requirementsSchema, pathsSchema, majorComponentOptions } from '../schemas/major'

const MajorContentEditor = () => {
  const [doc, setDoc] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => { getData('major.json').then(setDoc) }, [])
  if (!doc) return <div>loading...</div>

  const save = async () => {
    setStatus('saving...')
    try {
      await saveData('major.json', doc)
      setStatus('saved')
    } catch (err) {
      setStatus(`save failed: ${err.message}`)
    }
  }

  return (
    <div className="admin-record-form">
      <TextField
        field={{ key: 'disclaimer', label: 'disclaimer', multiline: true }}
        value={doc.disclaimer}
        onChange={(v) => setDoc({ ...doc, disclaimer: v })}
      />
      <ContentBlockListField
        field={{ key: 'content', label: 'page content', componentOptions: majorComponentOptions }}
        value={doc.content}
        onChange={(v) => setDoc({ ...doc, content: v })}
      />
      <div className="admin-form-actions">
        <button type="button" onClick={save}>save</button>
        <span className="admin-status">{status}</span>
      </div>
    </div>
  )
}

const MajorAdmin = () => (
  <div>
    <h2>Plan Your Major</h2>
    <nav className="admin-tabs">
      <NavLink to="." end>page content</NavLink>
      <NavLink to="requirements">requirements</NavLink>
      <NavLink to="paths">example paths</NavLink>
    </nav>
    <Routes>
      <Route index element={<MajorContentEditor />} />
      <Route path="requirements/*" element={<CollectionListPage schema={requirementsSchema} />} />
      <Route path="paths/*" element={<CollectionListPage schema={pathsSchema} />} />
    </Routes>
  </div>
)

export default MajorAdmin
