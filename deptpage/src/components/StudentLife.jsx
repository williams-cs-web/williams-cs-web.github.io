import DbServices from '../services/db.js'
import Sidebar from './Sidebar'

const Student = ({ name, year, photo }) => {

  return (
    <div style={{
      borderStyle: 'solid',
      textAlign: 'left',
      width: '240px',
      backgroundColor: 'whitesmoke'
    }}>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        <img width="80" height="80" src={photo} alt={`Photo of ${name}`} />
        <div style={{
          padding: '5px'
        }}>
          <div className="title" style={{            
            fontSize: '22px',
            fontWeight: 'bold'
          }}>
            {name}
          </div>
          <div className="plaintext" style={{
            fontSize: '16px'
          }}>
            {`class of ${year}`}
          </div>
        </div>
      </div>
    </div>
  )
}



const StudentLife = ({ style, onClick, showSidebar }) => {


  const renderHeading = heading => (
    <div className="heading">{heading.toLowerCase()}</div>
  )


  const renderGroupLeadership = (members) => (
    <>
      <div className="title" style={{ fontSize: '22px' }}>board members:</div>

      <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        gap: '20px'
      }}>
        {members.map(person => (
          <Student
            key={person.name}
            name={person.name}
            year={person.year}
            photo={person.photo}
          />)
        )}
      </div>
    </>
  )

  const renderGroupInfo = (group) => {
    let groupName = <div style={{ fontSize: '20px' }}>{group.name}</div>
    return (
      <div className="plaintext">
        {group.webpage ? <a className="link" href={group.webpage} target="_blank">
          {<div className="title">{groupName}</div> }
        </a> : <div className="fakelink title">{groupName}</div>}
        <div>{group.description}</div>
        {
          group.details ? group.details.map((detail, i) =>
            <div key={i} style={{ paddingTop: '10px' }}>{detail}</div>
          ) : null
        }
        <div style={{ height: '20px' }}></div>

        {group.leadership && group.leadership.length > 0 ? renderGroupLeadership(group.leadership) : null}
      </div>
    )
  }

  const groups = DbServices.getStudentGroups()

  const renderGroup = (group, width) => {
    return (
      <div key={group.name}>
        <div style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          gap: '20px'
        }}>
          <div style={{
            flexGrow: 1,
            flexShrink: 1
          }}>
            {renderHeading(group.abbreviation)}
            {renderGroupInfo(group)}
            {group.gallery ? renderGallery(group.gallery, width) : null}
          </div>
        </div>
        <div style={{
          height: '20px'
        }} />
      </div>
    )
  }

  const renderGalleryRow = (photos, width) => (
    <div style={{
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'flex-start'
    }}>
      {photos.map(photo =>
        <div key={photo}>
          <img style={{ 'margin': '1px' }} width={width / photos.length} src={photo}></img>
        </div>
      )}
    </div>
  )

  const renderGallery = (photos, width) => {
    let evens = [...Array(photos.length).keys()].filter(x => x % 2 == 0)
    return (
      <div>
        {evens.map(index => (
          renderGalleryRow(photos.slice(index, index+2), width)
        ))}
      </div>
    )
  }

  const contentPct = showSidebar ? .8 : .95


  return (
    <div
      id="student-life"
      style={{
        ...style,
        fontSize: "40px"
      }}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        {showSidebar ? <Sidebar onClick={onClick} title="student life" className="sidebar-student-life" /> : <div style={{ width: '20px' }} />}

        <div style={{
          width: `${contentPct * 100}%`,
          paddingTop: '30px',
          textAlign: 'left'
        }}>
          {groups.map(group => renderGroup(group, contentPct * style.width))}


        </div>
      </div>

    </div>
  )
}

export default StudentLife;