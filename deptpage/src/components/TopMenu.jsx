import { useState } from "react";
import { Link } from "react-router-dom";

const pageColorClasses = {
  home: "frontpage-home",
  "about-us": "frontpage-about-us",
  "plan-your-major": "frontpage-plan-your-major",
  courses: "frontpage-course-offerings",
  colloquium: "menubar-colloquium",
  "student-life": "frontpage-student-life",
  research: "frontpage-research-opportunities",
  "non-majors": "frontpage-non-majors",
  news: "frontpage-news",
};

const MenuItem = ({ id, text, highlight }) => {
  const [hovering, setHovering] = useState(false);

  const stateClass =
    highlight || hovering ? pageColorClasses[id] : "topmenu-nohighlight";

  return (
    <Link
      className={`topmenu-link topmenu ${stateClass}`}
      to={{ pathname: `/${id}` }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      {text}
    </Link>
  );
};

const TopMenu = ({ currentPage }) => {
  const pages = [
    "home",
    "about-us",
    "plan-your-major",
    "courses",
    "colloquium",
    "student-life",
    "research",
    "non-majors",
    "news",
  ];

  return (
    <div
      className="pagebody topmenu-bar"
      style={{
        display: "flex",
        flexFlow: "row nowrap",
        paddingRight: "40px",
      }}
    >
      <div style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        {pages.map((page) => (
          <MenuItem
            key={page}
            id={page}
            text={page.replaceAll("-", " ")}
            highlight={page === currentPage}
          />
        ))}
      </div>
    </div>
  );
};

export default TopMenu;
