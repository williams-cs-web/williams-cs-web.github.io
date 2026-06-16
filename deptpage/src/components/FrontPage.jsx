import { Fragment } from "react";
import DbServices from "../services/db.js";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";
import NewsTile from "./NewsTile";
import ColloquiumTile from "./ColloquiumTile";
import Passage from "./Passage";

const FrontPage = ({ onClick, style }) => {
  const hubId = "home";

  const spotlight = DbServices.getFrontPageSpotlightInfo();

  const renderFromTheDepartment = () => (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        gap: "10px",
      }}
    >
      <NewsTile
        onClick={onClick}
        style={{
          flexGrow: 1,
          flexBasis: "300px",
          height: "140px",
          border: "2px solid black",
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      />
      <ColloquiumTile
        onClick={onClick}
        style={{
          flexGrow: 1,
          flexBasis: "300px",
          height: "140px",
          border: "2px solid black",
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      />
    </div>
  );

  const renderContent = () => {
    return DbServices.getFrontPageContent().map((item, i) => {
      if (item.component === "FromTheDepartment") {
        return (
          <Fragment key={item.component}>
            <Spacer height="20px" />
            {renderFromTheDepartment()}
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
    <div id="frontpage" style={{ ...style, fontSize: "40px" }}>
      <div
        className="pagebody"
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          paddingRight: "40px",
        }}
      >
        <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
        <div style={{ width: "100%", paddingTop: "30px", textAlign: "left" }}>
          <img width="100%" src={spotlight.photo} alt={spotlight.caption} />
          {renderContent()}
          <Spacer height="20px" />
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

export default FrontPage;
