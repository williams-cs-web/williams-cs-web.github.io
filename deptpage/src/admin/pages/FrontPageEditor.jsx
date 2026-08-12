import { useState, useEffect } from 'react'
import { getData, saveData } from '../adminApi'
import ImagePickerField from '../components/fields/ImagePickerField'
import TextField from '../components/fields/TextField'
import ContentBlockListField from '../components/fields/ContentBlockListField'

const FrontPageEditor = () => {
  const [doc, setDoc] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => { getData('frontpage.json').then(setDoc) }, [])

  if (!doc) return <div>loading...</div>

  const save = async () => {
    setStatus('saving...')
    try {
      await saveData('frontpage.json', doc)
      setStatus('saved')
    } catch (err) {
      setStatus(`save failed: ${err.message}`)
    }
  }

  return (
    <div className="admin-record-form">
      <h2>Front Page</h2>
      <ImagePickerField
        field={{ key: 'photo', label: 'spotlight photo', imageDir: 'misc', required: true }}
        value={doc.spotlight.photo}
        onChange={(v) => setDoc({ ...doc, spotlight: { ...doc.spotlight, photo: v } })}
      />
      <TextField
        field={{ key: 'caption', label: 'spotlight caption', required: true }}
        value={doc.spotlight.caption}
        onChange={(v) => setDoc({ ...doc, spotlight: { ...doc.spotlight, caption: v } })}
      />
      <ContentBlockListField
        field={{ key: 'content', label: 'page content', componentOptions: ['FromTheDepartment'] }}
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

export default FrontPageEditor
