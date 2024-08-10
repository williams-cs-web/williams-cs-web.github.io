import Sidebar from './Sidebar'
import { useState, useEffect } from 'react'
import DbServices from '../services/db.js'
import Markdown from 'react-markdown'


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
        <img
          width="100%"
          src={photo}
          alt={`photo of research event`}
        /> : null}
      <Markdown children={content} />
    </div>
  )
}


const ResearchOpportunities = ({ style, layout, onClick }) => {

  const opportunities = DbServices.getResearchOpportunities()

  const renderOpportunity = opportunity => (
    <Opportunity
      name={opportunity.name}
      photo={opportunity.photo}
      article={opportunity.article}
    />
  )

  return (
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
}

export default ResearchOpportunities;