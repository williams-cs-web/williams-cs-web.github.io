import Schedule from './Schedule'
import Sidebar from './Sidebar'
import StudyAway from './StudyAway'
import { useState, useEffect } from 'react'
import DbServices from '../services/db.js'
import Markdown from 'react-markdown'
import TopMenu from './TopMenu'
import WilliamsHeader from './WilliamsHeader'
import WilliamsFooter from './WilliamsFooter'
import Spacer from './Spacer'

const Passage = ({ title, photo, article }) => {

  const [content, setContent] = useState("")

  const renderHeading = (heading) => (
    <div className="heading">{heading.toLowerCase()}</div>
  )

  useEffect(() => {
    DbServices.fetchExternalTextFile(article)
      .then(response => {
        setContent(response)
      })
  }, [])

  return (
    <div className="plaintext left" style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      gap: '0px'
    }}>
      {title ? renderHeading(title) : null}
      {photo ?
        <div className="news-article-photo">
          <img
            width="100%"
            src={photo}
            alt={`photo associated with passage`}
          /> </div> : null}
      <Markdown children={content} />
    </div>
  )
}


const PlanYourMajor = ({ style, layout, onClick }) => {

  const hubId = "plan-your-major"

  const showSidebar = (layout === "wide")

  const renderContent = () => {
    return (
      DbServices.getPlanYourMajorContent().map(item => {
        if (item.component && item.component === "MajorPlanningAssistant") {
          return (
            <>
              <Spacer height="20px" />
              <div className="heading" style={{
                textAlign: 'left'
              }}>major planning assistant</div>
              <Schedule
                style={{
                  width: showSidebar ? 0.7 * style.width - 40 : style.width - 80
                }}
              />
            </>
          )
        } else if (item.component && item.component === "StudyAway") {
          return (
            <>
              <Spacer height="20px" />
              <StudyAway layout="narrow" />
            </>
          )
        } else {
          return (
            <>
              <Spacer height="20px" />
              <Passage
                title={item.title}
                article={item.article}
              />
            </>
          )
        }
      })
    )
  }

  const renderBody = () => (
    <div
      id="frontpage-plan-your-major"
      style={{
        ...style,
        fontSize: "40px"
      }}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        paddingRight: "40px"
      }}>
        {showSidebar ? <Sidebar title="plan your major" className="sidebar-plan-your-major" onClick={onClick} /> : <div style={{ flexGrow: 0, flexShrink: 0, width: '40px' }} />}
        <div>
          <div>
            <Spacer height="10px" />
            {renderContent()}
          </div>


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

export default PlanYourMajor;