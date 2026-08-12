import { useState, useEffect } from 'react'
import FieldShell from './FieldShell'
import { uploadImage, listImages } from '../../adminApi'

const ImagePickerField = ({ field, value, onChange, error }) => {
  const [uploading, setUploading] = useState(false)
  const [showExisting, setShowExisting] = useState(false)
  const [existing, setExisting] = useState([])

  useEffect(() => {
    if (!showExisting) return
    listImages(field.imageDir).then(setExisting).catch(() => setExisting([]))
  }, [showExisting, field.imageDir])

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const path = await uploadImage(field.imageDir, file)
      onChange(path)
    } catch (err) {
      window.alert(`upload failed: ${err.message}`)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <FieldShell field={field} error={error}>
      {value ? (
        <div className="admin-image-preview">
          <img src={value} alt="" />
          <div className="admin-image-path">{value}</div>
        </div>
      ) : (
        <div className="admin-image-path">no image selected</div>
      )}
      <div className="admin-image-actions">
        <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
        <button type="button" onClick={() => setShowExisting((s) => !s)}>
          {showExisting ? 'hide existing images' : 'choose existing image'}
        </button>
        {value ? (
          <button type="button" onClick={() => onChange('')}>
            remove
          </button>
        ) : null}
      </div>
      {showExisting ? (
        <div className="admin-image-grid">
          {existing.map((path) => (
            <button
              type="button"
              key={path}
              className={`admin-image-thumb ${path === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(path)
                setShowExisting(false)
              }}
            >
              <img src={path} alt="" />
            </button>
          ))}
          {existing.length === 0 ? <div>no images in images/{field.imageDir} yet</div> : null}
        </div>
      ) : null}
    </FieldShell>
  )
}

export default ImagePickerField
