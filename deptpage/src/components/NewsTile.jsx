import DbServices from "../services/db.js";
import { Link } from "react-router-dom";

const NewsTile = ({ onClick, style }) => {
  const newsItems = DbServices.getNewsItems()
    .filter((article) => Date.parse(article.date) <= Date.now())
    .toSorted(
      (event1, event2) => Date.parse(event2.date) - Date.parse(event1.date),
    );

  const news = newsItems.length > 0 ? newsItems[0] : null;
  const teaser = news.teaser ? news.teaser : news.title;

  const teaserLine = (
    <div>
      <span style={{ fontWeight: "bold" }}>department news:</span>{" "}
      {teaser.toLowerCase()}
    </div>
  );

  return (
    <Link
      to={{ pathname: `/news` }}
      onClick={() => { onClick("news"); window.scrollTo(0, 0); }}
      className="news-widget"
      style={{ display: "block", boxSizing: "border-box", ...style }}
    >
      {news.thumbnail ? (
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            height: "100%",
            gap: "12px",
          }}
        >
          <img
            src={news.thumbnail}
            alt=""
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "6px",
              flexShrink: 0,
              marginLeft: "12px",
            }}
          />
          <div style={{ fontSize: "16px", fontWeight: "normal", paddingRight: "10px" }}>
            {teaserLine}
          </div>
        </div>
      ) : (
        <div
          className="centered"
          style={{
            padding: "0px 10px 0px 10px",
            fontSize: "16px",
            fontWeight: "normal",
          }}
        >
          {teaserLine}
        </div>
      )}
    </Link>
  );
};

export default NewsTile;
