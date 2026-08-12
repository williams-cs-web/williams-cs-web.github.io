import majorData from '../../data/major.json'
import nonMajorsData from '../../data/nonmajors.json'
import people from '../../data/people.json'
import courses from '../../data/courses.json'
import colloquiumData from '../../data/colloquium.json'
import studentData from '../../data/students.json'
import studyAwayData from '../../data/studyaway.json'
import researchData from '../../data/research.json'
import newsData from '../../data/news.json'
import frontPageData from '../../data/frontpage.json'


const sixMonthsAgo = Date.now() - 6 * 30 * 24 * 60 * 60 * 1000
const maxColloquiaToShow = 5;



const getFrontPageSpotlightInfo = () => {
  return frontPageData.spotlight
}

const getFrontPageContent = () => {
  return frontPageData.content
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
  return fetch(`/${filename}`).then(
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

const getMajorPlanningDisclaimer = () => {
  return majorData.disclaimer
}

const getNonMajorsContent = () => {
  return nonMajorsData.content
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

const nameEndpoints = (name) => {
  const parts = name.trim().split(/\s+/)
  return { first: parts[0], last: parts[parts.length - 1] }
}

const getPersonByName = (name) => {
  const { first, last } = nameEndpoints(name)
  return people.people.find(person => {
    const personEndpoints = nameEndpoints(person.id)
    return personEndpoints.first === first && personEndpoints.last === last
  })
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
  getFrontPageContent,
  getMajorRequirement,
  getMajorPaths,
  getPlanYourMajorContent,
  getMajorPlanningDisclaimer,
  getNonMajorsContent,
  getPeople,
  getPeopleByRole,
  getPersonByName,
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