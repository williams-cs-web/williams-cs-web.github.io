import DbServices from "../services/db.js";
import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";

const CourseOffering = ({ course, instructors, lecture, webpage, width }) => {
  const renderWithHyperlink = (component) => {
    if (webpage && webpage.length > 0) {
      return (
        <a className="linkbox" href={webpage} target="_blank">
          {component}
        </a>
      );
    } else {
      return component;
    }
  };

  const courseObj = DbServices.getCourseById(course);
  const firstInstructor = DbServices.getPersonByName(instructors[0]);

  const taughtByMessage = () => {
    return `${instructors.join(" and ")}`;
  };

  const content = (
    <div
      style={{
        display: "flex",
        flexFlow: "row nowrap",
      }}
    >
      <div
        style={{
          margin: "5px",
        }}
      >
        <img
          width="60"
          height="60"
          loading="lazy"
          style={{ objectFit: "cover" }}
          src={firstInstructor ? firstInstructor.photo : courseObj.icon}
          alt={
            firstInstructor
              ? `Photo of ${firstInstructor.id}`
              : `Icon for ${course}`
          }
        />
      </div>
      <div
        style={{
          padding: "5px",
        }}
      >
        <div
          className="plaintext"
          style={{
            fontSize: "12px",
          }}
        >
          {lecture}
        </div>
        <div
          className="title"
          style={{
            fontSize: "22px",
          }}
        >
          {course}
        </div>
        <hr style={{ margin: "2px" }} />
        <div
          className="plaintext"
          style={{
            fontSize: "19px",
          }}
        >
          {courseObj.title}
        </div>

        <div
          className="plaintext"
          style={{
            fontSize: "16px",
          }}
        >
          {taughtByMessage()}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="linkbox"
      style={{
        border: "1px solid black",
        textAlign: "left",
        flexGrow: 1,
        flexShrink: 1,
        width: width,
      }}
    >
      {renderWithHyperlink(content)}
    </div>
  );
};

const CourseOfferings = ({ style, showSidebar, onClick }) => {
  const hubId = "courses";

  const [headingWidth, setHeadingWidth] = useState(null);
  const headingRef = useCallback((node) => {
    if (node) setHeadingWidth(node.offsetWidth);
  }, []);

  const renderHeading = (heading) => (
    <div className="heading">{heading.toLowerCase()}</div>
  );

  const getBoxWidth = () => {
    if (headingWidth) {
      let boxesPerLine = Math.floor(headingWidth / 300);
      return Math.floor((headingWidth - 50) / boxesPerLine);
    } else {
      return 300;
    }
  };
  const renderSemester = (semester) => (
    <div>
      {renderHeading(semester)}
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-start",
          gap: "20px",
        }}
      >
        {DbServices.getCourseSections(semester).map((offering) => (
          <CourseOffering
            id={offering.id}
            key={offering.id}
            course={offering.course}
            lecture={offering.lecture}
            webpage={offering.webpage}
            instructors={offering.instructors}
            width={`${getBoxWidth()}px`}
          />
        ))}
      </div>
    </div>
  );

  const renderBody = () => (
    <div
      id="frontpage-course-offerings"
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
            title="current course offerings"
            className="sidebar-course-offerings"
            onClick={onClick}
          />
        ) : (
          <div
            className="left-spacer"
            style={{ flexGrow: 0, flexShrink: 0, width: "80px" }}
          />
        )}
        <div
          ref={headingRef}
          style={{
            width: "95%",

            textAlign: "left",
          }}
        >
          {renderHeading("computing resources")}
          <div className="plaintext">
            Information about the computing infrastructure that supports our
            courses can be found{" "}
            <a href="https://williams-cs-docs.cs.williams.edu/" target="_blank">
              here
            </a>
            .
          </div>
          <div style={{ height: "40px" }}></div>
          {renderSemester("Fall 2026")}
          <div style={{ height: "40px" }}></div>
          {renderSemester("Spring 2027")}
          <div style={{ height: "40px" }}></div>
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

export default CourseOfferings;
