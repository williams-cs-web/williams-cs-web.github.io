export default {
  file: 'news.json',
  arrayPath: 'articles',
  idField: 'id',
  label: 'News Article',
  fields: [
    { key: 'id', type: 'text', label: 'id', required: true, unique: true },
    { key: 'date', type: 'date', label: 'date', required: true },
    { key: 'title', type: 'text', label: 'title', required: true },
    { key: 'photo', type: 'image', label: 'photo', imageDir: 'misc' },
    { key: 'article', type: 'article', label: 'article body', required: true },
    { key: 'teaser', type: 'text', label: 'teaser (shown on the front page; defaults to title if blank)', multiline: true },
  ],
  listColumns: ['date', 'title'],
  sortBy: { key: 'date', direction: 'desc', type: 'date' },
}
