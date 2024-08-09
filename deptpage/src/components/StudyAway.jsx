import { useState } from 'react'
import equivs from '../services/equivalents.json'

const programs = [...new Set(equivs.map(datum =>
  datum.program
))].sort()


const BoxTitle = ({ title, color }) => {
  return (
    <div className="title" style={{
      fontSize: "30px",
      color: color,
      padding: "30px"
    }}>
      {title}
    </div>
  )
}

const Program = ({ name, onClick, highlight, style }) => {

  const styleHighlighted = {
    ...style,
    backgroundColor: "orangered",
    color: "white",
  }

  const renderContent = () => {
    return (
      <div
        className="program text"
        onClick={() => onClick(name)}
        style={highlight ? styleHighlighted : style}>
        <span>{name}</span>
      </div>
    )
  }

  return renderContent()
}

const Programs = ({ onClick, highlight, layout }) => {

  const standardStyle = {
    display: 'flex',
    flexFlow: 'column wrap',
    height: '500px',
    justifyContent: 'stretch',
    alignContent: 'stretch',
    alignItems: 'stretch',
  }

  const narrowStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  }

  const programStyle = {
    width: '150px',
    margin: '2px',
    padding: '2px',
  }

  const programStyleNarrow = {
    
    margin: '2px',
    padding: '2px',
    border: 'solid 1px gray',
    flexGrow: 1,
  }

  return (
    <div style={{
      backgroundColor: "whitesmoke",
      padding: '10px',
      flexGrow: 0,
      flexShrink: 0
    }}>
      <BoxTitle title="programs" color="black" />

      <div style={layout === "narrow" ? narrowStyle : standardStyle}>
        {programs.map(program => (
          <Program
            key={program}
            name={program}
            onClick={onClick}
            highlight={program === highlight}
            style={layout === "narrow" ? programStyleNarrow : programStyle}
          />
        ))}
        
      </div>

    </div>
  )
}

const Course = ({ name, csEquiv, mathEquiv }) => {

  const renderCSEquiv = (equiv) => {
    if (equiv == "no") {
      return '❌'
    } else {
      return csEquiv
    }
  }

  const renderContent = () => {
    return <div
      style={{
        margin: '2px',
        padding: '2px',
        color: 'black',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        gap: '10px',
        fontSize: '16px'
      }}>
      <div className="course" style={{ color: 'darkgreen', flexGrow: 0, flexShrink: 0, width: '50px' }}>{renderCSEquiv(csEquiv)}</div>
      <div style={{ flexGrow: 0, flexShrink: 0, width: '50px' }}>{mathEquiv == 1 ? '✔️' : '❌'}</div>
      <div className="course" style={{ flexGrow: 1, flexShrink: 1 }}>{name.toUpperCase()}</div>

    </div>
  }

  return renderContent()
}

const Courses = ({ program }) => {

  const courses = equivs.filter(datum => datum.program === program)

  return (
    <div style={{
      backgroundColor: "white",
      padding: '10px',
      flexGrow: 1,
      flexShrink: 1
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'stretch'
      }}>
        <div
          className="title studyaway-heading" style={{
            fontSize: "16px",
            margin: '2px',
            padding: '2px',
            color: 'white',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
          <div style={{ flexGrow: 0, flexShrink: 0, width: '50px' }}>CSCI?</div>
          <div style={{ flexGrow: 0, flexShrink: 0, width: '50px' }}>MATH?</div>
          <div style={{ flexGrow: 1, flexShrink: 1 }}></div>

        </div>

        {courses.map(course => (
          <Course
            key={course.course}
            name={course.course}
            csEquiv={course.cs_equiv}
            mathEquiv={course.math_equiv}
          ></Course>
        ))}
        <div style={{ flexGrow: 1, flexShrink: 1 }}></div>

      </div>

    </div>
  )

}

function StudyAway({ layout }) {
  const [currentProgram, setCurrentProgram] = useState("AIT Budapest")

  console.log('studyaway', layout)

  const handleClick = (name) => {
    setCurrentProgram(name)
  }

  return (
    <div style={{
      display: 'flex',
      flexFlow: layout === "narrow" ? 'column nowrap' : 'row nowrap'
    }}>
      <Programs layout={layout} onClick={handleClick} highlight={currentProgram} />
      <Courses program={currentProgram} />
    </div>
  )
}

export default StudyAway
