export default {
  file: 'research.json',
  arrayPath: 'opportunities',
  idField: 'id',
  label: 'Research Opportunity',
  fields: [
    { key: 'id', type: 'text', label: 'id', required: true, unique: true },
    { key: 'name', type: 'text', label: 'name', required: true },
    { key: 'photo', type: 'image', label: 'photo', imageDir: 'misc' },
    { key: 'article', type: 'article', label: 'article body', required: true, titleKey: 'name' },
  ],
  listColumns: ['id', 'name'],
}
