import DbServices from '../services/db.js'
import { useState, useEffect } from 'react'
import NewsTile from './NewsTile.jsx'
import WilliamsHeader from './WilliamsHeader'
import WilliamsFooter from './WilliamsFooter'
import { Link } from "react-router-dom";


const ColloquiumTile = ({ layout, onClick, style }) => {

  const events = DbServices.getUpcomingColloquia()

  const renderColloquiumTilePortrait = (event) => (
    <Link to={{ pathname: `/colloquium` }}>
      <div
        onClick={() => onClick("colloquium")}
        id="colloquium"
        className="frontpage-colloquium"
        style={{
          ...style,
          fontSize: "20px"
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
    </Link>
  )

  const renderColloquiumTileLandscape = (event, style) => {
    return (
      <Link to={{ pathname: `/colloquium` }}>
        <div
          onClick={() => onClick("colloquium")}
          id="colloquium"
          className="frontpage-colloquium"
          style={style}
        >
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
      </Link>
    )
  }

  const renderRecowsionTile = (layout) => (
    <div className="frontpage-recowsion" style={{
      ...style,
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
        ...style
      })
    } else {
      return renderColloquiumTileLandscape(events[0], {
        ...style
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
    <Link to={{ pathname: `/${key}` }}>
      <div
        id={className}
        className={`tile ${className}`}
        onClick={() => onClick(key)}
        style={style}

      >

        <div className="centered">
          {text}
        </div>
      </div>
    </Link>
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

  const renderWelcomeTile = (style) => (
    <div className="welcome-tile" style={{
      ...style,
      flexGrow: 1,
      flexShrink: 1
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
      <img src={DbServices.getFrontPageSpotlightInfo().photo} width="100%" alt="spotlight photo" />
    </div>
  )

  const renderCaptionTile = (style) => (
    <div style={{
      ...style,
      fontFamily: 'Eph Octic',
      fontSize: '15px',
      textAlign: 'center',
      backgroundColor: 'white',
      fontWeight: 'normal',
      cursor: 'default'
    }}>
      <div className="centered">{DbServices.getFrontPageSpotlightInfo().caption.toLowerCase()}</div>
    </div>
  )

  const renderWideLayout = () => {
    const column1Width = .3 * windowSize.width;
    const column2Width = .2 * windowSize.width;
    const column3Width = .5 * windowSize.width;

    const photoHeight = .75 * column3Width;
    const captionHeight = 40
    const bottomRightTileHeight = 150
    const columnHeight = photoHeight + captionHeight + bottomRightTileHeight

    return (
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        width: window.innerWidth,
        height: columnHeight,
      }}>
        <div style={{
          width: column1Width
        }}>
          {renderWelcomeTile({
            height: .3*columnHeight,
          })}
          {renderPlanYourMajorTile({
            height: .4*columnHeight,
          })}
          {renderCurrentCourseOfferingsTile({
            height: .3*columnHeight,
          })}
        </div>
        <div style={{
          width: column2Width
        }}>
          {renderAboutUsTile({
            height: .2*columnHeight
          })}
          {renderNewsTile({
            height: .25*columnHeight
          })}
          {renderColloquiumTile({
            height: .55*columnHeight
          })}

        </div>
        <div style={{
          width: column3Width,
        }}>
          {renderPhotoTile({ 'height': photoHeight })}
          {renderCaptionTile({ 'height': captionHeight })}
          <div style={{
            height: {bottomRightTileHeight},
            display: 'flex',
            flexFlow: 'row nowrap'
          }}>
            {renderStudentLifeTile({
              height: bottomRightTileHeight, 
              width: 0.25 * column3Width
            })}
            {renderResearchOpportunitiesTile({
              height: bottomRightTileHeight, 
              width: 0.5 * column3Width
            })}
            {renderNonMajorsTile({
              height: bottomRightTileHeight, 
              width: 0.25 * column3Width
            })}
          </div>
        </div>
      </div>
    )
  }



  const renderStandardRow1 = () => {
    const leftColumnWidth = .3 * windowSize.width;
    const photoWidth = .7 * windowSize.width;
    const photoHeight = .75 * photoWidth;
    const captionHeight = 80
    const rowHeight = photoHeight + captionHeight;

    return (
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        <div style={{
          width: `${leftColumnWidth}px`,
          height: `${rowHeight}px`
        }}>
          {renderWelcomeTile({ height: `${0.6 * rowHeight}px` })}
          {renderAboutUsTile({
            width: '100%',
            height: `${0.1 * rowHeight}px`
          })}
          {renderNewsTile({
            width: '100%',
            height: `${0.3 * rowHeight}px`
          })}
        </div>
        <div style={{
          width: `${photoWidth}px`,
          height: `${photoHeight}px`
        }}>
          {renderPhotoTile({ height: `${photoHeight}px` })}
          {renderCaptionTile({ height: `${captionHeight}px` })}
        </div>
      </div>
    )
  }

  const renderStandardRow2 = () => (
    <div style={{
      display: 'flex',
      flexFlow: 'row nowrap'
    }}>
      {renderCurrentCourseOfferingsTile({
        height: '100px',
        width: `${.6 * windowSize.width}px`
      })}
      {renderNonMajorsTile({
        height: '100px',
        width: `${.4 * windowSize.width}px`
      })}

    </div>
  )

  const renderStandardRow3 = () => {
    const height = 400;

    return (
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
            width: "250px",
            height: `${0.5 * height - 1}px`
          })}
          {renderStudentLifeTile({
            width: "250px",
            height: `${0.5 * height - 1}px`
          })}
        </div>
        {renderColloquiumTile({
          height: `${height}px`
        })}

      </div>
    )
  }

  const renderStandardLayout = () => (
    <div style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      width: window.innerWidth
    }}>

      {renderStandardRow1()}
      {renderPlanYourMajorTile({
        width: windowSize.width,
        height: "100px"
      })}
      {renderStandardRow2()}
      {renderStandardRow3()}
    </div>
  )

  const renderNarrowLayout = () => {
    const tileHeight = '60px'
    const photoHeight = `${.75 * windowSize.width}px`;
    const captionHeight = `40px`

    return (
      <div >
        {renderWelcomeTile({ width: windowSize.width, height: "100px" })}
        {renderNewsTile({ width: windowSize.width, height: tileHeight })}
        {renderPhotoTile({ width: windowSize.width, height: photoHeight })}
        {renderCaptionTile({ width: windowSize.width, height: captionHeight })}
        {renderAboutUsTile({ width: windowSize.width, height: tileHeight })}
        {renderPlanYourMajorTile({ width: windowSize.width, height: tileHeight })}
        {renderCurrentCourseOfferingsTile({ width: windowSize.width, height: tileHeight })}
        {renderStudentLifeTile({ width: windowSize.width, height: tileHeight })}
        {renderResearchOpportunitiesTile({ width: windowSize.width, height: tileHeight })}
        {renderNonMajorsTile({ width: windowSize.width, height: tileHeight })}
        {renderColloquiumTile({ width: windowSize.width, height: "300px" })}
      </div>
    )
  }

  const renderBody = () => {
    if (getLayout() === "wide") {
      return renderWideLayout()
    } else if (getLayout() === "standard") {
      return renderStandardLayout()
    } else {
      return renderNarrowLayout()
    }
  }

  return (
    <div>
      <WilliamsHeader />
      {renderBody()}
      <WilliamsFooter />
    </div>
  )
}

export default FrontPage
