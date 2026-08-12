export const isUnique = (records, idField, value, excludeIndex = -1) => (
  !records.some((record, index) => index !== excludeIndex && record[idField] === value)
)

const isEmpty = (value) => (
  value === undefined || value === null || value === '' ||
  (Array.isArray(value) && value.length === 0)
)

// Returns { [fieldKey]: message } for every required-but-empty field, plus
// a duplicate-id error when applicable. Field types that reference other
// collections (reference / reference-list) are validated structurally by
// only ever offering real ids as choices, so they don't need a check here.
export const validateRecord = (schema, record, siblingRecords, currentIndex) => {
  const errors = {}
  for (const field of schema.fields) {
    if (field.required && isEmpty(record[field.key])) {
      errors[field.key] = `${field.label || field.key} is required`
    }
  }
  if (schema.idField) {
    const idValue = record[schema.idField]
    if (!isEmpty(idValue) && !isUnique(siblingRecords, schema.idField, idValue, currentIndex)) {
      errors[schema.idField] = `${schema.idField} must be unique - "${idValue}" is already used`
    }
  }
  return errors
}
