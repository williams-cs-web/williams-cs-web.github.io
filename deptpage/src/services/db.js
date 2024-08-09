import data from './data.json'
import people from './people.json'
import courses from './courses.json'
import colloquiumData from './colloquium.json'
import studentData from './students.json'

const getCatalog = () => {
  return courses.catalog
}

const sixMonthsAgo = Date.parse("Feb 20, 2024")

const getUpcomingColloquia = () => {
  return (
    colloquiumData.events
      .filter(event => (
        Date.parse(event.date) > sixMonthsAgo
      )).toSorted((event1, event2) => (
        Date.parse(event1.date) - Date.parse(event2.date)
      ))
  )
}


  const getCourseSections = (semester) => {
    return courses.sections.filter(course => course.semester === semester)
  }

  const getCourseById = courseId => {
    return courses.catalog.find(course => course.id === courseId)
  }

  const getAllCourses = () => { //todo: change function name
    return data.courses
  }

  const getCourse = courseId => { //todo: change function name
    return data.courses.find((datum) => datum.id === courseId)
  }

  const getSchedules = () => {
    return data.schedules
  }

  const getLastName = (name) => {
    const fields = name.split(' ')
    const first = fields[0]
    const last = fields.slice(1, fields.length).join(' ')
    return last.length > 0 ? last : first
  }

  const getPeople = () => {
    return people.people.toSorted((a, b) => {
      const nameA = getLastName(a.id.toUpperCase())
      const nameB = getLastName(b.id.toUpperCase())
      return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)
    });
  }

  const getPeopleByRole = (role) => {
    return getPeople().filter(person =>
      person.role === role
    )
  }

  const getStudentGroups = () => {
    return studentData.groups
  }


  export default {
    getAllCourses,
    getCourse,
    getSchedules,
    getPeople,
    getPeopleByRole,
    getCatalog,
    getCourseSections,
    getCourseById,
    getUpcomingColloquia,
    getStudentGroups
  }
