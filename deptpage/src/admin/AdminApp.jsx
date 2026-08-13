import { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import { publish, logout } from './adminApi'
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

const AdminHome = () => (
  <div>
    <h2>Site Content Admin</h2>
    <p>Pick a section on the left to add, edit, or remove its content.</p>
  </div>
)

const PublishBar = () => {
  const [status, setStatus] = useState('idle') // idle | running | success | error
  const [log, setLog] = useState('')

  const handlePublish = async () => {
    setStatus('running')
    setLog('')
    try {
      const result = await publish()
      setStatus('success')
      setLog(result.log || '')
    } catch (err) {
      setStatus('error')
      setLog(err.log || err.message)
    }
  }

  return (
    <div className="admin-banner">
      <div className="admin-banner-row">
        <span>
          Changes here save to files on this server. Click <strong>Publish</strong> to rebuild
          and update the live site.
        </span>
        <div className="admin-banner-actions">
          <button type="button" className="admin-button" onClick={handlePublish} disabled={status === 'running'}>
            {status === 'running' ? 'Publishing…' : 'Publish to live site'}
          </button>
          <button type="button" className="admin-button admin-logout" onClick={logout}>Log out</button>
        </div>
      </div>
      {status === 'success' && <div className="admin-publish-ok">Published successfully.</div>}
      {status === 'error' && <pre className="admin-publish-log">{log}</pre>}
    </div>
  )
}

const AdminApp = () => (
  <div className="admin-app">
    <PublishBar />
    <div className="admin-layout">
      <nav className="admin-nav">
        <NavLink to="/admin" end>Overview</NavLink>
        {SECTIONS.map((s) => (
          <NavLink key={s.path} to={`/admin/${s.path}`}>{s.label}</NavLink>
        ))}
      </nav>
      <div className="admin-content">
        <Routes>
          <Route index element={<AdminHome />} />
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
  </div>
)

export default AdminApp
