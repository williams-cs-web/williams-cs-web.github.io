import DbServices from '../services/db.js'
import { Link } from "react-router-dom";

const NewsTile = ({ onClick, style }) => {

  const newsItems = (
    DbServices
      .getNewsItems()
      .filter(article => (
        Date.parse(article.date) <= Date.now()
      )).toSorted((event1, event2) => (
        Date.parse(event2.date) - Date.parse(event1.date)
      ))
  )

  const news = newsItems.length > 0 ? newsItems[0] : null
  const teaser = news.teaser ? news.teaser : news.title

  return (
    <Link to={{ pathname: `/news` }}>
    <div onClick={() => onClick("news")} className="frontpage-news" style={{ ...style }}>
      <div
        className="centered"
        style={{
          padding: '0px 10px 0px 10px',
          fontSize: '14px',
          fontWeight: 'normal'
        }}>

        <div><span style={{ fontWeight: 'bold' }}>department news:</span> {teaser.toLowerCase()}</div>
      </div>
    </div>
    </Link>
  )
}

export default NewsTile