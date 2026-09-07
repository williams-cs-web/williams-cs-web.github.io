import { useState } from "react";
import DbServices from "../services/db.js";
import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";
import Passage from "./Passage";
import Disclosure from "./Disclosure";

const ROLES = ["faculty", "staff", "emeriti"];

const Person = (props) => {
  const content = (
    <div style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center", gap: "12px" }}>
      <img
        width="40"
        height="40"
        loading="lazy"
        style={{ objectFit: "cover", borderRadius: "50%", flexShrink: 0 }}
        src={props.photo}
        alt={`Photo of ${props.id}`}
      />
      <div style={{ minWidth: 0 }}>
        <div className="title" style={{ fontSize: "16px" }}>{props.id}</div>
        <div className="plaintext" style={{ fontSize: "12px", color: "#666666", lineHeight: 1.3 }}>{props.title}</div>
      </div>
    </div>
  );

  const interests = props.interests ? (
    <div
      className="plaintext"
      style={{
        fontSize: "13px",
        color: "#777777",
        lineHeight: 1.4,
        marginTop: "10px",
      }}
    >
      {props.interests}
    </div>
  ) : null;

  const card = (
    <div className="soft-card" style={{ padding: "16px", display: "block", color: "inherit" }}>
      {content}
      {interests}
    </div>
  );

  return props.webpage && props.webpage.length > 0 ? (
    <a href={props.webpage} target="_blank" style={{ display: "block", color: "inherit" }}>
      {card}
    </a>
  ) : (
    card
  );
};

const AboutUs = ({ style, showSidebar, onClick }) => {
  const hubId = "about-us";

  const [role, setRole] = useState(ROLES[0]);

  const renderIntro = () =>
    DbServices.getAboutContent().map((item) => (
      <Disclosure key={item.title} title={item.title}>
        <Passage title={null} photo={item.photo} article={item.article} />
      </Disclosure>
    ));

  const people = DbServices.getPeopleByRole(role);

  const renderBody = () => (
    <div id="frontpage-about-us" style={{ ...style, fontSize: "40px" }}>
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
        <div style={{ width: "100%", textAlign: "left" }}>
          <div style={{ marginTop: "24px", display: "flex", flexFlow: "row wrap", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
            <div className="eyebrow">Department Members</div>
            <div style={{ display: "flex", flexFlow: "row wrap", alignItems: "center", gap: "12px" }}>
              {ROLES.map((r) => (
                <div
                  key={r}
                  className={`pill-tab ${r === role ? "pill-tab-active" : ""}`}
                  onClick={() => setRole(r)}
                >
                  {r}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
              alignItems: "start",
              marginTop: "18px",
            }}
          >
            {people.map((person) => (
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

          <div style={{ marginTop: "40px" }}>
            <div className="eyebrow">Learn More</div>
            <div style={{ marginTop: "14px", maxWidth: "780px" }}>
              {renderIntro()}
            </div>
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

export default AboutUs;
