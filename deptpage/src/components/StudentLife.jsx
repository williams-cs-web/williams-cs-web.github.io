import DbServices from '../services/db.js'
import Sidebar from './Sidebar'
import TopMenu from './TopMenu'
import WilliamsHeader from './WilliamsHeader'
import WilliamsFooter from './WilliamsFooter'
import Spacer from './Spacer'

const Student = ({ name, year, photo }) => {

  return (
    <div style={{
      borderStyle: 'solid',
      textAlign: 'left',
      flexGrow: 1,
      flexBasis: '280px',
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

  const hubId = "student-life"


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

  const renderGroup = (group) => {
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
            {group.gallery ? renderGallery(group.gallery) : null}
          </div>
        </div>
        <div style={{
          height: '20px'
        }} />
      </div>
    )
  }

  const renderGalleryRow = (photos) => (
    <div key={`gallery-row-${photos.join('-')}`} style={{
      display: 'flex',
      flexFlow: 'row nowrap',
      gap: '2px',
    }}>
      {photos.map(photo =>
        <div key={photo} style={{ flex: 1 }}>
          <img style={{ width: '100%', display: 'block' }} src={photo} alt="" />
        </div>
      )}
    </div>
  )

  const renderGallery = (photos) => {
    let evens = [...Array(photos.length).keys()].filter(x => x % 2 === 0)
    return (
      <div>
        {evens.map(index => (
          renderGalleryRow(photos.slice(index, index+2))
        ))}
      </div>
    )
  }

  const contentPct = showSidebar ? .7 : 1.0


  const renderBody = () => (
    <div
      id="student-life"
      style={{
        ...style,
        fontSize: "40px"
      }}
    >
      <div className="pagebody" style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        
      }}>
        {showSidebar ? <Sidebar onClick={onClick} title="student life" className="sidebar-student-life" /> : <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: '80px' }} />}

        <div style={{
          width: `${contentPct * 100}%`,
          paddingTop: '16px',
          textAlign: 'left'
        }}>
          {groups.map(group => renderGroup(group))}


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
      <Spacer height="10px" />
      <WilliamsFooter />
    </div>
  )
}

export default StudentLife;