import { Fragment } from "react";
import Schedule from "./Schedule";
import Sidebar from "./Sidebar";
import StudyAway from "./StudyAway";
import DbServices from "../services/db.js";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";
import Passage from "./Passage";

const PlanYourMajor = ({ style, layout, onClick, showSidebar }) => {
  const hubId = "plan-your-major";

  const pageWidth = Math.min(style.width, 1050);

  const renderContent = () => {
    return DbServices.getPlanYourMajorContent().map((item, i) => {
      if (item.component && item.component === "MajorPlanningAssistant") {
        return (
          <Fragment key={item.component}>
            <Spacer height="20px" />
            <div
              className="heading"
              style={{
                textAlign: "left",
              }}
            >
              major planning assistant
            </div>
            <Schedule
              style={{
                width: showSidebar ? 0.7 * pageWidth - 40 : pageWidth - 120,
              }}
            />
          </Fragment>
        );
      } else if (item.component && item.component === "StudyAway") {
        return (
          <Fragment key={item.component}>
            <Spacer height="20px" />
            <StudyAway layout="narrow" />
          </Fragment>
        );
      } else {
        return (
          <Fragment key={item.title ?? i}>
            <Spacer height="20px" />
            <Passage title={item.title} article={item.article} />
          </Fragment>
        );
      }
    });
  };

  const renderBody = () => (
    <div
      id="frontpage-plan-your-major"
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
            title="plan your major"
            className="sidebar-plan-your-major"
            onClick={onClick}
          />
        ) : (
          <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
        )}
        <div>
          <div>
            <Spacer height="10px" />
            {renderContent()}
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
      <Spacer height="30px" />
      <WilliamsFooter />
    </div>
  );
};

export default PlanYourMajor;
