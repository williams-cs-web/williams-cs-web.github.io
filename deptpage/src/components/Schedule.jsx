import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import DbServices from '../services/db.js'





const ScheduleChooser = ({ onClick, largeFontSize, smallFontSize }) => {

  const [current, setCurrent] = useState(0)


  useEffect(() => {
    onClick(current)
  }, [current])

  return (<>
    <div className="plaintext" style={{
      display: 'flex',
      fontSize: largeFontSize,
      gap: '10px',
      padding: '5px',
    }}>
      <div className="plan-your-major-choose-your-path" style={{ flexShrink: 1, alignSelf: 'center', width: '25%' }}>
        choose your path:
      </div>
      <div onClick={() => setCurrent(0)} style={{ borderStyle: current == 0 ? 'solid' : 'none', flexGrow: 1, flexShrink: 1 }}>
        <div>🏫</div>
        <div>day one</div>
        <div style={{ fontSize: smallFontSize }}>you arrive at williams with an interest in becoming a CS major</div>
      </div>
      <div onClick={() => setCurrent(1)} style={{ borderStyle: current == 1 ? 'solid' : 'none', flexGrow: 1, flexShrink: 1 }}>
        <div>🤩</div>
        <div>discovery</div>
        <div style={{ fontSize: smallFontSize }}>during your first year, you become interested in majoring in CS</div>
      </div>
      <div onClick={() => setCurrent(2)} style={{ borderStyle: current == 2 ? 'solid' : 'none', flexGrow: 1, flexShrink: 1 }}>
        <div>🚀</div>
        <div>accelerated</div>
        <div style={{ fontSize: smallFontSize }}>you want to major in CS and you have prior experience</div>
      </div>
    </div>
  </>)
}

function Year({ number, style, largeFontSize, smallFontSize }) {



  return (
    <div className="title" style={{
      textAlign: 'center',
      alignSelf: 'center',
    }}>
      <div style={{ fontSize: smallFontSize }}>year</div>
      <div style={{ width: style.width, fontSize: largeFontSize }}>{number}</div>
    </div>
  );
}


function Course(props) {

  const dept = props.id.split(' ')[0]
  const number = props.id.split(' ')[1].split('(')[0]

  const containerRef = useRef()

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const basicStyle = {
    width: '100%',
    borderStyle: 'solid',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    color: props.color,
    backgroundColor: props.backgroundColor,
    textAlign: 'center',
  };


  const style = transform && !props.moving ? {
    ...basicStyle,
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : basicStyle


  return (
    <div ref={containerRef}>
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div onMouseDown={() => props.onClick(props.id)} style={{
          flexGrow: 1,
          flexShrink: 1,
        }}>

          <div className="plan-your-major-dept" style={{ fontSize: props.largeFontSize }}>{dept}</div>
          <div className="plan-your-major-course-number" style={{ fontSize: props.largeFontSize }}>{number}</div>

        </div>
      </div>
    </div>
  );
}


const Semester = (props) => {

  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} style={{
      width: props.style.width,
      flexGrow: 1,
      flexShrink: 1,
      padding: "10px",
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
      }}>
        {props.children.map((child) => (
          <div key={child.key} style={{
            flexGrow: 0,
            flexShrink: 0,
          }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

const InfoBox = ({ info, warning, fontSize, backgroundColor }) => (

  <div className={warning ? "plan-your-major-infobox-warning" : "plan-your-major-infobox"} style={{    
    fontSize: fontSize
  }}>
    <div className="centered">
      {info} {warning ? 
      <span style={{fontWeight: 'normal', color: 'crimson'}}>{warning}
      </span> : null}
    </div>
  </div>

)




const Schedule = (props) => {

  const [schedule, setSchedule] = useState([])
  const [violations, setViolations] = useState([])
  const [highlight, setHighlight] = useState(null)

  const containerRef = useRef()

  const prebakedSchedules = DbServices.getSchedules()

  useEffect(() => {
    setSchedule(prebakedSchedules.dayone);
  }, [])


  const handleScheduleChange = (current) => {
    let schedule = prebakedSchedules.dayone
    if (current == 0) {
      schedule = prebakedSchedules.dayone
    } else if (current == 1) {
      schedule = prebakedSchedules.discovery
    } else if (current == 2) {
      schedule = prebakedSchedules.accelerated
    }
    setSchedule(schedule)
    setViolations(auditSchedule(schedule));
    setHighlight(null)
  }

  const computeFontSize = (maxSize) => {
    return Math.min(maxSize, (props.style.width / 600) * maxSize)
  }
  const largeFontSize = `${computeFontSize(24, containerRef.current ? containerRef.current.offsetWidth : 0)}px`
  const smallFontSize = `${computeFontSize(16, containerRef.current ? containerRef.current.offsetWidth : 0)}px`


  function handleDragMove(event) {
    const { active, over } = event;
    if (over) {
      moveCourse(active.id, over.id)
    }
  }

  function handleDragEnd(event) {
    const { over } = event;

  }

  const courseBackgroundColor = (courseId) => {
    if (highlight === courseId) {
      return violations.includes(courseId) ? "crimson" : "chartreuse"
    } else {
      return violations.includes(courseId) ? "pink" : "whitesmoke"
    }
  }

  const courseColor = (courseId) => {
    if (highlight === courseId) {
      return violations.includes(courseId) ? "white" : "black"
    } else {
      return violations.includes(courseId) ? "crimson" : "black"
    }
  }

  const addCourse = (sem, courseId) => {
    let nextCourses = [...new Set(sem.courses.concat([courseId]))]
    nextCourses.sort()
    return { ...sem, courses: nextCourses }
  }

  const removeCourse = (sem, courseId) => {
    let result = { ...sem, courses: sem.courses.filter(course => course != courseId) }
    return result
  }

  const checkPrereqs = (courseId, taken) => {
    let course = DbServices.getCourse(courseId)
    return course.prereqs.reduce((acc, curr) => acc && taken.has(curr), true)
  }

  const auditSchedule = (schedule) => {
    let taken = new Set();
    let result = [];
    for (let i = 0; i < schedule.length; i++) {
      schedule[i].courses.forEach(course => {
        if (!checkPrereqs(course, taken)) {
          result.push(course)
        }
      })
      schedule[i].courses.forEach(course =>
        taken.add(course)
      )
    }
    return [...result];
  }

  const moveCourse = (courseId, newSemester) => {
    let revised =
      schedule
        .map(sem =>
          sem.semester === newSemester ? addCourse(sem, courseId) : removeCourse(sem, courseId)
        )
    // TODO: experiment to get rid of drag flicker
    //setMoving(true)
    setSchedule(revised);
    setViolations(auditSchedule(revised));
    //setTimeout(() => {
    //  setMoving(false)
    //}, 0)
  }

  const defaultInfo = "Click on any course for more information. Drag courses from one semester to another to experiment with alternatives."



  const renderSemester = (sem) => (
    <Semester
      key={sem.semester}
      id={sem.semester}
      title={sem.semester}
      titleAlt={sem.semester}
      style={{
        width: 0.4 * props.style.width,
        flexGrow: 1,
        flexShrink: 1,
      }}>
      {sem.courses.map(course => (
        <div key={course}>
          <Course
            key={course}
            id={course}
            largeFontSize={largeFontSize}
            smallFontSize={smallFontSize}
            color={courseColor(course)}
            backgroundColor={courseBackgroundColor(course)}
            issue={violations.includes(course)}
            onClick={courseId => setHighlight(courseId)}
          />
        </div>
      ))}
    </Semester>
  )

  const getInfo = () => {
    if (highlight) {
      let course = DbServices.getCourse(highlight)      
      return course.info
    } else {
      return defaultInfo
    }
  }

  const getWarning = () => {
    if (highlight) {
      let course = DbServices.getCourse(highlight)
      if (violations.includes(highlight)) {
        return course.warning 
      }
      return null
    } else {
      return null
    }
  }

  const getInfoColor = () => {
    if (highlight) {
      return violations.includes(highlight) ? 'pink' : 'lightgray'
    } else {
      return 'lightgray'
    }
  }

  const academicYearStyle = {
    display: 'flex',
    flexFlow: 'row nowrap',
    borderTopStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  }

  const seasonStyle = {
    padding: '10px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  }

  const renderYear = (number) => (
    <Year
      number={number}
      largeFontSize={largeFontSize}
      smallFontSize={smallFontSize}
      style={{ width: .1 * props.style.width }}
    />
  )

  return (
    <div ref={containerRef} style={props.style}>
      
      <ScheduleChooser largeFontSize={largeFontSize} smallFontSize={smallFontSize} onClick={handleScheduleChange} />
      <InfoBox fontSize={largeFontSize} info={getInfo()} warning={getWarning()} backgroundColor={getInfoColor()} />

      {schedule.length > 0 ? (

        <DndContext onDragOver={handleDragMove} onDragEnd={handleDragEnd}>
          <div className="title" style={seasonStyle}>

            <div style={academicYearStyle}>
              {renderYear(1)}
              {renderSemester(schedule[0])}
              {renderSemester(schedule[1])}
            </div>
            <div style={academicYearStyle}>
              {renderYear(2)}
              {renderSemester(schedule[2])}
              {renderSemester(schedule[3])}
            </div>
            <div style={academicYearStyle}>
              {renderYear(3)}
              {renderSemester(schedule[4])}
              {renderSemester(schedule[5])}
            </div>
            <div style={academicYearStyle}>
              {renderYear(4)}
              {renderSemester(schedule[6])}
              {renderSemester(schedule[7])}
            </div>


          </div>
        </DndContext>

      ) : null}
    </div>
  )

}

export default Schedule