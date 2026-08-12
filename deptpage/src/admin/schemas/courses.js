export const catalogSchema = {
  file: 'courses.json',
  arrayPath: 'catalog',
  idField: 'id',
  label: 'Course',
  fields: [
    { key: 'id', type: 'text', label: 'course id (e.g. CSCI 134)', required: true, unique: true },
    { key: 'title', type: 'text', label: 'title', required: true },
    { key: 'icon', type: 'image', label: 'icon', imageDir: 'courseicons' },
    { key: 'description', type: 'text', label: 'description', required: true, multiline: true },
  ],
  listColumns: ['id', 'title'],
  sortBy: { key: 'id', direction: 'asc' },
}

export const sectionsSchema = {
  file: 'courses.json',
  arrayPath: 'sections',
  idField: 'id',
  label: 'Course Section',
  fields: [
    { key: 'id', type: 'text', label: 'section id (e.g. f26-csci134-1)', required: true, unique: true },
    {
      key: 'course',
      type: 'reference',
      label: 'course',
      required: true,
      refFile: 'courses.json',
      refArrayPath: 'catalog',
      refIdField: 'id',
      refLabelField: 'title',
    },
    { key: 'semester', type: 'text', label: 'semester (e.g. Fall 2026)', required: true },
    { key: 'instructors', type: 'string-list', label: 'instructors', itemLabel: 'instructor' },
    { key: 'lecture', type: 'text', label: 'lecture time', required: true },
    { key: 'webpage', type: 'text', label: 'course webpage', required: true },
  ],
  listColumns: ['id', 'course', 'semester'],
  sortBy: { key: 'semester', direction: 'asc' },
}
