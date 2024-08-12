import Sidebar from './Sidebar'
import { useState, useEffect } from 'react'
import DbServices from '../services/db.js'
import Markdown from 'react-markdown'
import TopMenu from './TopMenu'
import WilliamsHeader from './WilliamsHeader'
import WilliamsFooter from './WilliamsFooter'
import Spacer from './Spacer'

const Opportunity = ({ name, photo, article }) => {

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
    <div className="plaintext" style={{
      display: 'flex',
      flexFlow: 'column nowrap',
      gap: '0px'
    }}>
      {renderHeading(name)}
      {photo ?
        <div className="news-article-photo">
          <img
            width="100%"
            src={photo}
            alt={`photo associated with news article`}
          /> </div> : null}
      <Markdown children={content} />
    </div>
  )
}


const ResearchOpportunities = ({ style, layout, onClick }) => {

  const hubId = "research"

  const opportunities = DbServices.getResearchOpportunities()

  const renderOpportunity = opportunity => (
    <Opportunity
      key={opportunity.name}
      name={opportunity.name}
      photo={opportunity.photo}
      article={opportunity.article}
    />
  )

  const renderBody = () => (
    <div
      id="research-opportunities"
      style={style}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        paddingRight: "40px"
      }}>
        {layout === "wide" ? <Sidebar title="research opportunities" className="sidebar-research-opportunities" onClick={onClick} /> : <div style={{ flexGrow: 0, flexShrink: 0, width: '40px' }} />}
        <div style={{
          width: layout === "wide" ? '70%' : '100%',
          paddingTop: '30px',
          textAlign: 'left'
        }}>
          {opportunities.map(opp => renderOpportunity(opp))}
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

export default ResearchOpportunities;