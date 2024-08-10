import DbServices from '../services/db.js'
import { useState, useEffect } from 'react'
import NewsTile from './NewsTile.jsx'

const ColloquiumTile = ({ layout, onClick }) => {

  const events = DbServices.getUpcomingColloquia()

  const renderColloquiumTilePortrait = (event) => (
    <div onClick={() => onClick("colloquium")} id="colloquium" className="colloquium" style={{
      flexGrow: 1,
      flexShrink: 1,
      fontSize: "20px",
      height: '55%',
    }}>
      <div className="centered">
        <div className="tile">upcoming colloquium</div>
        <div className="plaintext" style={{
          fontSize: "15px",
          paddingBottom: "10px"
        }}>{event.date.toLowerCase()}</div>
        <div style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
          <div style={{
            width: '50%',
            margin: '5px',
            flexGrow: 1,
            flexShrink: 1
          }}>
            <img width="100%" src={event.photo} alt="Speaker Photo" />
          </div>
          <div style={{
            width: '50%',
            margin: '5px',
          }}>
            <div className="frontpage-colloquium-speaker" style={{ fontSize: '15px' }}>
              {event.speaker}
            </div>
            <div className="frontpage-colloquium-affiliation" style={{ fontSize: '12px' }}>
              {event.affiliation}
            </div>
          </div>
        </div>
        <div className="frontpage-colloquium-title" style={{ fontSize: "14px" }}>
          {event.title}
        </div>
      </div>
    </div>
  )

  const renderColloquiumTileLandscape = (event, style) => (
    <div
      onClick={() => onClick("colloquium")}
      id="colloquium"
      className="colloquium"
      style={{
        ...style,
        flexGrow: 1,
        flexShrink: 1,
      }}>
      <div className="centered">
        <div className="tile" style={{ paddingTop: '10px' }}>upcoming colloquium</div>
        <div className="plaintext" style={{
          fontSize: "15px",
          paddingBottom: "5px"
        }}>{event.date.toLowerCase()}</div>
        <div style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          alignContent: 'center',
        }}>
          <div style={{
            width: '40%',
            margin: '10px'
          }}>
            <img width="100%" src={event.photo} alt="Speaker Photo" />
          </div>
          <div style={{
            width: '60%'
          }}>
            <div className="frontpage-colloquium-speaker" style={{ fontSize: '18px' }}>
              {event.speaker}
            </div>
            <div className="frontpage-colloquium-affiliation" style={{ fontSize: '12px' }}>
              {event.affiliation}
            </div>
            <div style={{ height: '12px' }}></div>
            <div className="frontpage-colloquium-title" style={{ fontWeight: "bold", fontSize: "14px" }}>
              {event.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRecowsionTile = (layout) => (
    <div className="frontpage-recowsion" style={{
      height: layout === "wide" ? '55%' : 'auto',
      display: 'flex',
      flexFlow: 'column nowrap',
      backgroundColor: 'lightpink',
      marginLeft: layout === "standard" ? '3px' : 'inherit' // TODO: maybe fix this bandage
    }}>
      <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
      <div className="plaintext">powered by</div>
      <div><img src="images/misc/recowsion.png" width="80%" alt="department logo" /></div>
      <div style={{ flexGrow: 1, flexShrink: 1 }}></div>
    </div>
  )

  const renderColloquiumTile = () => {
    if (events.length == 0) {
      return renderRecowsionTile(layout)
    } else if (layout === "wide") {
      return renderColloquiumTilePortrait(events[0])
    } else if (layout === "standard") {
      return renderColloquiumTileLandscape(events[0], {
        width: "20%",
        fontSize: "20px",
        marginLeft: '3px' // TODO: maybe fix this bandage    
      })
    } else {
      return renderColloquiumTileLandscape(events[0], {
        fontSize: "30px"
      })
    }
  }

  return renderColloquiumTile()
}



const FrontPage = ({ onClick }) => {

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

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

  const getLayout = () => {
    if (windowSize.width >= 910) {
      return "wide"
    } else if (windowSize.width >= 660) {
      return "standard"
    } else {
      return "narrow"
    }
  }

  const renderBasicTile = (style, className, key, text) => (
    <div
      id={className}
      className={`tile ${className}`}
      onClick={() => onClick(key)}
      style={style}
    >
      <div className="centered">
        <div style={{ padding: '10px 5px 5px 5px' }}>
          {text}
        </div>
      </div>
    </div>
  )

  const renderPlanYourMajorTile = (style) => (
    renderBasicTile(
      style,
      "frontpage-plan-your-major",
      "plan-your-major",
      "plan your major"
    )
  )

  const renderCurrentCourseOfferingsTile = (style) => (
    renderBasicTile(
      style,
      "frontpage-course-offerings",
      "courses",
      "current course offerings"
    )
  )

  const renderAboutUsTile = (style) => (
    renderBasicTile(
      style,
      "frontpage-about-us",
      "about-us",
      "about us"
    )
  )

  const renderStudentLifeTile = (style) => (
    renderBasicTile(
      style,
      "frontpage-student-life",
      "student-life",
      "student life"
    )
  )

  const renderNonMajorsTile = (style) => (
    renderBasicTile(
      style,
      "frontpage-non-majors",
      "non-majors",
      "non-majors"
    )
  )

  const renderResearchOpportunitiesTile = (style) => (
    renderBasicTile(
      style,
      "frontpage-research-opportunities",
      "research",
      "research opportunities"
    )
  )

  const renderWelcomeTile = (height) => (
    <div className="welcome-tile" style={{
      flexGrow: 1,
      flexShrink: 1,
      height: height
    }}
    >
      <div className="centered" style={{
        padding: "10px"
      }}>
        hello world! we are
        the <span style={{ fontWeight: 'bold' }}>computer science department</span> at williams college
      </div>
    </div>
  )

  const renderNewsTile = (style) => (
    <NewsTile onClick={onClick} layout={getLayout()} style={style} />    
  )

  const renderColloquiumTile = (style) => (
    <ColloquiumTile onClick={onClick} layout={getLayout()} style={style} />
  )

  const renderPhotoTile = (style) => (
    <div style={{
      ...style,
      margin: '1px',
      backgroundColor: "white",
    }}>
      <img src="images/misc/mounthope.png" width="100%" alt="mount hope event" />


    </div>
  )

  const renderCaptionTile = (style) => (
    <div className="left" style={{
      ...style,
      fontFamily: 'Eph Octic',
      fontSize: '15px',
      textAlign: 'center',
      margin: '1px',
      marginTop: '2px',
      backgroundColor: 'white',
      fontWeight: 'normal',
      cursor: 'default'
    }}>
      <div className="centered">graduation event at mount hope, may 29 2024</div>
    </div>
  )




  const renderWideLayout = () => (
    <div style={{
      display: 'flex',
      flexFlow: 'row nowrap',
      width: window.innerWidth,
      height: 0.6 * window.innerWidth,
    }}>
      <div style={{
        width: '30%'
      }}>
        {renderWelcomeTile('30%')}
        {renderPlanYourMajorTile({
          height: '40%'
        })}
        {renderCurrentCourseOfferingsTile({
          height: '30%'
        })}
      </div>
      <div style={{
        width: "20%"
      }}>
        {renderAboutUsTile({
          height: '20%'
        })}
        {renderNewsTile({
          height: '25%'
        })}
        {renderColloquiumTile()}

      </div>
      <div style={{
        width: "50%",
      }}>
        {renderPhotoTile({ 'height': '62%' })}
        {renderCaptionTile({ 'height': '5%' })}
        <div style={{
          height: "33%",
          display: 'flex',
          flexFlow: 'row nowrap'
        }}>
          {renderStudentLifeTile({
            width: "29%"
          })}
          {renderResearchOpportunitiesTile({
            width: "48%"
          })}
          {renderNonMajorsTile({
            width: "23%"
          })}
        </div>
      </div>
    </div>
  )

  const renderStandardLayout = () => (
    <div style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      width: window.innerWidth
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        <div style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center'
        }}>
          {renderWelcomeTile('inherit')}
          {renderAboutUsTile({
            height: 'inherit'
          })}
          {renderNewsTile({
            height: '25%'
          })}
        </div>
        <div style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center'
        }}>
          {renderPhotoTile({})}
          {renderCaptionTile({ padding: '10px' })}
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        {renderPlanYourMajorTile({
          width: "100%",
          paddingTop: "10px",
          paddingBottom: "10px"
        })}
      </div>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        {renderCurrentCourseOfferingsTile({
          width: "60%",
          paddingTop: "10px",
          paddingBottom: "10px"
        })}
        {renderNonMajorsTile({
          width: "40%",
          paddingTop: "10px",
          paddingBottom: "10px"
        })}
      </div>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        <div style={{
          display: 'flex',
          width: '40%',
          flexFlow: 'column nowrap'
        }}>
          {renderResearchOpportunitiesTile({
            width: "100%",
            height: "50%"
          })}
          {renderStudentLifeTile({
            width: "100%",
            height: "50%",
          })}
        </div>
        {renderColloquiumTile()}

      </div>
    </div>
  )

  const renderNarrowLayout = () => (
    <div style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      width: window.innerWidth
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        <div style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center'
        }}>

          {renderWelcomeTile('inherit')}
          {renderNewsTile({
            height: '25%'
          })}
          {renderPhotoTile({ width: windowSize.width })}
          {renderCaptionTile({ width: windowSize.width })}
          {renderAboutUsTile({})}
          {renderPlanYourMajorTile({})}
          {renderCurrentCourseOfferingsTile({})}
          {renderStudentLifeTile({})}
          {renderResearchOpportunitiesTile({})}
          {renderNonMajorsTile({})}
          {renderColloquiumTile()}
        </div>

      </div>

    </div>
  )

  if (getLayout() === "wide") {
    return renderWideLayout()
  } else if (getLayout() === "standard") {
    return renderStandardLayout()
  } else {
    return renderNarrowLayout()
  }
}

export default FrontPage
