import DbServices from '../services/db.js'
import { useState } from 'react'
import Sidebar from './Sidebar'
import TopMenu from './TopMenu'
import WilliamsHeader from './WilliamsHeader'
import WilliamsFooter from './WilliamsFooter'
import Spacer from './Spacer'

const Colloquium = ({ style, layout, onClick }) => {

  const hubId = "colloquium"

  const [spotlight, setSpotlight] = useState(0)

  const showSidebar = (layout === "wide");

  const renderHeading = heading => (
    <div className="heading" style={{
      marginTop: '0px'
    }}>{heading.toLowerCase()}</div>
  )

  const renderSubheading = (heading) => (
    <div className="subheading">{heading.toLowerCase()}</div>
  )

  const events = DbServices.getUpcomingColloquia()

  const renderSpotlightEvent = (event) => {
    if (layout === "narrow") {
      return renderSpotlightEventNarrow(event)
    } else {
      return renderSpotlightEventWide(event)
    }
  }

  const renderSpotlightEventWide = (event) => {

    const location = event.location ? event.location : "TCL 123"
    const time = event.time ? event.time : "2:35pm"


    return (
      <div>
        <div style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          gap: '20px'
        }}>
          <div><img height="300" width="300" src={event.photo} alt={`photo of ${event.speaker}`} /></div>
          <div style={{
            flexGrow: 1,
            flexShrink: 1
          }}>
            {renderHeading(`${event.date} (${location}, ${time})`)}
            <div className="colloquium-title" style={{ fontSize: '20px' }}>{event.title}</div>
            <div className="colloquium-speaker" style={{ fontSize: '17px' }}>{event.speaker}, {event.affiliation}</div>
            <div className="plaintext" style={{ fontSize: '14px' }}>{event.abstract}</div>
          </div>
        </div>
        <div style={{ height: '50px' }} />
      </div>
    )

  }

  const renderSpotlightEventNarrow = (event) => {

    const location = event.location ? event.location : "TCL 123"
    const time = event.time ? event.time : "2:35pm"

    return (
      <div>
        <div style={{
          display: 'flex',
          flexFlow: layout === "narrow" ? 'column nowrap' : 'row nowrap',
          alignItems: 'stretch',
          gap: '20px'
        }}>
          <div style={{
            flexGrow: 1,
            flexShrink: 1
          }}>
            {renderHeading(`${event.date} (${location}, ${time})`)}
            <div className="colloquium-title" style={{ fontSize: '20px' }}>{event.title}</div>
            <div className="colloquium-speaker" style={{ fontSize: '17px' }}>{event.speaker}, {event.affiliation}</div>
            <div style={{ backgroundColor: 'whitesmoke', padding: '10px', textAlign: 'center' }}>
              <img height="300" width="300" src={event.photo} alt={`photo of ${event.speaker}`} />
            </div>
            <div className="plaintext" style={{ fontSize: '14px' }}>{event.abstract}</div>
          </div>
        </div>
        <div style={{ height: '50px' }} />
      </div>
    )

  }

  const renderPreview = (event, i) => (
    <div onClick={() => setSpotlight(i)} style={{
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      justifyContent: 'space-between',
      gap: '3px',
      backgroundColor: i == spotlight ? '#eaeaea' : 'inherit'
    }}>
      <div><img height="80" width="80" src={event.photo} alt={`photo of ${event.speaker}`} /></div>
      <div style={{
        flexGrow: 1,
        flexShrink: 1
      }}>
        {renderSubheading(event.date)}
        <div className="colloquium-speaker" style={{ marginLeft: '8px', fontSize: '15px' }}>{event.speaker}</div>
        <div className="colloquium-title" style={{ margin: '8px', fontSize: '10px' }}>{event.title}</div>
      </div>
    </div>
  )

  const renderPreviews = () => (
    <>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {events.map((event, i) =>
          <div key={`preview-${i}`} style={{ flexGrow: 1, flexShrink: 1 }}>{renderPreview(event, i)}</div>
        )}

      </div>
      <div style={{ height: '20px' }}></div>
    </>
  )

  const renderContent = () => {
    if (events.length > 0) {
      return (
        <div>
          {events.length > 1 && showSidebar ? renderPreviews() : null}
          {showSidebar ? (
            events.length > 0 ?
              renderSpotlightEvent(spotlight ? events[spotlight] : events[0])
              : null) : events.map(event => renderSpotlightEvent(event))}
        </div>
      )
    } else {
      return (
        <div>
          <div style={{
            border: "solid 5px #FFBE0A",
            marginBottom: "10px"
          }}>
            <img src="images/misc/hiatus.png" width="100%" />
          </div>
          <div className="plaintext" style={{
            display: 'flex',
          }}>
            Our colloquium is currently on hiatus, but
            come back for updates when we approach the start of the semester!
            The Computer Science Colloquium at Williams College takes place
            most Fridays from 2:35pm to 3:50pm in Wege Auditorium (TCL 123).
          </div>
        </div>
      )
    }
  }

  const renderBody = () => (
    <div
      id="colloquium"
      style={{
        ...style,
        fontSize: "36px"
      }}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        paddingRight: "40px"
      }}>
        {showSidebar ?
          <Sidebar title="colloquium" className="sidebar-colloquium" onClick={onClick} />
          : <div style={{ flexGrow: 0, flexShrink: 0, width: '40px' }} />}
        <div style={{
          width: '95%',
          paddingTop: '40px',
          textAlign: 'left'
        }}>
          {renderContent()}
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

export default Colloquium;