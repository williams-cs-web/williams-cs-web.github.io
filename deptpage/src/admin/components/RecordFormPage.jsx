import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData, saveData, getArticle, saveArticle } from '../adminApi'
import { validateRecord } from '../utils/validation'
import FieldRenderer from './fields/FieldRenderer'

const ARRAY_TYPES = new Set(['reference-list', 'string-list', 'repeatable-group', 'string-image-array'])

const emptyRecordFor = (schema) => {
  const record = {}
  for (const field of schema.fields) {
    record[field.key] = ARRAY_TYPES.has(field.type) ? [] : ''
  }
  if (schema.extraField) {
    record[schema.extraField.key] = schema.extraField.default()
  }
  return record
}

const indexFor = (schema, list, id) => (
  schema.idField
    ? list.findIndex((item) => String(item[schema.idField]) === String(id))
    : Number(id)
)

// The single load/save/delete orchestrator for one record within one of the
// generic collection editors. `schema.fields` drives the form body;
// `schema.extraField`/`schema.ExtraComponent` (used by major.json's `paths`)
// injects one bespoke sub-editor alongside the generic fields.
const RecordFormPage = ({ schema, mode, id, backTo }) => {
  const navigate = useNavigate()
  const [doc, setDoc] = useState(null)
  const [record, setRecord] = useState(null)
  const [articleContents, setArticleContents] = useState({})
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [loadError, setLoadError] = useState('')

  const articleFieldKeys = useMemo(
    () => schema.fields.filter((f) => f.type === 'article').map((f) => f.key),
    [schema],
  )

  useEffect(() => {
    let cancelled = false
    setLoadError('')
    setRecord(null)
    getData(schema.file).then(async (data) => {
      if (cancelled) return
      setDoc(data)
      const list = data[schema.arrayPath] || []
      const rec = mode === 'create' ? emptyRecordFor(schema) : list[indexFor(schema, list, id)]
      if (!rec) {
        setLoadError('record not found')
        return
      }
      setRecord({ ...rec })
      const contents = {}
      for (const key of articleFieldKeys) {
        if (rec[key]) contents[key] = await getArticle(rec[key])
      }
      if (!cancelled) setArticleContents(contents)
    }).catch((err) => setLoadError(err.message))
    return () => { cancelled = true }
  }, [schema, mode, id])

  if (loadError) return <div className="admin-error">{loadError}</div>
  if (!record) return <div>loading...</div>

  const list = doc[schema.arrayPath] || []
  const currentIndex = mode === 'create' ? -1 : indexFor(schema, list, id)

  const handleFieldChange = (key, newValue) => {
    setRecord((r) => ({ ...r, [key]: newValue }))
  }

  const handleArticleContentChange = (key, content) => {
    setArticleContents((c) => ({ ...c, [key]: content }))
  }

  const handleSave = async () => {
    const validationErrors = validateRecord(schema, record, list, currentIndex)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSaving(true)
    try {
      for (const key of articleFieldKeys) {
        const path = record[key]
        if (path) await saveArticle(path, articleContents[key] || '')
      }
      const newList = [...list]
      if (mode === 'create') newList.push(record)
      else newList[currentIndex] = record
      await saveData(schema.file, { ...doc, [schema.arrayPath]: newList })
      navigate(backTo)
    } catch (err) {
      window.alert(`save failed: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const label = schema.label || 'record'
    if (!window.confirm(`Delete this ${label}? This can't be undone. Any linked images/articles are left on disk.`)) {
      return
    }
    setSaving(true)
    try {
      const newList = list.filter((_, i) => i !== currentIndex)
      await saveData(schema.file, { ...doc, [schema.arrayPath]: newList })
      navigate(backTo)
    } catch (err) {
      window.alert(`delete failed: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-record-form">
      <h2>{mode === 'create' ? `new ${schema.label}` : `edit ${schema.label}`}</h2>
      {schema.fields.map((field) => (
        <FieldRenderer
          key={field.key}
          field={field}
          value={record[field.key]}
          onChange={(v) => handleFieldChange(field.key, v)}
          error={errors[field.key]}
          record={record}
          articleContent={articleContents[field.key]}
          onArticleContentChange={(content) => handleArticleContentChange(field.key, content)}
        />
      ))}
      {schema.ExtraComponent ? (
        <schema.ExtraComponent
          value={record[schema.extraField.key]}
          onChange={(v) => handleFieldChange(schema.extraField.key, v)}
          requirements={doc.requirements || []}
        />
      ) : null}
      <div className="admin-form-actions">
        <button type="button" onClick={handleSave} disabled={saving}>
          {saving ? 'saving...' : 'save'}
        </button>
        <button type="button" onClick={() => navigate(backTo)} disabled={saving}>cancel</button>
        {mode === 'edit' ? (
          <button type="button" className="admin-danger" onClick={handleDelete} disabled={saving}>delete</button>
        ) : null}
      </div>
    </div>
  )
}

export default RecordFormPage
