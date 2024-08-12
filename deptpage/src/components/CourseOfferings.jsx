import DbServices from '../services/db.js'
import { useState, useEffect, useRef } from 'react'
import Sidebar from './Sidebar'
import TopMenu from './TopMenu'
import WilliamsHeader from './WilliamsHeader'
import WilliamsFooter from './WilliamsFooter'
import Spacer from './Spacer'


const CourseOffering = ({ course, instructors, lecture, webpage, width }) => {

  const renderWithHyperlink = (component) => {
    if (webpage && webpage.length > 0) {
      return (
        <a className="linkbox" href={webpage} target="_blank">{component}</a>
      )
    } else {
      return component
    }
  }

  const courseObj = DbServices.getCourseById(course)

  const taughtByMessage = () => {
    return `${instructors.join(' and ')}`
  }

  const content = (
    <div style={{      
      display: 'flex',
      flexFlow: 'row nowrap'
    }}>
      <div style={{
        margin: '5px'
      }}><img width="60" height="60" src={courseObj.icon} alt={`Icon for ${course}`} />
      </div>
      <div style={{
        padding: '5px'
      }}>
        <div className="plaintext" style={{
          fontSize: '12px'
        }}>
          {lecture}
        </div>
        <div className="title" style={{
          fontSize: '22px'
        }}>
          {course}
        </div>
        <hr style={{margin: '2px'}}/>
        <div className="plaintext" style={{
          fontSize: '19px'
        }}>
          {courseObj.title}
        </div>

        <div className="plaintext" style={{
          fontSize: '16px'
        }}>
          {taughtByMessage()}
        </div>
      </div>
    </div>
  )

  return (
    <div className="linkbox" style={{      
      borderStyle: 'solid',
      textAlign: 'left',
      flexGrow: 1,
      flexShrink: 1,
      width: width,
    }}>
      {renderWithHyperlink(content)}
    </div>
  )
}

const CourseOfferings = ({ style, showSidebar, onClick }) => {

  const hubId = "course-offerings"

  const [trigger, setTrigger] = useState(false)
  const headingRef = useRef()

  useEffect(() => {
    setTrigger(!trigger)
  }, [headingRef.current])
  
  const renderHeading = heading => (
    <div className="heading">{heading.toLowerCase()}</div>
  )

  const getBoxWidth = () => {
    if (headingRef.current) {
      let boxesPerLine = Math.floor(headingRef.current.offsetWidth / 300)
      return Math.floor((headingRef.current.offsetWidth - 50) / boxesPerLine)
    } else {
      return 300
    }
  }
  const renderSemester = (semester) => (
    <div>
      {renderHeading(semester)}
      <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        gap: '20px'
      }}>
        {DbServices.getCourseSections(semester).map(offering =>
          <CourseOffering
            id={offering.id}
            key={offering.id}
            course={offering.course}
            lecture={offering.lecture}
            webpage={offering.webpage}
            instructors={offering.instructors}
            width={`${getBoxWidth()}px`}
          />
        )}
      </div>
    </div>
  )


  const renderBody = () => (
    <div
      id="frontpage-course-offerings"
      style={{
        ...style,
        fontSize: "40px"
      }}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        paddingRight: '40px'
      }}>
        {showSidebar ? <Sidebar title="current course offerings" className="sidebar-course-offerings" onClick={onClick} /> : <div style={{ flexGrow: 0, flexShrink: 0, width: '40px' }} />}
        <div style={{
          width: '95%',
          paddingTop: '35px',
          textAlign: 'left'
        }}>

          <div className="plaintext left">
            Below you will find information about current and upcoming 
            computer science course offerings at Williams College. 
            Because of the popularity of our courses, the department 
            advises students to enroll in any desired course during 
            pre-registration. Keep in mind: even if you enroll during 
            pre-registration, you may not secure a spot in your desired course (this
            is particularly true for CSCI 134, CSCI 136, and certain electives). If you are dropped
            from a course that you pre-registered for, please fill 
            out this <a className="link" href="https://docs.google.com/forms/d/e/1FAIpQLSeHEYivlxlexfitNguVDI4VIunRcQU5XZOIzVMmDcr6DjgkQg/viewform" target="_blank">form</a> to 
            gain priority enrollment for future offerings of that course.         
          </div>
          <div style={{ height: '40px' }}></div>
          {renderSemester("Fall 2024")}
          <div style={{ height: '40px' }}></div>
          {renderSemester("Spring 2025")}
          <div style={{ height: '40px' }}></div>
        </div>
      </div>

    </div>
  )

  return (
    <div>
      <WilliamsHeader />
      <TopMenu
        onClick={onClick}
        currentPage={hubId}
        width={style.width}
      />
      {renderBody()}
      <Spacer height="30px" />
      <WilliamsFooter />
    </div>
  )
}

export default CourseOfferings;