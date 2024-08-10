import Sidebar from './Sidebar'
import { useState, useEffect } from 'react'
import DbServices from '../services/db.js'
import Markdown from 'react-markdown'


const NewsItem = ({ date, title, photo, article }) => {

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
      {renderHeading(date)}
      <div className="news-article-title">{title}</div>
      {photo ?
        <img
          width="100%"
          src={photo}
          alt={`photo associated with news article`}
        /> : null}
      <Markdown children={content} />
    </div>
  )
}


const News = ({ style, layout, howMany, date, onClick }) => {

  const newsItems = (
    DbServices
      .getNewsItems()
      .filter(article => (
        Date.parse(article.date) <= date
      )).toSorted((event1, event2) => (
        Date.parse(event2.date) - Date.parse(event1.date)
      )).slice(0, howMany)
  )


  const renderNewsItem = item => (
    <>
      <NewsItem
        date={item.date}
        title={item.title}
        photo={item.photo}
        article={item.article}
      />
      <div style={{ height: '20px' }} />
    </>
  )

  return (
    <div
      id="news"
      style={style}
    >
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap'
      }}>
        {layout === "wide" ? <Sidebar title="news" className="sidebar-news" onClick={onClick} /> : <div style={{ width: '20px' }} />}
        <div style={{
          width: layout === "wide" ? '70%' : '100%',
          paddingTop: '30px',
          textAlign: 'left'
        }}>
          {newsItems.map(opp => renderNewsItem(opp))}
        </div>
      </div>
    </div>
  )
}

export default News;