import DbServices from "../services/db.js";
import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const EventRow = ({ event }) => {
  const location = event.location ? event.location : "TCL 123";
  const time = event.time ? event.time : "2:35pm";
  const hasTitle = event.title && event.title.length > 0;
  const primary = hasTitle ? event.title : event.speaker;
  const secondary = hasTitle ? `${event.speaker}, ${event.affiliation}` : event.affiliation;
  const detail = (event.abstract && event.abstract.length > 0) ? event.abstract : event.bio;
  const parsedDate = new Date(event.date);

  return (
    <div className="soft-card" style={{ display: "flex", flexFlow: "row nowrap", gap: "16px", padding: "16px" }}>
      <div className="date-badge" style={{ flex: "0 0 52px", width: "52px", height: "52px", backgroundColor: "var(--color-colloquium)" }}>
        <div className="plaintext" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>
          {MONTHS[parsedDate.getMonth()]}
        </div>
        <div className="title" style={{ fontSize: "20px" }}>{parsedDate.getDate()}</div>
      </div>
      <img
        width="56"
        height="56"
        loading="lazy"
        style={{ objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
        src={event.photo}
        alt={`Photo of ${event.speaker}`}
      />
      <div style={{ flexGrow: 1, flexShrink: 1, minWidth: 0 }}>
        <div className="title" style={{ fontSize: "17px" }}>{primary}</div>
        <div className="plaintext" style={{ fontSize: "13px", color: "#666666", marginTop: "2px" }}>{secondary}</div>
        <div className="plaintext" style={{ fontSize: "12px", color: "#999999", marginTop: "2px" }}>
          {location} &middot; {time}
        </div>
        {detail ? (
          <div className="plaintext" style={{ fontSize: "14px", color: "#444444", lineHeight: 1.5, marginTop: "8px" }}>
            {detail}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Colloquium = ({ style, showSidebar, onClick }) => {
  const hubId = "colloquium";

  const events = DbServices.getUpcomingColloquia();

  const renderContent = () => {
    if (events.length > 0) {
      return (
        <div>
          <div style={{ display: "flex", flexFlow: "column nowrap", gap: "12px", maxWidth: "760px" }}>
            {events.map((event, i) => (
              <EventRow key={`event-${i}`} event={event} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            style={{
              border: "solid 5px #FFBE0A",
              marginBottom: "10px",
            }}
          >
            <img src={`${import.meta.env.BASE_URL}images/misc/hiatus.jpg`} width="100%" />
          </div>
          <div
            className="plaintext"
            style={{
              display: "flex",
            }}
          >
            Our colloquium is currently on hiatus, but come back for updates
            when we approach the start of the semester! The Computer Science
            Colloquium at Williams College takes place most Fridays from 2:35pm
            to 3:50pm in Wege Auditorium (TCL 123).
          </div>
        </div>
      );
    }
  };

  const renderBody = () => (
    <div
      id="colloquium"
      style={{
        ...style,
        fontSize: "36px",
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
            title="colloquium"
            className="sidebar-colloquium"
            onClick={onClick}
          />
        ) : (
          <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
        )}
        <div style={{ width: "95%", textAlign: "left" }}>
          <div style={{ marginTop: "24px", marginBottom: "20px" }}>
            <div className="eyebrow">Schedule</div>
            <div className="plaintext" style={{ fontSize: "15px", color: "#666666", marginTop: "8px", maxWidth: "640px" }}>
              The Computer Science Colloquium at Williams College takes place most Fridays from 2:35pm to 3:50pm in Wege Auditorium (TCL 123), unless otherwise noted below.
            </div>
          </div>
          {renderContent()}
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

export default Colloquium;
