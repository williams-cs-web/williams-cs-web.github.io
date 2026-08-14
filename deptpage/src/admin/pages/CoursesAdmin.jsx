import { NavLink, Routes, Route } from 'react-router-dom'
import CollectionListPage from '../components/CollectionListPage'
import { catalogSchema, sectionsSchema } from '../schemas/courses'

const CoursesAdmin = () => (
  <div>
    <h2>Courses</h2>
    <nav className="admin-tabs">
      <NavLink to="sections">sections</NavLink>
      <NavLink to="catalog">course catalog</NavLink>
    </nav>
    <Routes>
      <Route index element={<CollectionListPage schema={sectionsSchema} />} />
      <Route path="sections/*" element={<CollectionListPage schema={sectionsSchema} />} />
      <Route path="catalog/*" element={<CollectionListPage schema={catalogSchema} />} />
    </Routes>
  </div>
)

export default CoursesAdmin
