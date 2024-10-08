import majorData from '../../data/major.json'
import people from '../../data/people.json'
import courses from '../../data/courses.json'
import colloquiumData from '../../data/colloquium.json'
import studentData from '../../data/students.json'
import studyAwayData from '../../data/studyaway.json'
import researchData from '../../data/research.json'
import newsData from '../../data/news.json'
import frontPageData from '../../data/frontpage.json'


const sixMonthsAgo = Date.parse("Feb 20, 2024")
const maxColloquiaToShow = 3;



const getFrontPageSpotlightInfo = () => {
  return frontPageData.spotlight
}

const getCatalog = () => {
  return courses.catalog
}

const getUpcomingColloquia = () => {
  return (
    colloquiumData.events
      .filter(event => (
        Date.parse(event.date) > sixMonthsAgo
      )).toSorted((event1, event2) => (
        Date.parse(event1.date) - Date.parse(event2.date)
      )).slice(0, maxColloquiaToShow)
  )
}


const fetchExternalTextFile = filename => {
  return fetch(filename).then(
    response => response.text()
  )      
}



const getCourseSections = (semester) => {
  return courses.sections.filter(course => course.semester === semester)
}

const getCourseById = courseId => {
  return courses.catalog.find(course => course.id === courseId)
}


const getMajorRequirement = courseId => { 
  return majorData.requirements.find((datum) => datum.id === courseId)
}

const getMajorPaths = () => {
  return majorData.paths
}

const getPlanYourMajorContent = () => {
  return majorData.content
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


const getStudyAwayEquivalents = () => {
  return studyAwayData.equivalents
}

const getResearchOpportunities = () => {
  return researchData.opportunities
}


const getNewsItems = () => {
  return newsData.articles     
}



export default {
  getFrontPageSpotlightInfo,
  getMajorRequirement,
  getMajorPaths,
  getPlanYourMajorContent,
  getPeople,
  getPeopleByRole,
  getCatalog,
  getCourseSections,
  getCourseById,
  getUpcomingColloquia,
  getStudentGroups,
  getStudyAwayEquivalents,
  getResearchOpportunities,
  getNewsItems,
  fetchExternalTextFile
}