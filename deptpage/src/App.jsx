import './App.css'
import { useState, useEffect, useRef } from 'react'
import FrontPage from './components/FrontPage'
import AboutUs from './components/AboutUs'
import PlanYourMajor from './components/PlanYourMajor'
import CourseOfferings from './components/CourseOfferings'
import Colloquium from './components/Colloquium'
import StudentLife from './components/StudentLife'
import ResearchOpportunities from './components/ResearchOpportunities'
import NonMajors from './components/NonMajors'

const MenuItem = ({ id, text, highlight, onClick, width }) => {
  const [hovering, setHovering] = useState(false)
  return (
    <div
      className={highlight ? "topmenu topmenu-highlight" : 
        (hovering ? "topmenu topmenu-hover" : "topmenu topmenu-nohighlight")}
      onClick={() => onClick(id)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        flexGrow: "1",
        flexShrink: "0",
        width: width,
      }}>
      <div className="centered">{text}</div>
    </div>
  )
}


function App() {

  const [currentPage, setCurrentPage] = useState('computer science')


  const pages = [
    "computer science",
    "about-us",
    "plan-your-major",
    "courses",
    "colloquium",
    "student-life",
    "research",
    "non-majors"
  ]

  const handleClick = (page) => {
    setCurrentPage(page)
  }

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const getLayout = () => {
    if (windowSize.width >= 910) {
      return "wide"
    } else if (windowSize.width >= 600) {
      return "standard"
    } else {
      return "narrow"
    }
  }


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const renderHeader = () => (
    <div
      style={{
        height: '180px',
        backgroundColor: '#500082',
        textAlign: 'left',
        fontFamily: 'Eph Slab, Rockwell',
        fontSize: '64px',
        color: 'white'
      }}>
      <div style={{
        margin: '0px',
        padding: '30px 0px 0px 32px',
      }}>
        <a className="williams-link" href="https://williams.edu">Williams</a>
      </div>
      <div style={{
        marginTop: '-20px',
        padding: '0px 0px 0px 46px',
        fontSize: '20px',
        fontWeight: 'bold'
      }}>
        Computer Science
      </div>

    </div>
  )

  const renderFooter = () => (
    <div>
      <div style={{ height: '10px', backgroundColor: 'white' }} />
      <div style={{ height: '10px', backgroundColor: '#FFBE0A' }} />
      <div style={{ height: '10px', backgroundColor: '#280050' }} />
      <div
        style={{
          height: '80px',
          backgroundColor: '#500082',
          textAlign: 'left',
          fontFamily: 'Eph Slab, Rockwell',
          fontSize: '30px',
          color: 'white'
        }}>
        <div style={{
          margin: '0px',
          padding: '20px 0px 0px 20px',
        }}>
          <a className="williams-link" href="https://williams.edu">Williams College</a>
        </div>
      </div>
    </div>
  )

  const handleMenuItemClick = (item) => {
    setCurrentPage(item)
  }

  const menuItemsPerLine = () => {
    if (windowSize.width >= 910) {
      return 8
    } else if (windowSize.width >= 500) {
      return 4
    } else {
      return 2
    }
  }

  const renderTopMenu = () => (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'stretch',
      }}>
      {pages.map(page => (
        <MenuItem
          key={page}
          id={page}
          width={`${Math.floor(96 / menuItemsPerLine())}%`}
          text={page.replaceAll('-', ' ')}
          onClick={handleMenuItemClick}
          highlight={page === currentPage}
        />
      ))}
    </div>
  )


  const showSidebar = (getLayout() === "wide")

  const paddingPixels = 20;
  const contentPct = .99;
  const contentStyle = {
    width: contentPct * (windowSize.width - 2 * paddingPixels),
    padding: `${paddingPixels}px`
  }

  const renderHub = () => {
    if (currentPage === 'plan-your-major') {
      return (
        <PlanYourMajor
          layout={getLayout()}
          style={contentStyle}
        />
      )
    } else if (currentPage === 'about-us') {
      return (
        <AboutUs
          showSidebar={showSidebar}
          style={contentStyle} />
      )
    } else if (currentPage === 'courses') {
      return (
        <CourseOfferings
          showSidebar={showSidebar}
          style={contentStyle} />
      )
    } else if (currentPage === 'colloquium') {
      return (
        <Colloquium
          layout={getLayout()}
          style={contentStyle} />
      )
    } else if (currentPage === 'student-life') {
      return (
        <StudentLife
          showSidebar={showSidebar}
          style={contentStyle} />
      )
    } else if (currentPage === 'research') {
      return (
        <ResearchOpportunities
          layout={getLayout()}
          style={contentStyle} />
      )
    } else if (currentPage === 'non-majors') {
      return (
        <NonMajors
          layout={getLayout()}
          style={contentStyle} />
      )
    } else {
      return (
        <></>
      )
    }
  }

  const renderPage = () => {
    if (currentPage === 'computer science') {
      return (
        <div>
          {renderHeader()}
          <FrontPage onChange={handleClick} />
          {renderFooter()}
        </div>
      )
    } else {
      return (
        <div>
          {renderHeader()}
          {renderTopMenu()}
          {renderHub()}
          {renderFooter()}
        </div>)
    }
  }

  return renderPage()
}

export default App
