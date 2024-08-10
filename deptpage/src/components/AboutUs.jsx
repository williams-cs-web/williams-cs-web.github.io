import DbServices from '../services/db.js'
import Sidebar from './Sidebar'


const Person = (props) => {
  const content = (
    <div onClick={() => props.onClick(props)} style={{
      display: 'flex',
      flexFlow: 'row nowrap'
    }}>
      <img width="80" height="80" src={props.photo} alt={`Photo of ${props.id}`} />
      <div style={{
        padding: '5px'
      }}>
        <div className="title" style={{
          fontSize: '22px'
        }}>
          {props.id}
        </div>
        <div className="plaintext" style={{
          fontSize: '16px'
        }}>
          {props.title}
        </div>
        <div className="plaintext" style={{
          fontSize: '12px'
        }}>
          {props.interests}
        </div>
      </div>
    </div>
  )

  if (props.webpage && props.webpage === "special") {  // then override hyperlink
    return (
    <div className="linkbox" style={{
      borderStyle: 'solid',
      textAlign: 'left',
      flexGrow: 1,
      width: '300px',
    }}>
      {content}
    </div>
    )
  } else if (props.webpage && props.webpage.length > 0) {
    return (
      <div className="linkbox" style={{
        borderStyle: 'solid',
        textAlign: 'left',
        flexGrow: 1,
        width: '300px',
      }}>
        <a className="linkbox" href={props.webpage} target="_blank">{content}</a>
      </div>

    )
  } else {
    return (
      <div style={{
        borderStyle: 'solid',
        textAlign: 'left',
        width: '300px',
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
      }}>
        {content}
      </div>

    )
  }
}

const AboutUs = ({ style, showSidebar, onClick }) => {

  const renderHeading = heading => (
    <div className="heading">{heading.toLowerCase()}</div>
  )

  const renderRole = (role) => (
    <div>
      {renderHeading(role)}
      <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'stretch',
        alignContent: 'stretch',
        gap: '20px'
      }}>
        {DbServices.getPeopleByRole(role).map(person =>
          <Person
            key={person.id}
            id={person.id}
            photo={person.photo}
            role={person.role}
            title={person.title}
            webpage={person.webpage}
            interests={person.interests}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  )


  return (
    <div
      id="frontpage-about-us"
      style={{
        ...style,
        fontSize: "40px"
      }}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        {showSidebar ? <Sidebar onClick={onClick} title="about us" className="sidebar-about-us" /> : <div style={{ width: '20px' }} />}
        <div style={{
          width: '100%',
          paddingTop: '30px',
          textAlign: 'left'
        }}>
          {renderRole("faculty")}
          <div style={{ height: '40px' }}></div>
          {renderRole("staff")}
          <div style={{ height: '40px' }}></div>
          {renderRole("emeriti")}
        </div>
      </div>

    </div>
  )
}

export default AboutUs;