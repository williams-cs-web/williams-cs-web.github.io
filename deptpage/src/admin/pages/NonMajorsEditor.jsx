import { useState, useEffect } from 'react'
import { getData, saveData } from '../adminApi'
import ContentBlockListField from '../components/fields/ContentBlockListField'

const NonMajorsEditor = () => {
  const [doc, setDoc] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => { getData('nonmajors.json').then(setDoc) }, [])

  if (!doc) return <div>loading...</div>

  const save = async () => {
    setStatus('saving...')
    try {
      await saveData('nonmajors.json', doc)
      setStatus('saved')
    } catch (err) {
      setStatus(`save failed: ${err.message}`)
    }
  }

  return (
    <div className="admin-record-form">
      <h2>Advice for Non-Majors</h2>
      <ContentBlockListField
        field={{ key: 'content', label: 'page content', componentOptions: [] }}
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

export default NonMajorsEditor
