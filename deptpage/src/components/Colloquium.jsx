import DbServices from '../services/db.js'
import { useState } from 'react'
import Sidebar from './Sidebar'

const Colloquium = ({ style, layout }) => {

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
            {renderHeading(event.date)}
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
            {renderHeading(event.date)}
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
      margin: '10px',
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
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
    <div style={{
      display: 'flex',
      flexFlow: 'row nowrap',
      gap: '20px'
    }}>
      {events.map((event, i) =>
        <div style={{ flexGrow: 1, flexShrink: 1 }}>{renderPreview(event, i)}</div>
      )}
    </div>
  )

  return (
    <div
      id="colloquium"
      style={{
        ...style,
        fontSize: "36px"
      }}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        {showSidebar ?
          <Sidebar title="colloquium" className="sidebar-colloquium" />
          : <div style={{ width: '20px' }} />}
        <div style={{
          width: '95%',
          paddingTop: '30px',
          textAlign: 'left'
        }}>
          {events.length > 1 && showSidebar ? renderPreviews() : null}
          <div style={{ height: '20px' }}></div>
          {showSidebar ? (
            events.length > 0 ?
              renderSpotlightEvent(spotlight ? events[spotlight] : events[0])
              : null) : events.map(event => renderSpotlightEvent(event))}
        </div>
      </div>

    </div>
  )
}

export default Colloquium;