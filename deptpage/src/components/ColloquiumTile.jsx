import DbServices from "../services/db.js";
import { Link } from "react-router-dom";

const ColloquiumTile = ({ onClick, style }) => {
  const events = DbServices.getUpcomingColloquia();
  const event = events.length > 0 ? events[0] : null;

  if (!event) {
    return (
      <Link
        to={{ pathname: `/colloquium` }}
        onClick={() => { onClick("colloquium"); window.scrollTo(0, 0); }}
        className="frontpage-colloquium"
        style={{ display: "block", boxSizing: "border-box", ...style }}
      >
        <div
          className="centered"
          style={{
            padding: "0px 10px 0px 10px",
            fontSize: "16px",
            fontWeight: "normal",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold" }}>colloquium:</span> our
            colloquium is currently on hiatus, but check back for updates when
            we approach the start of the semester.
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={{ pathname: `/colloquium` }}
      onClick={() => onClick("colloquium")}
      className="frontpage-colloquium"
      style={{
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <img
        src={event.photo}
        width="100"
        height="100"
        style={{ objectFit: "cover", flexGrow: 0, flexShrink: 0 }}
        alt={`photo of ${event.speaker}`}
      />
      <div style={{ overflow: "hidden", minWidth: 0 }}>
        <div
          className="plaintext"
          style={{ fontSize: "14px", fontWeight: "bold" }}
        >
          {event.date.toLowerCase()}
        </div>
        <div
          className="colloquium-title"
          style={{
            fontSize: "18px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.title}
        </div>
        <div
          className="colloquium-speaker"
          style={{
            fontSize: "20px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {event.speaker}, {event.affiliation}
        </div>
      </div>
    </Link>
  );
};

export default ColloquiumTile;
