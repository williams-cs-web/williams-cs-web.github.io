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
import News from './components/News'

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
    "non-majors",
    "news"
  ]


  const handleHubClick = (who) => {
    if (pages.includes(who)) {
      setCurrentPage(who)
    }
    else if (who.id && who.id === "Andrea Danyluk") {
      setCurrentPage("andrea")
      window.scrollTo(0, 0)
    }
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
    <div className="header">
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
      <div className="footer">
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
      return 9
    } else if (windowSize.width >= 600) {
      return 5
    } else {
      return 3
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

  const contentPct = 1.0;
  const contentStyle = {
    width: contentPct * (windowSize.width),    
  }

  const renderHub = () => {
    if (currentPage === 'plan-your-major') {
      return (
        <PlanYourMajor
          layout={getLayout()}
          onClick={handleHubClick}
          style={contentStyle}
        />
      )
    } else if (currentPage === 'about-us') {
      return (
        <AboutUs
          showSidebar={showSidebar}
          onClick={handleHubClick}
          style={contentStyle} />
      )
    } else if (currentPage === 'courses') {
      return (
        <CourseOfferings
          showSidebar={showSidebar}
          onClick={handleHubClick}
          style={contentStyle} />
      )
    } else if (currentPage === 'colloquium') {
      return (
        <Colloquium
          layout={getLayout()}
          onClick={handleHubClick}
          style={contentStyle} />
      )
    } else if (currentPage === 'student-life') {
      return (
        <StudentLife
          onClick={handleHubClick}
          showSidebar={showSidebar}
          style={contentStyle} />
      )
    } else if (currentPage === 'research') {
      return (
        <ResearchOpportunities
          onClick={handleHubClick}
          layout={getLayout()}
          style={contentStyle} />
      )
    } else if (currentPage === 'non-majors') {
      return (
        <NonMajors
          onClick={handleHubClick}
          layout={getLayout()}
          style={contentStyle} />
      )
    } else if (currentPage === 'news') {
      return (
        <News
          onClick={handleHubClick}
          layout={getLayout()}
          howMany={3}
          date={Date.now()}
          style={contentStyle} />
      )
    } else if (currentPage === 'andrea') {
      return (
        <News
          onClick={handleHubClick}
          layout={getLayout()}
          howMany={1}
          date={Date.parse("April 13, 2022")}
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
          <FrontPage onClick={handleHubClick} />
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
