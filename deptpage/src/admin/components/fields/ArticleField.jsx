import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import FieldShell from './FieldShell'
import { getArticle } from '../../adminApi'
import { suggestArticlePath } from '../../utils/slugify'

// Used within RecordFormPage, which owns the actual save-to-disk timing
// (article file written before the parent JSON on form submit) via the
// articleContent/onArticleContentChange props it passes to every field.
const ArticleField = ({ field, value, onChange, error, record, articleContent, onArticleContentChange }) => {
  const [preview, setPreview] = useState(false)
  const [loadedFor, setLoadedFor] = useState(null)

  useEffect(() => {
    if (value && value !== loadedFor && articleContent === undefined) {
      getArticle(value).then((content) => {
        onArticleContentChange(content)
        setLoadedFor(value)
      })
    }
  }, [value])

  const useSuggestedPath = () => {
    const titleKey = field.titleKey || 'title'
    onChange(suggestArticlePath(record[titleKey] || 'untitled'))
  }

  return (
    <FieldShell field={field} error={error}>
      <div className="admin-article-path-row">
        <input
          type="text"
          value={value || ''}
          placeholder="articles/example.md"
          onChange={(e) => onChange(e.target.value)}
        />
        {!value ? (
          <button type="button" onClick={useSuggestedPath}>
            suggest from title
          </button>
        ) : null}
      </div>
      {value ? (
        <>
          <div className="admin-article-toolbar">
            <button type="button" onClick={() => setPreview((p) => !p)}>
              {preview ? 'edit markdown' : 'preview'}
            </button>
          </div>
          {preview ? (
            <div className="admin-article-preview">
              <Markdown remarkPlugins={[remarkGfm]}>{articleContent || ''}</Markdown>
            </div>
          ) : (
            <textarea
              rows={12}
              className="admin-article-textarea"
              value={articleContent || ''}
              onChange={(e) => onArticleContentChange(e.target.value)}
            />
          )}
        </>
      ) : null}
    </FieldShell>
  )
}

export default ArticleField
