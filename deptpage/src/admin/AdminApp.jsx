import { useState } from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import { publish, logout } from './adminApi'
import { SaveProvider, useSaveContext } from './SaveContext'
import CollectionListPage from './components/CollectionListPage'
import newsSchema from './schemas/news'
import colloquiumSchema from './schemas/colloquium'
import peopleSchema from './schemas/people'
import researchSchema from './schemas/research'
import studentsSchema from './schemas/students'
import CoursesAdmin from './pages/CoursesAdmin'
import MajorAdmin from './pages/MajorAdmin'
import FrontPageEditor from './pages/FrontPageEditor'
import NonMajorsEditor from './pages/NonMajorsEditor'
import './admin.css'

const SECTIONS = [
  { path: 'frontpage', label: 'Front Page' },
  { path: 'news', label: 'News' },
  { path: 'colloquium', label: 'Colloquium' },
  { path: 'people', label: 'People' },
  { path: 'courses', label: 'Courses' },
  { path: 'students', label: 'Student Life' },
  { path: 'research', label: 'Research Opportunities' },
  { path: 'major', label: 'Plan Your Major' },
  { path: 'nonmajors', label: 'Non-Majors' },
]

const TopBar = () => {
  const { doSave, dirty, saving, status, canSave } = useSaveContext()
  const [publishStatus, setPublishStatus] = useState('idle') // idle | running | success | error
  const [publishLog, setPublishLog] = useState('')

  const handlePublish = async () => {
    setPublishStatus('running')
    setPublishLog('')
    try {
      const result = await publish()
      setPublishStatus('success')
      setPublishLog(result.log || '')
    } catch (err) {
      setPublishStatus('error')
      setPublishLog(err.log || err.message)
    }
  }

  return (
    <nav className="admin-topbar">
      <div className="admin-topbar-row">
        <div className="admin-topbar-links">
          {SECTIONS.map((s) => (
            <NavLink key={s.path} to={`/admin/${s.path}`} className="admin-topbar-link">{s.label}</NavLink>
          ))}
        </div>
        <div className="admin-topbar-actions">
          <button
            type="button"
            className={`admin-button${status === 'saved' && !dirty ? ' admin-button-success' : ''}`}
            onClick={doSave}
            disabled={!canSave || !dirty || saving}
          >
            {saving ? 'Saving…' : status === 'saved' && !dirty ? 'Saved' : 'Save'}
          </button>
          <button type="button" className="admin-button" onClick={handlePublish} disabled={publishStatus === 'running'}>
            {publishStatus === 'running' ? 'Publishing…' : 'Publish to live site'}
          </button>
          <button type="button" className="admin-button" onClick={logout}>Log out</button>
        </div>
      </div>
      {status && status !== 'saved' ? (
        <div className="admin-publish-log">{status}</div>
      ) : null}
      {publishStatus === 'success' && <div className="admin-publish-ok">Published successfully.</div>}
      {publishStatus === 'error' && <pre className="admin-publish-log">{publishLog}</pre>}
    </nav>
  )
}

const AdminApp = () => (
  <SaveProvider>
    <div className="admin-app">
      <div className="admin-title-bar">ADMIN PANEL</div>
      <TopBar />
      <div className="admin-content">
        <Routes>
          <Route index element={<Navigate to="frontpage" replace />} />
          <Route path="frontpage" element={<FrontPageEditor />} />
          <Route path="news/*" element={<CollectionListPage schema={newsSchema} />} />
          <Route path="colloquium/*" element={<CollectionListPage schema={colloquiumSchema} />} />
          <Route path="people/*" element={<CollectionListPage schema={peopleSchema} />} />
          <Route path="courses/*" element={<CoursesAdmin />} />
          <Route path="students/*" element={<CollectionListPage schema={studentsSchema} />} />
          <Route path="research/*" element={<CollectionListPage schema={researchSchema} />} />
          <Route path="major/*" element={<MajorAdmin />} />
          <Route path="nonmajors" element={<NonMajorsEditor />} />
        </Routes>
      </div>
    </div>
  </SaveProvider>
)

export default AdminApp
