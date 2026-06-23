import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { DndContext } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import DbServices from '../services/db.js'





const ScheduleChooser = ({ onClick, largeFontSize, smallFontSize }) => {

  const [current, setCurrent] = useState(0)
  const paths = DbServices.getMajorPaths()

  useEffect(() => {
    onClick(current)
  }, [current])

  const renderPathDescription = (pathIndex) => (
    <div key={`major-path-${pathIndex}`} onClick={() => setCurrent(pathIndex)} style={{ borderStyle: current === pathIndex ? 'solid' : 'none', flexGrow: 1, flexShrink: 1 }}>
      <div>{paths[pathIndex].icon}</div>
      <div>{paths[pathIndex].id}</div>
      <div style={{ fontSize: smallFontSize }}>{paths[pathIndex].description}</div>
    </div>
  )

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
      {[...Array(paths.length).keys()].map((i) => renderPathDescription(i))}
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


function MajorRequirement(props) {

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
    textAlign: 'center',
  };


  const style = transform && !props.moving ? {
    ...basicStyle,
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : basicStyle


  return (
    <div ref={containerRef}>
      <div className={props.className} ref={setNodeRef} style={style} {...listeners} {...attributes}>
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
      minHeight: '60px',
      backgroundColor: isOver ? '#f0f4ff' : undefined,
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: '4px',
      }}>
        {props.children}
      </div>
    </div>
  )
}

const InfoBox = ({ info, warning, error, fontSize }) => {

  const boxClass = (
    error ? "plan-your-major-infobox-error" :
      (warning ? "plan-your-major-infobox-warning" : "plan-your-major-infobox")
  )

  const renderWarning = () => (
    warning ?
      <span className="plan-your-major-infobox-warning-text">{warning}
      </span> : null
  )

  const renderError = () => (
    error ?
      <span className="plan-your-major-infobox-error-text">{error}
      </span> : null
  )

  return (
    <div className={boxClass} style={{
      fontSize: fontSize
    }}>
      <div className="centered">
        {info} {renderWarning()} {renderError()}
      </div>
    </div>
  )
}




const Schedule = () => {

  const [schedule, setSchedule] = useState([])
  const [violations, setViolations] = useState([])
  const [warnings, setWarnings] = useState([])
  const [highlight, setHighlight] = useState(null)
  const [containerWidth, setContainerWidth] = useState(600)

  const containerRef = useRef()
  const fallRowRef = useRef()
  const springRowRef = useRef()

  const prebakedSchedules = DbServices.getMajorPaths()

  useEffect(() => {
    setSchedule(prebakedSchedules[0].path);
  }, [])

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [])

  useLayoutEffect(() => {
    if (!fallRowRef.current || !springRowRef.current) return
    fallRowRef.current.style.height = ''
    springRowRef.current.style.height = ''
    const h = Math.max(
      fallRowRef.current.scrollHeight,
      springRowRef.current.scrollHeight
    )
    fallRowRef.current.style.height = `${h}px`
    springRowRef.current.style.height = `${h}px`
  }, [schedule, containerWidth])

  const handleScheduleChange = (current) => {
    let schedule = prebakedSchedules[current].path
    setSchedule(schedule)
    auditSchedule(schedule);
    setHighlight(null)
  }

  const computeFontSize = (maxSize) => {
    return Math.min(maxSize, (containerWidth / 600) * maxSize)
  }
  const largeFontSize = `${computeFontSize(24)}px`
  const smallFontSize = `${computeFontSize(16)}px`


  function handleDragEnd(event) {
    const { active, over } = event;
    if (over) {
      moveMajorRequirement(active.id, over.id)
    }
  }

  const getRequirementClassName = (courseId) => {
    if (highlight === courseId) {
      if (violations.includes(courseId)) {
        return "major-req-highlight-error"
      } else if (warnings.includes(courseId)) {
        return "major-req-highlight-warning"
      } else {
        return "major-req-highlight"
      }
    } else {
      if (violations.includes(courseId)) {
        return "major-req-error"
      } else if (warnings.includes(courseId)) {
        return "major-req-warning"
      } else {
        return "major-req"
      }
    }
  }

  const addMajorRequirement = (sem, courseId) => {
    let nextMajorRequirements = [...new Set(sem.courses.concat([courseId]))]
    nextMajorRequirements.sort()
    return { ...sem, courses: nextMajorRequirements }
  }

  const removeMajorRequirement = (sem, courseId) => {
    let result = { ...sem, courses: sem.courses.filter(course => course !== courseId) }
    return result
  }

  const checkPrereqs = (courseId, taken) => {
    let course = DbServices.getMajorRequirement(courseId)
    if (!course) return true
    return !course.prereqs ? true : course.prereqs.reduce((acc, curr) => acc && taken.has(curr), true)
  }

  const checkRecommendations = (courseId, taken) => {
    let course = DbServices.getMajorRequirement(courseId)
    if (!course || !course.recommended) return true
    return course.recommended.reduce((acc, curr) => acc || taken.has(curr), false)
  }

  const auditSchedule = (schedule) => {
    let taken = new Set();
    let errors = [];
    let warnings = [];
    for (let i = 0; i < schedule.length; i++) {
      schedule[i].courses.forEach(course => {
        if (!checkPrereqs(course, taken)) {
          errors.push(course)
        } else if (!checkRecommendations(course, taken)) {
          warnings.push(course)
        }
      })
      schedule[i].courses.forEach(course =>
        taken.add(course)
      )
    }
    setWarnings([...warnings])
    setViolations([...errors])
  }

  const moveMajorRequirement = (courseId, newSemester) => {
    let revised =
      schedule
        .map(sem =>
          sem.semester === newSemester ? addMajorRequirement(sem, courseId) : removeMajorRequirement(sem, courseId)
        )
    setSchedule(revised);
    auditSchedule(revised);
  }

  const defaultInfo = "Click on any course for more information. Drag courses from one semester to another to experiment with alternatives."



  const renderSemester = (sem, widthFraction = 0.2) => {
    const sizeFactor = Math.min(1, 3 / Math.max(sem.courses.length, 1))
    const semLargeFontSize = `${computeFontSize(24 * sizeFactor)}px`
    const semSmallFontSize = `${computeFontSize(16 * sizeFactor)}px`
    return (
      <Semester
        key={sem.semester}
        id={sem.semester}
        title={sem.semester}
        titleAlt={sem.semester}
        style={{
          width: widthFraction * containerWidth,
          flexGrow: 1,
          flexShrink: 1,
        }}>
        {sem.courses.map(course => (
          <div key={course}>
            <MajorRequirement
              key={course}
              id={course}
              largeFontSize={semLargeFontSize}
              smallFontSize={semSmallFontSize}
              className={getRequirementClassName(course)}
              issue={violations.includes(course)}
              onClick={courseId => setHighlight(courseId)}
            />
          </div>
        ))}
      </Semester>
    )
  }

  const getInfo = () => {
    if (highlight) {
      let course = DbServices.getMajorRequirement(highlight)
      return course?.info ?? defaultInfo
    } else {
      return defaultInfo
    }
  }

  const getWarning = () => {
    const course = highlight ? DbServices.getMajorRequirement(highlight) : null
    return (course && warnings.includes(highlight) && course.warning) ? course.warning : null
  }

  const getError = () => {
    const course = highlight ? DbServices.getMajorRequirement(highlight) : null
    return (course && violations.includes(highlight) && course.error) ? course.error : null
  }

  const rowStyle = {
    display: 'flex',
    flexFlow: 'row nowrap',
    borderTopStyle: 'solid',
  }

  const labelWidth = 0.08 * containerWidth

  const renderSeasonLabel = (name) => (
    <div className="title" style={{
      width: labelWidth,
      flexShrink: 0,
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: largeFontSize,
      padding: '4px',
    }}>
      {name}
    </div>
  )

  return (
    <div ref={containerRef} style={{ width: '100%' }}>

      <ScheduleChooser largeFontSize={largeFontSize} smallFontSize={smallFontSize} onClick={handleScheduleChange} />
      <InfoBox fontSize={largeFontSize} info={getInfo()} warning={getWarning()} error={getError()} />

      {schedule.length > 0 ? (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="title" style={{ display: 'flex', flexFlow: 'column nowrap' }}>
            {/* Year header row */}
            <div style={{ display: 'flex', flexFlow: 'row nowrap', paddingLeft: `${labelWidth}px` }}>
              {[1, 2, 3, 4].map(n => (
                <div key={n} style={{ flexGrow: 1, flexShrink: 1, flexBasis: `${0.2 * containerWidth}px`, textAlign: 'center' }}>
                  <div style={{ fontSize: smallFontSize }}>year</div>
                  <div style={{ fontSize: largeFontSize }}>{n}</div>
                </div>
              ))}
            </div>
            {/* Fall row */}
            <div ref={fallRowRef} style={rowStyle}>
              {renderSeasonLabel('fall')}
              {renderSemester(schedule[1])}
              {renderSemester(schedule[3])}
              {renderSemester(schedule[5])}
              {renderSemester(schedule[7])}
            </div>
            {/* Spring row */}
            <div ref={springRowRef} style={rowStyle}>
              {renderSeasonLabel('spr')}
              {renderSemester(schedule[2])}
              {renderSemester(schedule[4])}
              {renderSemester(schedule[6])}
              {renderSemester(schedule[8])}
            </div>
          </div>
        </DndContext>
      ) : null}
    </div>
  )

}

export default Schedule