import { Fragment } from "react";
import DbServices from "../services/db.js";
import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";
import Passage from "./Passage";

const Person = (props) => {
  const content = (
    <div
      onClick={() => props.onClick(props)}
      style={{
        display: "flex",
        flexFlow: "row nowrap",
      }}
    >
      <img
        width="80"
        height="80"
        loading="lazy"
        src={props.photo}
        alt={`Photo of ${props.id}`}
      />
      <div
        style={{
          padding: "5px",
        }}
      >
        <div
          className="title"
          style={{
            fontSize: "22px",
          }}
        >
          {props.id}
        </div>
        <div
          className="plaintext"
          style={{
            fontSize: "16px",
          }}
        >
          {props.title}
        </div>
        <div
          className="plaintext"
          style={{
            fontSize: "12px",
          }}
        >
          {props.interests}
        </div>
      </div>
    </div>
  );

  if (props.webpage && props.webpage === "special") {
    // then override hyperlink
    return (
      <div
        className="linkbox"
        style={{
          border: "1px solid black",
          textAlign: "left",
          flexGrow: 1,
          width: "300px",
        }}
      >
        hi
        {content}
      </div>
    );
  } else if (props.webpage && props.webpage.length > 0) {
    return (
      <div
        className="linkbox"
        style={{
          border: "1px solid black",
          textAlign: "left",
          flexGrow: 1,
          width: "300px",
        }}
      >
        <a className="linkbox" href={props.webpage} target="_blank">
          {content}
        </a>
      </div>
    );
  } else {
    return (
      <div
        style={{
          border: "1px solid black",
          textAlign: "left",
          width: "300px",
          flexGrow: 1,
          backgroundColor: "whitesmoke",
        }}
      >
        {content}
      </div>
    );
  }
};

const AboutUs = ({ style, showSidebar, onClick }) => {
  const hubId = "about-us";

  const renderHeading = (heading) => (
    <div className="heading">{heading.toLowerCase()}</div>
  );

  const renderIntro = () =>
    DbServices.getAboutContent().map((item, i) => {
      const gap = i === 0 ? null : <Spacer height="20px" />;
      return (
        <Fragment key={item.title ?? i}>
          {gap}
          <Passage title={item.title} photo={item.photo} article={item.article} />
        </Fragment>
      );
    });

  const renderRole = (role) => (
    <div>
      {renderHeading(role)}
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "stretch",
          alignContent: "stretch",
          gap: "20px",
        }}
      >
        {DbServices.getPeopleByRole(role).map((person) => (
          <Person
            key={person.id}
            id={person.id}
            photo={person.photo}
            role={person.role}
            title={person.title}
            webpage={person.webpage}
            interests={person.interests}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );

  const renderBody = () => (
    <div
      id="frontpage-about-us"
      style={{
        ...style,
        fontSize: "40px",
      }}
    >
      <div
        className="pagebody"
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          
        }}
      >
        {showSidebar ? (
          <Sidebar
            onClick={onClick}
            title="about us"
            className="sidebar-about-us"
          />
        ) : (
          <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
        )}
        <div
          style={{
            width: "100%",

            textAlign: "left",
          }}
        >
          {renderRole("faculty")}
          <div style={{ height: "40px" }}></div>
          {renderRole("staff")}
          <div style={{ height: "40px" }}></div>
          {renderRole("emeriti")}
          <div style={{ height: "40px" }}></div>
          {renderIntro()}
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

export default AboutUs;
