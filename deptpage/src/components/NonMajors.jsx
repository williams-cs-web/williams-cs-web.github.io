import { Fragment } from "react";
import Sidebar from "./Sidebar";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";
import Passage from "./Passage";
import DbServices from "../services/db.js";

const NonMajors = ({ style, layout, onClick, showSidebar }) => {
  const hubId = "non-majors";

  //const showSidebar = layout === "wide";

  const renderContent = () => {
    return DbServices.getNonMajorsContent().map((item, i) => {
      const gap = i === 0 ? null : <Spacer height="20px" />;
      return (
        <Fragment key={item.title ?? i}>
          {gap}
          <Passage title={item.title} photo={item.photo} article={item.article} />
        </Fragment>
      );
    });
  };

  const renderBody = () => (
    <div
      id="frontpage-non-majors"
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
            title="non-majors"
            className="sidebar-non-majors"
            onClick={onClick}
          />
        ) : (
          <div
            className="left-spacer"
            style={{ flexGrow: 0, flexShrink: 0, width: "80px" }}
          />
        )}
        <div style={{ flexGrow: 1, minWidth: 0 }}>{renderContent()}</div>
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

export default NonMajors;
