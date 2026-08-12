import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import FieldShell from './FieldShell'
import { getArticle, saveArticle } from '../../adminApi'
import { suggestArticlePath } from '../../utils/slugify'

// frontpage.json / major.json / nonmajors.json all have a `content` array
// that mixes {component: "SomeReactComponent"} markers with {title, article}
// blocks. Component blocks are read-only chips picked from a fixed enum
// (a new component name needs an actual code change anyway). Article blocks
// save their markdown text immediately via "save article text now" rather
// than deferring to the page's own Save button -- these arrays are short and
// rarely restructured, so the simpler immediate-write keeps this component
// self-contained instead of wiring it into RecordFormPage's save ordering.
const BlockEditor = ({ block, onChange }) => {
  const [content, setContent] = useState('')
  const [loadedPath, setLoadedPath] = useState(null)
  const [preview, setPreview] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (block.article && block.article !== loadedPath) {
      getArticle(block.article).then((c) => {
        setContent(c)
        setLoadedPath(block.article)
      })
    }
  }, [block.article])

  const saveText = async () => {
    setStatus('saving...')
    try {
      await saveArticle(block.article, content)
      setStatus('saved')
    } catch (err) {
      setStatus(`save failed: ${err.message}`)
    }
  }

  return (
    <div className="admin-content-block">
      <input
        type="text"
        placeholder="block title (optional)"
        value={block.title || ''}
        onChange={(e) => onChange({ ...block, title: e.target.value })}
      />
      <div className="admin-article-path-row">
        <input
          type="text"
          placeholder="articles/example.md"
          value={block.article || ''}
          onChange={(e) => onChange({ ...block, article: e.target.value })}
        />
        {!block.article ? (
          <button type="button" onClick={() => onChange({ ...block, article: suggestArticlePath(block.title) })}>
            suggest from title
          </button>
        ) : null}
      </div>
      {block.article ? (
        <>
          <div className="admin-article-toolbar">
            <button type="button" onClick={() => setPreview((p) => !p)}>{preview ? 'edit' : 'preview'}</button>
            <button type="button" onClick={saveText}>save article text now</button>
            <span className="admin-status">{status}</span>
          </div>
          {preview ? (
            <div className="admin-article-preview">
              <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
            </div>
          ) : (
            <textarea
              rows={8}
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                setStatus('unsaved changes')
              }}
            />
          )}
        </>
      ) : null}
    </div>
  )
}

const ContentBlockListField = ({ field, value, onChange, error }) => {
  const blocks = value || []
  const componentOptions = field.componentOptions || []

  const updateBlock = (i, newBlock) => {
    const next = [...blocks]
    next[i] = newBlock
    onChange(next)
  }
  const removeBlock = (i) => onChange(blocks.filter((_, idx) => idx !== i))
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= blocks.length) return
    const next = [...blocks]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  const addTextBlock = () => onChange([...blocks, { title: '', article: '' }])
  const addComponentBlock = () => onChange([...blocks, { component: componentOptions[0] }])

  return (
    <FieldShell field={field} error={error}>
      <div className="admin-content-block-list">
        {blocks.map((block, i) => (
          <div key={i} className="admin-content-block-wrapper">
            {'component' in block ? (
              <div className="admin-content-block admin-content-block-component">
                <label>component:</label>
                <select value={block.component} onChange={(e) => updateBlock(i, { component: e.target.value })}>
                  {componentOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ) : (
              <BlockEditor block={block} onChange={(b) => updateBlock(i, b)} />
            )}
            <div className="admin-content-block-controls">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1}>↓</button>
              <button type="button" onClick={() => removeBlock(i)}>remove block</button>
            </div>
          </div>
        ))}
        <div className="admin-content-block-add">
          <button type="button" onClick={addTextBlock}>+ add text/article block</button>
          {componentOptions.length > 0 ? (
            <button type="button" onClick={addComponentBlock}>+ add component block</button>
          ) : null}
        </div>
      </div>
    </FieldShell>
  )
}

export default ContentBlockListField
