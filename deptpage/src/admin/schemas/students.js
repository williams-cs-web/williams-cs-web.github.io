export default {
  file: 'students.json',
  arrayPath: 'groups',
  idField: 'abbreviation',
  label: 'Student Group',
  fields: [
    { key: 'abbreviation', type: 'text', label: 'abbreviation', required: true, unique: true },
    { key: 'name', type: 'text', label: 'full name', required: true },
    { key: 'description', type: 'text', label: 'description', required: true, multiline: true },
    { key: 'webpage', type: 'text', label: 'webpage' },
    { key: 'details', type: 'string-list', label: 'extra paragraphs', multiline: true, itemLabel: 'paragraph' },
    {
      key: 'leadership',
      type: 'repeatable-group',
      label: 'leadership',
      itemLabel: 'leader',
      subfields: [
        { key: 'name', type: 'text', label: 'name' },
        { key: 'year', type: 'text', label: 'class year' },
        { key: 'photo', type: 'image', label: 'photo', imageDir: 'students' },
      ],
    },
    { key: 'gallery', type: 'string-image-array', label: 'gallery photos', imageDir: 'wics' },
  ],
  listColumns: ['abbreviation', 'name'],
}
