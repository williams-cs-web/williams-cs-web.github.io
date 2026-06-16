import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import DbServices from "../services/db.js";
import Markdown from "react-markdown";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";

const NewsItem = ({ date, title, photo, article }) => {
  const [content, setContent] = useState("");

  const renderHeading = (heading) => (
    <div className="heading">{heading.toLowerCase()}</div>
  );

  useEffect(() => {
    DbServices.fetchExternalTextFile(article).then((response) => {
      setContent(response);
    });
  }, []);

  return (
    <div
      className="plaintext"
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        gap: "0px",
      }}
    >
      {renderHeading(date)}
      <div className="news-article-title">{title}</div>
      {photo ? (
        <div className="news-article-photo">
          <img
            width="100%"
            src={photo}
            alt={`photo associated with news article`}
          />{" "}
        </div>
      ) : null}
      <Markdown>{content}</Markdown>
    </div>
  );
};

const News = ({ style, layout, howMany, date, onClick, showSidebar }) => {
  const hubId = "news";

  const newsItems = DbServices.getNewsItems()
    .filter((article) => Date.parse(article.date) <= date)
    .toSorted(
      (event1, event2) => Date.parse(event2.date) - Date.parse(event1.date),
    )
    .slice(0, howMany);

  const renderNewsItem = (item) => (
    <div key={item.id}>
      <NewsItem
        date={item.date}
        title={item.title}
        photo={item.photo}
        article={item.article}
      />
      <div style={{ height: "20px" }} />
    </div>
  );

  const renderBody = () => (
    <div id="news" style={style}>
      <div
        className="pagebody"
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          
        }}
      >
        {showSidebar ? (
          <Sidebar title="news" className="sidebar-news" onClick={onClick} />
        ) : (
          <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
        )}
        <div
          style={{
            width: "100%", //layout === "wide" ? "70%" : "100%",
            
            textAlign: "left",
          }}
        >
          {newsItems.map((opp) => renderNewsItem(opp))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <WilliamsHeader />
      <TopMenu onClick={onClick} currentPage={hubId} width={style.width} />
      {renderBody()}
      <Spacer height="10px" />
      <WilliamsFooter />
    </div>
  );
};

export default News;
