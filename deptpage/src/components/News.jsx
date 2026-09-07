import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import DbServices from "../services/db.js";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownImageComponent } from "../utils/markdownImageComponent.jsx";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";

const NewsItem = ({ date, title, photo, thumbnail, article, teaser, forceOpen }) => {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(forceOpen);

  useEffect(() => {
    DbServices.fetchExternalTextFile(article).then((response) => {
      setContent(response);
    });
  }, []);

  const teaserText = teaser ? teaser : title;

  return (
    <div className="soft-card">
      <div
        className="disclosure-head"
        style={{ cursor: forceOpen ? "default" : "pointer" }}
        onClick={() => {
          if (!forceOpen) setOpen(!open);
        }}
      >
        <img
          width="136"
          height="96"
          loading="lazy"
          style={{ objectFit: "cover", borderRadius: "10px", flexShrink: 0 }}
          src={thumbnail ? thumbnail : photo}
          alt={`Photo for ${title}`}
        />
        <div style={{ flexGrow: 1, flexShrink: 1, minWidth: 0 }}>
          <div className="news-tag" style={{ color: "var(--color-news)" }}>News &middot; {date}</div>
          <div className="title" style={{ fontSize: "17px", marginTop: "2px" }}>{title}</div>
          <div className="plaintext" style={{ fontSize: "13px", color: "#666666", marginTop: "4px" }}>
            {teaserText}
          </div>
        </div>
        {forceOpen ? null : (
          <svg
            className="disclosure-chevron"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", flexShrink: 0 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-purple)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 6 15 12 9 18"></polyline>
          </svg>
        )}
      </div>
      {open ? (
        <div style={{ padding: "0 16px 20px 16px" }}>
          <img width="100%" loading="lazy" style={{ borderRadius: "10px", marginBottom: "14px", display: "block" }} src={photo} alt={`Photo for ${title}`} />
          <div className="plaintext article-body">
            <Markdown remarkPlugins={[remarkGfm]} components={markdownImageComponent}>{content}</Markdown>
          </div>
        </div>
      ) : null}
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

  const forceOpen = newsItems.length === 1;

  const renderNewsItem = (item) => (
    <div key={item.id}>
      <NewsItem
        date={item.date}
        title={item.title}
        photo={item.photo}
        thumbnail={item.thumbnail}
        article={item.article}
        teaser={item.teaser}
        forceOpen={forceOpen}
      />
      <div style={{ height: "12px" }} />
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
            width: "100%",
            textAlign: "left",
          }}
        >
          <div style={{ marginTop: "24px", marginBottom: "20px" }}>
            <div className="eyebrow">News</div>
          </div>
          <div style={{ maxWidth: "780px" }}>
            {newsItems.map((opp) => renderNewsItem(opp))}
          </div>
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
