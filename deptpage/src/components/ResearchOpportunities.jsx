import Sidebar from "./Sidebar";
import DbServices from "../services/db.js";
import TopMenu from "./TopMenu";
import WilliamsHeader from "./WilliamsHeader";
import WilliamsFooter from "./WilliamsFooter";
import Spacer from "./Spacer";
import Passage from "./Passage";

const ResearchOpportunities = ({ style, layout, onClick, showSidebar }) => {
  const hubId = "research";

  const content = DbServices.getResearchContent();

  const renderOpportunity = (item, i) => (
    <Passage key={item.title ?? i} title={item.title} photo={item.photo} article={item.article} />
  );

  const renderBody = () => (
    <div id="research-opportunities" style={style}>
      <div
        className="pagebody"
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          
        }}
      >
        {showSidebar ? (
          <Sidebar
            title="research opportunities"
            className="sidebar-research-opportunities"
            onClick={onClick}
          />
        ) : (
          <div className="left-spacer" style={{ flexGrow: 0, flexShrink: 0, width: "80px" }} />
        )}
        <div
          style={{
            width: layout === "wide" ? "100%" : "100%",
            
            textAlign: "left",
          }}
        >
          {content.map((item, i) => renderOpportunity(item, i))}
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

export default ResearchOpportunities;
